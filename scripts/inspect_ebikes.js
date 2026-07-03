const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, category, specs')
    .eq('category', 'ebike')
    .limit(10);
    
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Sample e-bikes:');
    data.forEach(p => {
      console.log(`- ${p.name}`);
      console.log(`  Subcategory: ${p.specs?.Subcategory}, Type: ${p.specs?.Type}, Vehicle Type: ${p.specs?.['Vehicle Type']}`);
    });
  }
}

test();
