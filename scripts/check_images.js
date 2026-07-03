require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

async function main() {
  const { data } = await supabase.from('products').select('name, image_url').eq('category', 'ebike').order('name').limit(30);
  
  // Count unique images
  const imgCount = {};
  data.forEach(p => {
    imgCount[p.image_url] = (imgCount[p.image_url] || 0) + 1;
  });

  console.log('=== Image Distribution (first 30 products) ===\n');
  
  // Show duplicated images
  const dupes = Object.entries(imgCount).filter(([_, c]) => c > 1);
  if (dupes.length > 0) {
    console.log('DUPLICATED IMAGES:');
    dupes.forEach(([url, count]) => {
      console.log(`  ${count}x → ${url.substring(url.lastIndexOf('/') + 1)}`);
      const prods = data.filter(p => p.image_url === url);
      prods.forEach(p => console.log(`       - ${p.name}`));
    });
  }

  console.log('\nUnique images:', Object.keys(imgCount).length, 'out of', data.length, 'products');
  
  // Show all
  console.log('\n--- All products ---');
  data.forEach(p => {
    const imgName = p.image_url.includes('cloudinary') 
      ? p.image_url.split('/').pop() 
      : (p.image_url.includes('unsplash') ? 'UNSPLASH (generic)' : 'OTHER');
    console.log(`  ${p.name} → ${imgName}`);
  });
}
main();
