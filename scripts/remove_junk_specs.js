/**
 * Remove junk/irrelevant specs from all ebike products
 * - "Mileage: 0 Kmpl" (fuel metric, irrelevant for EVs)
 * - Any spec with value "0" or "0 Kmpl" 
 * - "Subcategory" (internal key, not for customers)
 */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

// Keys to completely remove
const REMOVE_KEYS = ['Mileage', 'Subcategory'];

// Values that indicate junk data
const JUNK_VALUES = ['0', '0 Kmpl', '0 kmpl', 'N/A', 'n/a', '-', 'Info Not Available'];

async function main() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, specs')
    .eq('category', 'ebike');

  if (error) { console.error(error); return; }

  let updated = 0;
  for (const p of products) {
    if (!p.specs) continue;

    const newSpecs = {};
    let changed = false;

    Object.entries(p.specs).forEach(([key, val]) => {
      const strVal = String(val).trim();

      // Remove specific keys
      if (REMOVE_KEYS.includes(key)) { changed = true; return; }

      // Remove junk values
      if (JUNK_VALUES.includes(strVal)) { changed = true; return; }

      newSpecs[key] = val;
    });

    if (changed) {
      await supabase.from('products').update({ specs: newSpecs }).eq('id', p.id);
      updated++;
    }
  }

  console.log(`Cleaned ${updated} products`);

  // Verify
  const { data: check } = await supabase.from('products').select('name, specs').ilike('name', '%Yadea Velax%').limit(1);
  if (check[0]) {
    console.log('\nYadea Velax specs:');
    Object.entries(check[0].specs).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
  }
}
main();
