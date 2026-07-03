require('dotenv').config({ path: '.env.local' });
const { getAllProducts } = require('./src/lib/products');

async function main() {
  console.log('=== Verifying commercial category filter ===');
  const products = await getAllProducts({ category: 'commercial' });
  console.log('Total commercial products found:', products.length);
  products.forEach(p => {
    console.log(`  - ${p.name} (Subcategory: ${p.specs?.Subcategory})`);
  });
}
main();
