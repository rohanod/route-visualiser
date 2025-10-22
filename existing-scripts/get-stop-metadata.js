const fs = require('fs');
const path = require('path');
const https = require('https');
const Papa = require('papaparse');
const swissgrid = require('swissgrid');
const OpenLocationCode = require('open-location-code').OpenLocationCode;
const openLocationCode = new OpenLocationCode();
const yauzl = require('yauzl');

// --- CONFIGURATION ---
const ZIP_URL = 'https://ge.ch/sitg/geodata/SITG/OPENDATA/1350/CSV_TPG_ARRETS.zip';
const temp_zip_file = path.join(__dirname, 'TPG_ARRETS-temp.zip');
const output_file = path.join(__dirname, 'TPG_ARRETS.json');

console.log(`Downloading zip file from: ${ZIP_URL}`);

// --- STEP 1: DOWNLOAD THE ZIP FILE ---
function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // Handle redirect
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

// --- STEP 2: EXTRACT CSV FROM ZIP ---
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

// --- MAIN EXECUTION ---
(async () => {
    try {
        // Download the zip file
        await downloadFile(ZIP_URL, temp_zip_file);
        console.log('✅ Zip file downloaded successfully');

        // Extract CSV content from zip
        console.log('Extracting CSV from zip...');
        const csvFileContent = await extractCsvFromZip(temp_zip_file);
        console.log('✅ CSV extracted successfully');

        // Delete the temporary zip file
        fs.unlinkSync(temp_zip_file);
        console.log('✅ Temporary zip file deleted');

        // --- STEP 3: PARSE WITH PAPAPARSE ---
        console.time('Total Processing Time');
        console.log('Parsing CSV data...');

        const { data: rows, errors } = Papa.parse(csvFileContent, {
            header: true,
            delimiter: ';',
            skipEmptyLines: true,
            dynamicTyping: true,
        });

        if (errors.length > 0) {
            console.warn('Encountered parsing errors:', errors);
        }

        console.log(`Parsed ${rows.length} records. Structuring JSON...`);

        // --- STEP 4: TRANSFORM THE DATA ---
        const stops_data = {};

        for (const row of rows) {
            const stop_code = row['NUMERIQUE_ARRET'];
            const stop_name = row['NOM_ARRET'];
            
            if (!stop_code || !stop_name) continue;

            // Initialize the stop object if it's the first time we've seen this NUMERIQUE_ARRET
            if (!stops_data[stop_code]) {
                const easting = row['E'];
                const northing = row['N'];

                if (!easting || !northing) continue;

                // --- Coordinate Conversion ---
                const [lon, lat] = swissgrid.fast.unproject([easting, northing]);
                const plus_code = openLocationCode.encode(lat, lon);

                stops_data[stop_code] = {
                    name: stop_name,
                    location: {
                        E: easting,
                        N: northing,
                        lat: lat,
                        lon: lon,
                        plus_code: plus_code
                    },
                    lines: {},
                };
            }

            // --- Handle the complex Line and Direction columns ---
            const lines = String(row['LIGNE']).split(',');
            const direction_full = String(row['DIRECTION']);

            const mainMatch = direction_full.match(/\((.*)\)/);
            if (!mainMatch) continue;

            const directions_part = mainMatch[1];
            const direction_list = directions_part.split(/,\s*(?=[A-Z\d]{2}\s\()/);

            if (lines.length === direction_list.length) {
                lines.forEach((line, index) => {
                    const direction_str = direction_list[index];
                    const dirMatch = direction_str.match(/\((.*)\)/);
                    const direction = dirMatch ? dirMatch[1] : "";

                    if (!direction) return;

                    if (stops_data[stop_code].lines[line]) {
                        if (!stops_data[stop_code].lines[line].directions.includes(direction)) {
                            stops_data[stop_code].lines[line].directions.push(direction);
                        }
                    } else {
                        stops_data[stop_code].lines[line] = {
                            directions: [direction]
                        };
                    }
                });
            }
        }

        // --- STEP 5: WRITE THE JSON FILE ---
        fs.writeFileSync(output_file, JSON.stringify(stops_data, null, 2));

        console.timeEnd('Total Processing Time');
        console.log(`✅ Success! Structured data written to ${output_file}`);

    } catch (error) {
        console.error('❌ An error occurred during the process:', error.message);
        // Clean up temp file if it exists
        if (fs.existsSync(temp_zip_file)) {
            fs.unlinkSync(temp_zip_file);
        }
        process.exit(1);
    }
})();

// Know that the different stop entries with different IDs but same name are considered different because they may represent different physical locations or platforms while in the same rough area.