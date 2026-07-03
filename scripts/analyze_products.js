/**
 * Analyze the original JSON to understand what the "5" named products actually are
 * and what their real names and prices should be
 */
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'upload', 'bikebd_ev_scooters_bulk_import.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

console.log('=== Original JSON Analysis ===\n');
console.log('Total records:', data.length);

// Check how names were derived
const records = data.map(item => {
  const urlParts = item.URL ? item.URL.split('/') : [];
  const urlSlug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2] || '';
  
  // Convert slug to proper name
  const realName = urlSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: item.Title,
    brand: item.Brand,
    price: item.Price_Cleaned ? parseInt(item.Price_Cleaned) : 0,
    url: item.URL,
    urlSlug,
    realName,
    isBadTitle: !item.Title || /^\d+(\.\d+)?$/.test(String(item.Title).trim())
  };
});

// Show which ones had bad titles (just a number like "5" or "0")
const badTitles = records.filter(r => r.isBadTitle);
const goodTitles = records.filter(r => !r.isBadTitle);

console.log('\nRecords with PROPER titles:', goodTitles.length);
console.log('Records with BAD titles (just a rating number):', badTitles.length);

console.log('\n--- BAD TITLE records (real name from URL) ---');
badTitles.forEach(r => {
  console.log(`  "${r.title}" → Real name: "${r.realName}" | Brand: ${r.brand} | Price: ৳${r.price}`);
});

console.log('\n--- GOOD TITLE records ---');
goodTitles.slice(0, 10).forEach(r => {
  console.log(`  "${r.title}" → URL name: "${r.realName}" | Brand: ${r.brand} | Price: ৳${r.price}`);
});

// Check for actual price data
console.log('\n=== Price Analysis ===');
const withPrice = records.filter(r => r.price > 0);
const withoutPrice = records.filter(r => r.price === 0);
console.log('Records with real price:', withPrice.length);
console.log('Records without price:', withoutPrice.length);

// Group by brand to see variation structure
console.log('\n=== Brand Model Count ===');
const brandModels = {};
records.forEach(r => {
  if (!brandModels[r.brand]) brandModels[r.brand] = [];
  brandModels[r.brand].push({ name: r.realName, price: r.price, slug: r.urlSlug });
});

Object.entries(brandModels)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([brand, models]) => {
    console.log(`\n  ${brand} (${models.length} models):`);
    models.forEach(m => console.log(`    - ${m.name} → ৳${m.price}`));
  });
