const fs = require('fs');

// Read and clean the JSON file
const cleanJson = () => {
  try {
    const dirty = fs.readFileSync('testcases.json', 'utf8');
    
    // Remove all non-ASCII characters and fix common JSON issues
    const clean = dirty
      .replace(/[^\x00-\x7F]/g, '') // Remove non-ASCII
      .replace(/\s+/g, ' ')          // Normalize whitespace
      .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
      .replace(/'/g, '"');           // Replace single quotes
    
    fs.writeFileSync('testcases_clean.json', clean);
    console.log('Successfully created cleaned JSON file');
  } catch (err) {
    console.error('Error cleaning JSON:', err.message);
  }
};

cleanJson();
