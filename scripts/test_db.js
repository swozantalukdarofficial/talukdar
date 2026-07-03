const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Testing insertion of a product with category "solar"...');
  const testProduct = {
    name: "Test Solar Product",
    slug: "test-solar-product",
    price: 9999,
    category: "solar",
    image_url: "https://example.com/image.png",
    description: "Test description"
  };

  const { data, error } = await supabase.from('products').insert([testProduct]).select();
  if (error) {
    console.error('Insert failed:', error.message, error);
  } else {
    console.log('Insert succeeded! Data:', data);
    // clean it up
    const { error: deleteError } = await supabase.from('products').delete().eq('slug', 'test-solar-product');
    if (deleteError) {
      console.error('Clean up failed:', deleteError.message);
    } else {
      console.log('Clean up succeeded!');
    }
  }
}

run();
