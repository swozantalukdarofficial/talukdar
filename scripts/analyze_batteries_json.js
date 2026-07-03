const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'upload', 'Battaryes', 'products_final.json');
if (!fs.existsSync(jsonPath)) {
  console.error('File not found:', jsonPath);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
console.log(`Total records in final battery json: ${data.length}`);

const keywords = ['lithium', 'lifepo4', 'lead', 'acid', 'gel', 'tubular', 'agm', 'acut', 'graphene', 'solis'];
const matched = {};
keywords.forEach(kw => matched[kw] = 0);

data.forEach((p, idx) => {
  const text = (p.name + ' ' + (p.description || '')).toLowerCase();
  console.log(`[${idx+1}] Name: ${p.name}`);
  const matches = [];
  keywords.forEach(kw => {
    if (text.includes(kw)) {
      matched[kw]++;
      matches.push(kw);
    }
  });
  console.log(`    Matches: ${matches.join(', ')}`);
});

console.log('\nKeyword occurrence totals:', matched);
