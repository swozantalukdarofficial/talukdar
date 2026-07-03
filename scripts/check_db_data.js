const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('products').select('category, specs');
  if (error) {
    console.error('Error fetching:', error);
    return;
  }

  console.log(`Fetched ${data.length} products.`);
  const categories = {};
  const brandsByCategory = {};

  data.forEach(p => {
    categories[p.category] = (categories[p.category] || 0) + 1;
    const brand = p.specs?.Brand || p.specs?.brand || 'No Brand';
    if (!brandsByCategory[p.category]) {
      brandsByCategory[p.category] = new Set();
    }
    brandsByCategory[p.category].add(brand);
  });

  console.log('\nCategories count:');
  console.log(categories);

  console.log('\nBrands by category:');
  Object.keys(brandsByCategory).forEach(cat => {
    console.log(`- ${cat}:`, Array.from(brandsByCategory[cat]));
  });
}

run();
