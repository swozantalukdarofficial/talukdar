const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: products, error } = await supabase.from('products').select('id, name, image_url');
  if (error) {
    console.error("Error:", error.message);
    return;
  }

  console.log(`Total Products: ${products.length}`);
  const domains = {};
  products.forEach(p => {
    try {
      const url = new URL(p.image_url);
      domains[url.hostname] = (domains[url.hostname] || 0) + 1;
    } catch(e) {
      domains["invalid_url"] = (domains["invalid_url"] || 0) + 1;
    }
  });

  console.log("\nImage Domains Distribution:");
  console.log(domains);

  console.log("\nSample Image URLs:");
  products.slice(0, 10).forEach(p => console.log(`- ${p.name}: ${p.image_url}`));
}

run();
