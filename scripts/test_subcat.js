const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const subcat = 'lifepo4';
  const term = `%${subcat}%`;
  
  console.log('Testing subcategory search for term:', term);
  
  const { data, error } = await supabase
    .from('products')
    .select('id, name, category, specs')
    .eq('category', 'battery')
    .or(`name.ilike.${term},description.ilike.${term},specs->>Subcategory.ilike.${term},specs->>Type.ilike.${term},specs->>Battery Type.ilike.${term}`);
    
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log(`Found ${data.length} products:`);
    data.forEach(p => {
      console.log(`- ${p.name} (Subcategory: ${p.specs?.Subcategory}, Battery Type: ${p.specs?.['Battery Type']})`);
    });
  }
}

test();
