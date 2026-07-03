/**
 * Fix specific edge cases for images and names:
 * 1. Delete duplicate 'Akij 5' (Akij Durjoy is already present)
 * 2. Rename 'Huaihai E Thander' to 'Huaihai E-Thunder' and map to HUAIHAI_E-Thunder.webp
 * 3. Map 'Tailg F72 Leopard' to Tailg_Leopard_F72.webp
 * 4. Map 'Walton Takyon Fusion 25t1' to Walton_Takyon__LEO_25T1.webp
 */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

async function main() {
  console.log('=== Fixing Specific Product Details & Images ===\n');

  // 1. Delete Akij 5
  const { error: delErr } = await supabase
    .from('products')
    .delete()
    .eq('name', 'Akij 5');
  if (delErr) {
    console.error('Failed to delete Akij 5:', delErr.message);
  } else {
    console.log('✓ Deleted duplicate product "Akij 5"');
  }

  // Get Cloudinary cache to find exact URLs
  const fs = require('fs');
  const cache = JSON.parse(fs.readFileSync('upload/cloudinary_upload_cache.json', 'utf-8'));

  // 2. Fix Huaihai E Thander
  const thanderUrl = cache['HUAIHAI_E-Thunder.webp'];
  if (thanderUrl) {
    const { error: err } = await supabase
      .from('products')
      .update({
        name: 'Huaihai E-Thunder',
        image_url: thanderUrl,
        images: [thanderUrl]
      })
      .eq('name', 'Huaihai E Thander');
    if (err) console.error('Failed to update Huaihai E Thander:', err.message);
    else console.log('✓ Updated "Huaihai E Thander" -> "Huaihai E-Thunder" with correct image');
  }

  // 3. Fix Tailg F72 Leopard
  const leopardUrl = cache['Tailg_Leopard_F72.webp'];
  if (leopardUrl) {
    const { error: err } = await supabase
      .from('products')
      .update({
        image_url: leopardUrl,
        images: [leopardUrl]
      })
      .eq('name', 'Tailg F72 Leopard');
    if (err) console.error('Failed to update Tailg F72 Leopard:', err.message);
    else console.log('✓ Updated "Tailg F72 Leopard" with correct image');
  }

  // 4. Fix Walton Takyon Fusion 25t1
  const waltonUrl = cache['Walton_Takyon__LEO_25T1.webp'];
  if (waltonUrl) {
    const { error: err } = await supabase
      .from('products')
      .update({
        name: 'Walton Takyon Leo 25T1',
        image_url: waltonUrl,
        images: [waltonUrl]
      })
      .eq('name', 'Walton Takyon Fusion 25t1');
    if (err) console.error('Failed to update Walton Takyon Fusion 25t1:', err.message);
    else console.log('✓ Updated "Walton Takyon Fusion 25t1" -> "Walton Takyon Leo 25T1" with correct image');
  }

  console.log('\nAll specific fixes complete!');
}

main().catch(console.error);
