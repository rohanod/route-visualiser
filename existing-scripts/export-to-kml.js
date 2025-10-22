#!/usr/bin/env node

/**
 * Export TPG line routes to KML format for Google Earth Pro
 * 
 * Usage: node export-to-kml.js <line-number> [output-file.kml]
 * Example: node export-to-kml.js 7 line-7.kml
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const lineNumber = process.argv[2];
const outputFile = process.argv[3] || `line-${lineNumber}.kml`;

if (!lineNumber) {
  console.error('Usage: node export-to-kml.js <line-number> [output-file.kml]');
  console.error('Example: node export-to-kml.js 7 line-7.kml');
  process.exit(1);
}

// Load the combined data
console.log('Loading combined data...');
const dataPath = path.join(__dirname, 'combined-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Find the requested line
const line = data.lines[lineNumber];
if (!line) {
  console.error(`Error: Line ${lineNumber} not found in the data.`);
  console.error('Available lines:', Object.keys(data.lines).sort((a, b) => {
    const aNum = parseInt(a) || 999;
    const bNum = parseInt(b) || 999;
    return aNum - bNum;
  }).join(', '));
  process.exit(1);
}

console.log(`Exporting Line ${lineNumber}: ${line.name}`);
console.log(`Type: ${line.type}`);
console.log(`Color: ${line.colour}`);
console.log(`Geometry points: ${line.geometry.length}`);

// Convert hex color to KML format (aabbggrr)
function hexToKmlColor(hex, alpha = 'ff') {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Extract RGB components
  const r = hex.substring(0, 2);
  const g = hex.substring(2, 4);
  const b = hex.substring(4, 6);
  
  // KML uses aabbggrr format
  return `${alpha}${b}${g}${r}`;
}

// Build KML document
function buildKML(line, lineNumber) {
  const kmlColor = hexToKmlColor(line.colour);
  
  // Build coordinates string (lon,lat,altitude format for KML)
  const coordinates = line.geometry
    .map(([lat, lon]) => `${lon},${lat},0`)
    .join('\n          ');
  
  // Build stop placemarks
  const stopPlacemarks = [];
  
  // Get all stops for this line from both directions
  const allStops = new Set([...line.directions.aller, ...line.directions.retour]);
  
  allStops.forEach(stopName => {
    const stop = data.stops[stopName];
    if (stop) {
      stopPlacemarks.push(`
    <Placemark>
      <name>${stopName}</name>
      <description>Line ${lineNumber} stop</description>
      <Style>
        <IconStyle>
          <color>${kmlColor}</color>
          <scale>0.8</scale>
          <Icon>
            <href>http://maps.google.com/mapfiles/kml/shapes/bus.png</href>
          </Icon>
        </IconStyle>
      </Style>
      <Point>
        <coordinates>${stop.lon},${stop.lat},0</coordinates>
      </Point>
    </Placemark>`);
    }
  });
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>TPG Line ${lineNumber} - ${line.name}</name>
    <description>Route for ${line.name} (${line.type})</description>
    
    <Style id="lineStyle">
      <LineStyle>
        <color>${kmlColor}</color>
        <width>4</width>
      </LineStyle>
    </Style>
    
    <Folder>
      <name>Route Path</name>
      <Placemark>
        <name>Line ${lineNumber} Route</name>
        <description>${line.name} - ${line.type}</description>
        <styleUrl>#lineStyle</styleUrl>
        <LineString>
          <tessellate>1</tessellate>
          <coordinates>
          ${coordinates}
          </coordinates>
        </LineString>
      </Placemark>
    </Folder>
    
    <Folder>
      <name>Stops</name>
      <description>All stops for Line ${lineNumber}</description>
      ${stopPlacemarks.join('\n')}
    </Folder>
    
    <Folder>
      <name>Direction: Aller</name>
      <description>Stops in Aller direction: ${line.directions.aller[line.directions.aller.length - 1]}</description>
      ${line.directions.aller.map((stopName, index) => {
        const stop = data.stops[stopName];
        if (!stop) return '';
        return `
      <Placemark>
        <name>${index + 1}. ${stopName}</name>
        <description>Stop ${index + 1} of ${line.directions.aller.length} (Aller)</description>
        <Point>
          <coordinates>${stop.lon},${stop.lat},0</coordinates>
        </Point>
      </Placemark>`;
      }).join('\n')}
    </Folder>
    
    <Folder>
      <name>Direction: Retour</name>
      <description>Stops in Retour direction: ${line.directions.retour[line.directions.retour.length - 1]}</description>
      ${line.directions.retour.map((stopName, index) => {
        const stop = data.stops[stopName];
        if (!stop) return '';
        return `
      <Placemark>
        <name>${index + 1}. ${stopName}</name>
        <description>Stop ${index + 1} of ${line.directions.retour.length} (Retour)</description>
        <Point>
          <coordinates>${stop.lon},${stop.lat},0</coordinates>
        </Point>
      </Placemark>`;
      }).join('\n')}
    </Folder>
    
  </Document>
</kml>`;
}

// Generate and save KML
const kml = buildKML(line, lineNumber);
fs.writeFileSync(outputFile, kml, 'utf8');

console.log(`\n✓ KML file generated successfully: ${outputFile}`);
console.log(`\nTo open in Google Earth Pro:`);
console.log(`1. Open Google Earth Pro`);
console.log(`2. File > Open > Select "${outputFile}"`);
console.log(`3. The route will be displayed with all stops`);
console.log(`\nDirections:`);
console.log(`  Aller: ${line.directions.aller.length} stops → ${line.directions.aller[line.directions.aller.length - 1]}`);
console.log(`  Retour: ${line.directions.retour.length} stops → ${line.directions.retour[line.directions.retour.length - 1]}`);
