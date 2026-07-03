const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'upload', 'Battaryes', 'products_final.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

data.forEach((p, idx) => {
  if (p.name.includes('CROWN 12.8V 200AH') || p.name.includes('AKAIYAI')) {
    console.log(`Name: ${p.name}`);
    console.log(`Description: ${p.description}`);
    const text = (p.name + ' ' + (p.description || '')).toLowerCase();
    console.log(`Contains 'lifepo4':`, text.includes('lifepo4'));
    console.log(`Contains 'lithium':`, text.includes('lithium'));
  }
});
