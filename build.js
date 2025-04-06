const fs = require('fs');
const path = require('path');

// Read the manifest
const manifestPath = path.join(__dirname, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Generate build time in format YYYYMMDD.HHMMSS
const now = new Date();
const buildTime = now.getFullYear().toString() +
                 (now.getMonth() + 1).toString().padStart(2, '0') +
                 now.getDate().toString().padStart(2, '0') + '.' +
                 now.getHours().toString().padStart(2, '0') +
                 now.getMinutes().toString().padStart(2, '0') +
                 now.getSeconds().toString().padStart(2, '0');

// Update version and version_name
manifest.version = manifest.version.replace('${BUILD_TIME}', buildTime);
manifest.version_name = manifest.version_name.replace('${BUILD_TIME}', buildTime);

// Write back to manifest
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2)); 