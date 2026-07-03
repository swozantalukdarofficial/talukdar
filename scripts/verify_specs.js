require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

async function main() {
  // Check Eve Motors 5 specifically
  const { data } = await supabase.from('products').select('name, specs').ilike('name', '%Eve Motors%');
  console.log('=== Eve Motors products ===');
  data.forEach(p => {
    console.log('\nName:', p.name);
    console.log('Specs:', JSON.stringify(p.specs, null, 2));
  });

  // Check a few more
  const { data: d2 } = await supabase.from('products').select('name, specs').ilike('name', '%Exploit Hammer%').limit(1);
  console.log('\n=== Exploit Hammer ===');
  d2.forEach(p => {
    console.log('Name:', p.name);
    console.log('Specs:', JSON.stringify(p.specs, null, 2));
  });

  const { data: d3 } = await supabase.from('products').select('name, specs').ilike('name', '%Yadea Velax%').limit(1);
  console.log('\n=== Yadea Velax ===');
  d3.forEach(p => {
    console.log('Name:', p.name);
    console.log('Specs:', JSON.stringify(p.specs, null, 2));
  });

  // Count how many have real specs now
  const { data: all } = await supabase.from('products').select('name, specs').eq('category', 'ebike');
  const withMileage = all.filter(p => p.specs && (p.specs.Mileage || p.specs['Motor Type'] || p.specs['Battery Type'] || p.specs['Front Brake Type']));
  console.log('\n=== Overall ===');
  console.log('Total ebikes:', all.length);
  console.log('With REAL bikebd specs:', withMileage.length);
}
main();
