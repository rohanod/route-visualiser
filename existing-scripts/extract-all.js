const axios = require('axios');
const cheerio = require('cheerio');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const Papa = require('papaparse');
const swissgrid = require('swissgrid');
const OpenLocationCode = require('open-location-code').OpenLocationCode;
const openLocationCode = new OpenLocationCode();
const yauzl = require('yauzl');

// --- CONFIGURATION ---
const GEOJSON_URL = 'https://opendata.tpg.ch/api/explore/v2.1/catalog/datasets/carto-metro-couche-lignes/exports/geojson?lang=en&timezone=Europe%2FBerlin';
const STOPS_ZIP_URL = 'https://ge.ch/sitg/geodata/SITG/OPENDATA/1350/CSV_TPG_ARRETS.zip';
const LINES_URL = 'https://www.tpg.ch/en/lignes';
const BASE_URL = 'https://www.tpg.ch';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const OUTPUT_FILE = path.join(__dirname, 'combined-data.json');
const CONCURRENCY = 5;

// --- UTILITY FUNCTIONS ---
function saveJson(targetPath, data) {
  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8');
}

async function fetchJson(url) {
  console.log(`Fetching JSON from: ${url}`);
  const response = await axios.get(url, {
    headers: { 'User-Agent': USER_AGENT },
    timeout: 60000,
  });
  return response.data;
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

// --- DOWNLOAD AND EXTRACT STOPS DATA ---
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`Failed to download: ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

function extractCsvFromZip(zipPath) {
  return new Promise((resolve, reject) => {
    yauzl.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
      if (err) return reject(err);

      zipfile.readEntry();
      zipfile.on('entry', (entry) => {
        if (entry.fileName === 'TPG_ARRETS.csv') {
          zipfile.openReadStream(entry, (err, readStream) => {
            if (err) return reject(err);

            const chunks = [];
            readStream.on('data', (chunk) => chunks.push(chunk));
            readStream.on('end', () => {
              zipfile.close();
              resolve(Buffer.concat(chunks).toString('utf8'));
            });
            readStream.on('error', reject);
          });
        } else {
          zipfile.readEntry();
        }
      });
      zipfile.on('end', () => {
        reject(new Error('TPG_ARRETS.csv not found in zip'));
      });
      zipfile.on('error', reject);
    });
  });
}

async function fetchStopsData() {
  console.log('Fetching stops data...');
  const temp_zip_file = path.join(__dirname, 'TPG_ARRETS-temp.zip');

  try {
    await downloadFile(STOPS_ZIP_URL, temp_zip_file);
    console.log('✅ Zip file downloaded successfully');

    const csvFileContent = await extractCsvFromZip(temp_zip_file);
    console.log('✅ CSV extracted successfully');

    fs.unlinkSync(temp_zip_file);
    console.log('✅ Temporary zip file deleted');

    const { data: rows, errors } = Papa.parse(csvFileContent, {
      header: true,
      delimiter: ';',
      skipEmptyLines: true,
      dynamicTyping: true,
    });

    if (errors.length > 0) {
      console.warn('Encountered parsing errors:', errors);
    }

    console.log(`Parsed ${rows.length} records. Processing stops...`);

    const stops_data = {};

    for (const row of rows) {
      const stop_code_raw = row['NUMERIQUE_ARRET'];
      const stop_name_raw = row['NOM_ARRET'];

      const stop_code = stop_code_raw ? String(stop_code_raw).trim() : '';
      const stop_name = stop_name_raw ? String(stop_name_raw).trim() : '';
      const platform_raw = row['LETTRE_DE_QUAI'];
      const platform = platform_raw ? String(platform_raw).trim() : '';

      if (!stop_code || !stop_name) continue;

      if (!stops_data[stop_name]) {
        stops_data[stop_name] = {};
      }

      let stopEntry = stops_data[stop_name][stop_code];

      if (!stopEntry) {
        const easting = row['E'];
        const northing = row['N'];

        if (!easting || !northing) continue;

        const [lon, lat] = swissgrid.fast.unproject([easting, northing]);

        stopEntry = {
          stopCode: stop_code,
          platform: platform || null,
          lat,
          lon,
          lines: {},
        };

        stops_data[stop_name][stop_code] = stopEntry;
      } else if (!stopEntry.platform && platform) {
        stopEntry.platform = platform;
      }

      // Parse the DIRECTION field to extract line numbers and their directions
      // Format: "07,01,05 (07 (Genève, Bout-du-Monde),01 (Genève, Jardin Botanique),05 (Genève-Aéroport, Terminal))"
      const direction_full = String(row['DIRECTION']);
      const lines = String(row['LIGNE']).split(',').map(l => l.trim());

      // Extract the part inside the main parentheses
      const mainMatch = direction_full.match(/\((.*)\)/);
      if (!mainMatch) continue;

      const directions_part = mainMatch[1];
      // Split by commas that are followed by a line number and parenthesis
      const direction_list = directions_part.split(/,\s*(?=\d+\s*\()/);

      if (lines.length === direction_list.length) {
        lines.forEach((line, index) => {
          const direction_str = direction_list[index];
          // Extract the destination from the innermost parentheses
          const dirMatch = direction_str.match(/\(([^()]+)\)$/);
          if (!dirMatch) return;

          const destination = dirMatch[1].trim();

          if (!destination) return;

          if (!stopEntry.lines[line]) {
            stopEntry.lines[line] = {
              directions: []
            };
          }

          if (!stopEntry.lines[line].directions.includes(destination)) {
            stopEntry.lines[line].directions.push(destination);
          }
        });
      }
    }

    const totalStopVariants = Object.values(stops_data).reduce((sum, variants) => sum + Object.keys(variants).length, 0);
    console.log(`✅ Processed ${totalStopVariants} stop-platform combinations`);
    return stops_data;
  } catch (error) {
    console.error('❌ Error fetching stops data:', error.message);
    if (fs.existsSync(temp_zip_file)) {
      fs.unlinkSync(temp_zip_file);
    }
    throw error;
  }
}

// --- EXTRACT LINE DETAILS FROM TPG WEBSITE ---
async function extractLineDetails() {
  console.log(`Fetching line list from ${LINES_URL} using Playwright...`);
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(LINES_URL, { waitUntil: 'networkidle' });

    await page.waitForSelector('div.type.uk-flex.uk-flex-middle, div.lignes a', { timeout: 15000 });

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

// --- PARSE LINE PAGES FOR STOP SEQUENCES ---
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
  return arr.map((s) => s.name || s.description || null).filter(Boolean);
}

function buildStopsFromDOM($, directionSelector) {
  const stops = [];
  $(`${directionSelector} .thermometer li .js-container`).each((i, el) => {
    const name = $(el).find('.stop__label').first().text().trim() || null;
    if (name) stops.push(name);
  });
  return stops;
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

// --- MAIN FUNCTION ---
async function main() {
  console.log('🚀 Starting extraction process...\n');

  // Step 1: Fetch GeoJSON route data
  console.log('📍 Step 1: Fetching route geometry from GeoJSON API...');
  const geoJsonData = await fetchJson(GEOJSON_URL);
  console.log(`✅ Fetched ${geoJsonData.features.length} route features\n`);

  // Step 2: Fetch stops data
  console.log('🚏 Step 2: Fetching stops data...');
  const stopsData = await fetchStopsData();
  console.log('');

  // Step 3: Fetch line metadata (names, types, colors, stop sequences)
  console.log('🚌 Step 3: Fetching line metadata from TPG website...');
  const linesMetadata = await extractLineDetails();
  console.log('');

  // Step 4: Parse stop sequences for each line
  console.log('📋 Step 4: Parsing stop sequences for each line...');
  const lineDirections = {};
  let processed = 0;

  await mapWithConcurrency(linesMetadata, CONCURRENCY, async (line) => {
    try {
      const parsed = await parseLinePage(line.link);
      const both = await ensureBothDirections(line.link, parsed);
      lineDirections[line.number] = {
        type: line.type,
        colour: line.colour,
        aller: both.aller || [],
        retour: both.retour || [],
      };
      processed += 1;
      console.log(`  Processed line ${line.number} (${processed}/${linesMetadata.length})`);
    } catch (error) {
      console.error(`  Failed line ${line.number}: ${error.message}`);
    }
  });
  console.log('');

  // Step 5: Build geometry lookup from GeoJSON
  console.log('🗺️  Step 5: Processing route geometries...');
  const geometryLookup = {};
  for (const feature of geoJsonData.features) {
    const props = feature.properties;
    const ligneSens = props.ligne_sens; // e.g., "1 - Aller"
    const match = ligneSens.match(/^(\S+)\s*-\s*(Aller|Retour)$/i);
    if (!match) continue;

    const lineNumber = match[1];
    const direction = match[2].toLowerCase();

    if (!geometryLookup[lineNumber]) {
      geometryLookup[lineNumber] = {};
    }

    // Coordinates are [lon, lat] in GeoJSON, convert to [lat, lon]
    const coords = feature.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
    geometryLookup[lineNumber][direction] = coords;
  }
  console.log(`✅ Processed geometries for ${Object.keys(geometryLookup).length} lines\n`);

  // Step 6: Combine all data into final structure
  console.log('🔧 Step 6: Building combined data structure...');
  
  const combinedData = {
    stops: {},
    lines: {},
  };

  // First, build the lines data
  for (const [lineNumber, lineInfo] of Object.entries(lineDirections)) {
    const geometry = geometryLookup[lineNumber];
    
    // Combine geometries from both directions
    let allCoords = [];
    if (geometry?.aller) allCoords.push(...geometry.aller);
    if (geometry?.retour) allCoords.push(...geometry.retour);

    combinedData.lines[lineNumber] = {
      name: `Line ${lineNumber}`,
      type: lineInfo.type,
      colour: lineInfo.colour,
      geometry: allCoords,
      directions: {
        aller: lineInfo.aller,
        retour: lineInfo.retour,
      },
    };
  }

  // Now process stops and match them with their positions in each direction
  console.log('🚏 Step 6b: Matching stops with route positions...');
  
  for (const [stopName, stopVariants] of Object.entries(stopsData)) {
    combinedData.stops[stopName] = {};

    for (const [stopCode, stopVariant] of Object.entries(stopVariants)) {
      combinedData.stops[stopName][stopCode] = {
        stopCode,
        platform: stopVariant.platform,
        lat: stopVariant.lat,
        lon: stopVariant.lon,
        lines: {},
      };

      // For each line that stops here
      for (const [lineNumber, lineStopData] of Object.entries(stopVariant.lines)) {
        const lineInfo = combinedData.lines[lineNumber];
        if (!lineInfo) continue;

        combinedData.stops[stopName][stopCode].lines[lineNumber] = {
          directions: {}
        };

        const allerStops = lineInfo.directions.aller || [];
        const retourStops = lineInfo.directions.retour || [];
        const allerLastStop = allerStops[allerStops.length - 1] || null;
        const retourLastStop = retourStops[retourStops.length - 1] || null;

        const includesInsensitive = (source, target) =>
          source && target && source.toLowerCase().includes(target.toLowerCase());

        // For each direction this stop serves
        for (const rawDestination of lineStopData.directions) {
          const destination = rawDestination.trim();
          // Determine which direction (aller or retour) this destination corresponds to
          let stopIndex = -1;
          let matchedDirection = null;

          // Check aller direction
          if (allerLastStop && includesInsensitive(allerLastStop, destination)) {
            stopIndex = allerStops.findIndex((s) => s === stopName);
            if (stopIndex !== -1) {
              matchedDirection = 'aller';
            }
          }

          // Check retour direction if not found in aller
          if (stopIndex === -1 && retourLastStop && includesInsensitive(retourLastStop, destination)) {
            stopIndex = retourStops.findIndex((s) => s === stopName);
            if (stopIndex !== -1) {
              matchedDirection = 'retour';
            }
          }

          // If still not found, try partial matching
          if (stopIndex === -1) {
            // Try aller with partial match
            if (lineInfo.directions.aller) {
              stopIndex = lineInfo.directions.aller.findIndex(s => s === stopName);
              if (stopIndex !== -1 && allerLastStop && includesInsensitive(destination, allerLastStop)) {
                matchedDirection = 'aller';
              } else {
                stopIndex = -1;
              }
            }
            
            // Try retour with partial match
            if (stopIndex === -1 && lineInfo.directions.retour) {
              stopIndex = lineInfo.directions.retour.findIndex(s => s === stopName);
              if (stopIndex !== -1 && retourLastStop && includesInsensitive(destination, retourLastStop)) {
                matchedDirection = 'retour';
              } else {
                stopIndex = -1;
              }
            }
          }

          if (stopIndex !== -1) {
            combinedData.stops[stopName][stopCode].lines[lineNumber].directions[destination] = {
              index: stopIndex,
              direction: matchedDirection,
              lat: stopVariant.lat,
              lon: stopVariant.lon,
            };
          }
        }

        // Remove line entry if no directions were matched
        if (Object.keys(combinedData.stops[stopName][stopCode].lines[lineNumber].directions).length === 0) {
          delete combinedData.stops[stopName][stopCode].lines[lineNumber];
        }
      }

      // Remove stop variant if no valid line connections
      if (Object.keys(combinedData.stops[stopName][stopCode].lines).length === 0) {
        delete combinedData.stops[stopName][stopCode];
      }
    }

    // Remove stop name if no variants remain
    if (Object.keys(combinedData.stops[stopName]).length === 0) {
      delete combinedData.stops[stopName];
    }
  }

  console.log(`✅ Combined data for ${Object.keys(combinedData.lines).length} lines and ${Object.keys(combinedData.stops).length} stops\n`);

  // Step 7: Save to file
  console.log('💾 Step 7: Saving to file...');
  saveJson(OUTPUT_FILE, combinedData);
  console.log(`✅ Success! Combined data written to ${OUTPUT_FILE}`);

  console.log('\n🎉 Extraction complete!');
  console.log(`   Lines: ${Object.keys(combinedData.lines).length}`);
  console.log(`   Stops: ${Object.keys(combinedData.stops).length}`);
}

// Run the script
main().catch((error) => {
  console.error('❌ Unexpected failure:', error);
  process.exit(1);
});
