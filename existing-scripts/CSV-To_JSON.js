const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const swissgrid = require('swissgrid');
const OpenLocationCode = require('open-location-code').OpenLocationCode;
const openLocationCode = new OpenLocationCode();

// --- CONFIGURATION ---
// Assumes the script is in a project folder and the 'Stops' directory is two levels up.
const input_file = path.join(__dirname, 'TPG_ARRETS.csv');
const output_file = path.join(__dirname, 'TPG_ARRETS.json');

console.log(`Reading CSV file from: ${input_file}`);

try {
    // --- STEP 1: READ THE ENTIRE FILE ---
    // For maximum speed on a machine with enough RAM, we read the whole file at once.
    const csvFileContent = fs.readFileSync(input_file, 'utf8');

    // --- STEP 2: PARSE WITH PAPAPARSE ---
    console.time('Total Processing Time'); // Start a timer to measure performance
    console.log('Parsing CSV data...');

    const { data: rows, errors } = Papa.parse(csvFileContent, {
        header: true,         // Treat the first row as headers
        delimiter: ';',       // Specify the correct delimiter
        skipEmptyLines: true, // Ignore any blank lines
        dynamicTyping: true,  // Automatically convert numbers
    });

    if (errors.length > 0) {
        console.warn('Encountered parsing errors:', errors);
    }

    console.log(`Parsed ${rows.length} records. Structuring JSON...`);

    // --- STEP 3: TRANSFORM THE DATA ---
    const stops_data = {};

    for (const row of rows) {
        const stop_name = row['NOM_ARRET'];
        if (!stop_name) continue;

        // Initialize the stop object if it's the first time we've seen it
        if (!stops_data[stop_name]) {
            const easting = row['E'];
            const northing = row['N'];

            if (!easting || !northing) continue; // Skip if coordinates are missing

            // --- Coordinate Conversion ---
            // 1. Convert Swiss LV95 (CH1903+) coordinates to WGS84 (longitude/latitude) using the 'swissgrid' library's fast approximation.
            const [lon, lat] = swissgrid.fast.unproject([easting, northing]);

            // 2. Encode latitude/longitude into a Google Plus Code using the official library.
            const plus_code = openLocationCode.encode(lat, lon);

            stops_data[stop_name] = {
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

                if (!direction) return; // Skip if no direction was parsed

                // Check if the line number already exists for this stop
                if (stops_data[stop_name].lines[line]) {
                    // If it exists, add the new direction to the list if it's not already there
                    if (!stops_data[stop_name].lines[line].directions.includes(direction)) {
                        stops_data[stop_name].lines[line].directions.push(direction);
                    }
                } else {
                    // If it's a new line for this stop, initialize it with a directions array
                    stops_data[stop_name].lines[line] = {
                        directions: [direction]
                    };
                }
            });
        }
    }

    // --- STEP 4: WRITE THE JSON FILE ---
    // Using the native JSON.stringify as it's highly optimized.
    fs.writeFileSync(output_file, JSON.stringify(stops_data, null, 2));

    console.timeEnd('Total Processing Time'); // Stop the timer and print the duration
    console.log(`✅ Success! Structured data written to ${output_file}`);

} catch (error) {
    console.error('❌ An error occurred during the process:', error.message);
}