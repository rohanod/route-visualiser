const axios = require('axios');
const cheerio = require('cheerio');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.tpg.ch';
const LINES_URL = `${BASE_URL}/en/lignes`;
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const CONCURRENCY = 5;
const SAVE_INTERVAL = 5;
const OUTPUT_STOPS = path.join(__dirname, 'stops-by-line.json');
const OUTPUT_STOPS_PARTIAL = path.join(__dirname, 'stops-by-line.partial.json');

function saveJson(targetPath, data) {
  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8');
}

async function extractLineDetails() {
  console.log(`Fetching line list from ${LINES_URL} using Playwright...`);
  let browser;
  try {
    browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(LINES_URL, { waitUntil: 'networkidle' });

    // Wait for the line list to appear (adjust selector as needed)
    await page.waitForSelector('div.type.uk-flex.uk-flex-middle, div.lignes a', { timeout: 15000 });

    // Extract line data in the browser context
    const allLinesData = await page.evaluate(() => {
      const BASE_URL = 'https://www.tpg.ch';
      const result = [];
      document.querySelectorAll('div.type.uk-flex.uk-flex-middle').forEach(typeDiv => {
        const transportType = typeDiv.querySelector('h3.type')?.textContent.trim();
        const linesContainer = typeDiv.nextElementSibling;
        if (transportType && linesContainer && linesContainer.classList.contains('lignes')) {
          linesContainer.querySelectorAll('a[href^="/en/lignes/"]').forEach(linkTag => {
            const lineSpan = linkTag.querySelector('span.line-logo');
            if (lineSpan) {
              const lineNumber = lineSpan.textContent.trim();
              const style = lineSpan.getAttribute('style') || '';
              const colorMatch = style.match(/background-color:\s*(#[0-9a-fA-F]{6});/);
              const color = colorMatch ? colorMatch[1] : 'N/A';
              const fullLink = BASE_URL + linkTag.getAttribute('href');
              result.push({
                link: fullLink,
                colour: color,
                number: lineNumber,
                type: transportType,
              });
            }
          });
        }
      });
      return result;
    });

    console.log(`Found ${allLinesData.length} lines.`);
    return allLinesData;
  } catch (error) {
    console.error(`Error fetching or parsing the URL with Playwright: ${error.message}`);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

function extractJsonAfterVar(html, varName) {
  const marker = `var ${varName}=`;
  const idx = html.indexOf(marker);
  if (idx === -1) return null;
  const start = html.indexOf('{', idx);
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < html.length; i++) {
    const ch = html[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        const jsonStr = html.slice(start, i + 1);
        return jsonStr;
      }
    }
  }
  return null;
}

function buildStopsFromLigneArretsDir(dirObj) {
  const arr = Object.values(dirObj || {});
  const minuteKey = arr.some((o) => typeof o.minute === 'number') ? 'minute' : 'time';
  arr.sort((a, b) => (a[minuteKey] ?? 0) - (b[minuteKey] ?? 0));
  return arr.map((s, index) => ({
    index,
    id: s.id || null,
    code: s.code || null,
    short_code: s.short_code || null,
    name: s.name || s.description || null,
    minute: typeof s[minuteKey] === 'number' ? s[minuteKey] : null,
    pdf: s.pdf || null,
  }));
}

function buildStopsFromDOM($, directionSelector) {
  const stops = [];
  $(`${directionSelector} .thermometer li .js-container`).each((i, el) => {
    const id = $(el).attr('data-id') || null;
    const name = $(el).find('.stop__label').first().text().trim() || null;
    const etaAttr = $(el).find('.js-stop-eta').attr('data-eta');
    const minute = etaAttr != null ? Number(etaAttr) : null;
    stops.push({
      index: i,
      id,
      code: null,
      short_code: null,
      name,
      minute: Number.isFinite(minute) ? minute : null,
      pdf: null,
    });
  });
  return stops;
}

async function fetchHtml(url) {
  const resp = await axios.get(url, {
    headers: { 'User-Agent': USER_AGENT, 'Accept-Language': 'en;q=0.9,fr;q=0.8' },
    timeout: 30000,
    maxRedirects: 5,
    decompress: true,
  });
  return resp.data;
}

async function parseLinePage(url) {
  const html = await fetchHtml(url);
  const jsonStr = extractJsonAfterVar(html, 'ligneArrets');
  if (jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      return {
        aller: buildStopsFromLigneArretsDir(data.aller),
        retour: buildStopsFromLigneArretsDir(data.retour),
      };
    } catch (_) {}
  }
  const $ = cheerio.load(html);
  const aller = buildStopsFromDOM($, '.thermometer-container.aller');
  const retour = buildStopsFromDOM($, '.thermometer-container.retour');
  return { aller, retour };
}

async function ensureBothDirections(url, parsed) {
  if (parsed.aller?.length && parsed.retour?.length) return parsed;
  const retourUrl = url.endsWith('/') ? `${url}retour` : `${url}/retour`;
  const htmlRetour = await fetchHtml(retourUrl);
  const jsonStrR = extractJsonAfterVar(htmlRetour, 'ligneArrets');
  if (jsonStrR) {
    try {
      const dataR = JSON.parse(jsonStrR);
      return {
        aller: parsed.aller?.length ? parsed.aller : buildStopsFromLigneArretsDir(dataR.aller),
        retour: parsed.retour?.length ? parsed.retour : buildStopsFromLigneArretsDir(dataR.retour),
      };
    } catch (_) {}
  }
  const $R = cheerio.load(htmlRetour);
  return {
    aller: parsed.aller?.length ? parsed.aller : buildStopsFromDOM($R, '.thermometer-container.aller'),
    retour: parsed.retour?.length ? parsed.retour : buildStopsFromDOM($R, '.thermometer-container.retour'),
  };
}

async function mapWithConcurrency(items, concurrency, worker) {
  let cursor = 0;
  const total = items.length;
  const actualConcurrency = Math.max(1, Math.min(concurrency, total));

  async function runWorker() {
    while (true) {
      const index = cursor++;
      if (index >= total) break;
      await worker(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: actualConcurrency }, runWorker));
}

async function main() {
  const lines = await extractLineDetails();
  if (lines.length === 0) {
    console.log('⚠️ No data was extracted.');
    return;
  }

  console.log(`Found ${lines.length} lines to process.`);

  const results = new Array(lines.length);
  let processed = 0;

  const checkpoint = () => {
    const compact = results.filter(Boolean);
    if (compact.length === 0) return;
    saveJson(OUTPUT_STOPS_PARTIAL, compact);
    console.log(`💾 Checkpoint saved (${compact.length} lines) -> ${OUTPUT_STOPS_PARTIAL}`);
  };

  await mapWithConcurrency(lines, CONCURRENCY, async (line, index) => {
    try {
      const parsed = await parseLinePage(line.link);
      const both = await ensureBothDirections(line.link, parsed);
      results[index] = {
        number: line.number,
        type: line.type,
        colour: line.colour,
        link: line.link,
        directions: {
          aller: both.aller || [],
          retour: both.retour || [],
        },
      };
      processed += 1;
      console.log(`Processed line ${line.number} (${processed}/${lines.length})`);
      if (processed % SAVE_INTERVAL === 0) {
        checkpoint();
      }
    } catch (error) {
      console.error(`Failed line ${line.number}: ${error.message}`);
    }
  });

  const finalResults = results.filter(Boolean);
  saveJson(OUTPUT_STOPS, finalResults);
  console.log(`✅ Wrote ${finalResults.length} lines to ${OUTPUT_STOPS}`);

  if (fs.existsSync(OUTPUT_STOPS_PARTIAL)) {
    fs.unlinkSync(OUTPUT_STOPS_PARTIAL);
    console.log(`🧹 Removed temporary file ${OUTPUT_STOPS_PARTIAL}`);
  }
}

main().catch((error) => {
  console.error('Unexpected failure:', error);
  process.exit(1);
});
