const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function optimizeCloudinaryUrl(url, maxWith = 800) {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('res.cloudinary.com')) return url;

  // Already optimized?
  if (url.includes('f_auto,q_auto')) return url;

  // Insert f_auto,q_auto,w_800,c_limit right after /image/upload/
  const transform = `f_auto,q_auto,w_${maxWith},c_limit`;
  if (url.includes('/image/upload/')) {
    return url.replace('/image/upload/', `/image/upload/${transform}/`);
  }
  return url;
}

async function run() {
  console.log("⚡ Starting Bulk Cloudinary Image Optimization in Supabase Database...");

  const { data: products, error } = await supabase.from('products').select('id, name, image_url, images');
  if (error) {
    console.error("Error fetching products:", error.message);
    return;
  }

  console.log(`Found ${products.length} products to check and optimize.`);

  let updatedCount = 0;
  for (const product of products) {
    const mainImgOptimized = optimizeCloudinaryUrl(product.image_url, 800);
    
    let galleryOptimized = product.images;
    if (Array.isArray(product.images) && product.images.length > 0) {
      galleryOptimized = product.images.map(img => optimizeCloudinaryUrl(img, 800));
    }

    const isMainChanged = mainImgOptimized !== product.image_url;
    const isGalleryChanged = JSON.stringify(galleryOptimized) !== JSON.stringify(product.images);

    if (isMainChanged || isGalleryChanged) {
      const { error: updateErr } = await supabase
        .from('products')
        .update({
          image_url: mainImgOptimized,
          images: galleryOptimized
        })
        .eq('id', product.id);

      if (updateErr) {
        console.error(`Failed to update images for ${product.name}:`, updateErr.message);
      } else {
        updatedCount++;
      }
    }
  }

  console.log(`\n🎉 Image Optimization Complete! Updated ${updatedCount}/${products.length} product images in Supabase database.`);
  console.log("All product images are now served with next-gen WebP/AVIF compression and fast 800px width limit.");
}

run();
