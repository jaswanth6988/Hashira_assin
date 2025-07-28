const fs = require('fs');

// Read the original file
const dirty = fs.readFileSync('testcases.json', 'utf8');

// Remove non-ASCII characters and fix whitespace
const clean = dirty.replace(/[^\x00-\x7F]/g, '')
                  .replace(/\s+/g, ' ')
                  .replace(/,(\s*})/g, '$1');

// Write cleaned version
fs.writeFileSync('testcases_clean.json', clean);

console.log('Created cleaned JSON file: testcases_clean.json');
