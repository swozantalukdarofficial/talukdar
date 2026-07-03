const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, specs')
    .eq('category', 'battery');
    
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log(`Found ${data.length} battery products:`);
    const counts = {};
    data.forEach(p => {
      const sub = p.specs?.Subcategory || 'none';
      const label = p.specs?.['Battery Type'] || 'none';
      console.log(`- Name: ${p.name}`);
      console.log(`  Subcat: ${sub}, Label: ${label}`);
      counts[sub] = (counts[sub] || 0) + 1;
    });
    console.log('\nSubcategory counts:', counts);
  }
}

test();
