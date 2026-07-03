require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

async function main() {
  const { data, error } = await supabase.from('products').select('id, name, price, specs, description, category').eq('category', 'ebike');
  if (error) { console.error(error); return; }

  const broken = data.filter(p => {
    if (!p.specs) return true;
    const keys = Object.keys(p.specs);
    return !keys.includes('Motor Power') && !keys.includes('Range');
  });

  const good = data.filter(p => {
    if (!p.specs) return false;
    const keys = Object.keys(p.specs);
    return keys.includes('Motor Power') && keys.includes('Range');
  });

  console.log('Total ebike products:', data.length);
  console.log('Products with FULL specs:', good.length);
  console.log('Products with MISSING specs:', broken.length);
  console.log('\n--- Sample BROKEN products ---');
  broken.slice(0, 15).forEach(p => {
    console.log('  Name:', p.name, '| Price:', p.price, '| Keys:', Object.keys(p.specs || {}));
  });
  console.log('\n--- Sample GOOD products ---');
  good.slice(0, 5).forEach(p => {
    console.log('  Name:', p.name, '| Price:', p.price, '| Keys:', Object.keys(p.specs || {}));
  });
}

main();
