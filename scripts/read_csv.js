const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'upload', 'Battaryes', 'lithium_batteries_bulk_upload.csv');
if (!fs.existsSync(csvPath)) {
  console.error('File not found:', csvPath);
  process.exit(1);
}

const lines = fs.readFileSync(csvPath, 'utf-8').split('\n');
console.log(`Total lines: ${lines.length}`);
console.log('Header line:', lines[0]);
console.log('Sample line 1:', lines[1]);
console.log('Sample line 2:', lines[2]);
console.log('Sample line 3:', lines[3]);
