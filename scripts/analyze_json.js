const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'upload', 'bikebd_ev_scooters_bulk_import.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const data = JSON.parse(rawData);

const allKeys = new Set();
data.forEach(r => {
  Object.keys(r).forEach(k => {
    allKeys.add(k);
  });
});

console.log('Total unique keys across all records:', allKeys.size);
console.log('Sample keys that do NOT contain "Launched Date:" or "Best Lube For":');
const filtered = Array.from(allKeys).filter(k => 
  !k.includes('Launched Date:') && 
  !k.includes('Best Lube For') && 
  !['Title', 'Brand', 'Price', 'Price_Cleaned', 'URL', 'Spec URL'].includes(k)
);
console.log(filtered.slice(0, 30));
console.log('How many such keys:', filtered.length);
