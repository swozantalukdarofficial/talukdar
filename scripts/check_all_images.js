require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

async function main() {
  const { data } = await supabase.from('products').select('name, image_url').eq('category', 'ebike').order('name');
  
  // Count unique images
  const imgCount = {};
  data.forEach(p => {
    imgCount[p.image_url] = (imgCount[p.image_url] || 0) + 1;
  });

  console.log('=== Image Distribution (ALL products) ===\n');
  console.log('Total products:', data.length);
  console.log('Unique images:', Object.keys(imgCount).length);

  // Show duplicated images
  const dupes = Object.entries(imgCount).filter(([_, c]) => c > 1).sort((a, b) => b[1] - a[1]);
  if (dupes.length > 0) {
    console.log('\nDUPLICATED IMAGES (Top 15):');
    dupes.slice(0, 15).forEach(([url, count]) => {
      console.log(`  ${count}x → ${url.substring(url.lastIndexOf('/') + 1)}`);
      const prods = data.filter(p => p.image_url === url);
      prods.slice(0, 5).forEach(p => console.log(`       - ${p.name}`));
      if (prods.length > 5) console.log(`       - ... and ${prods.length - 5} more`);
    });
  }
}
main();
