const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials missing in .env.local!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function run() {
  const imagesDir = path.join(__dirname, '..', 'upload', 'scooter_images');
  if (!fs.existsSync(imagesDir)) {
    console.error('scooter_images directory not found at:', imagesDir);
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir).filter(file => file.endsWith('.webp'));
  console.log(`Found ${files.length} images to upload in ${imagesDir}`);

  // Fetch all products from DB first
  console.log('Fetching products from database...');
  const { data: products, error: fetchError } = await supabase.from('products').select('id, name, slug');
  if (fetchError) {
    console.error('Error fetching products:', fetchError.message);
    process.exit(1);
  }
  console.log(`Fetched ${products.length} products from database.`);

  const uploadMap = {}; // filename_clean -> secure_url

  // Let's check if there is an existing JSON cache to avoid re-uploading if script fails/retries
  const cachePath = path.join(__dirname, '..', 'upload', 'cloudinary_upload_cache.json');
  let cache = {};
  if (fs.existsSync(cachePath)) {
    try {
      cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
      console.log(`Loaded ${Object.keys(cache).length} cached image uploads.`);
    } catch (e) {
      console.error('Error reading cache:', e.message);
    }
  }

  // Upload to Cloudinary
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const cleanKey = file.replace(/\.webp$/, '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const filePath = path.join(imagesDir, file);

    if (cache[file]) {
      console.log(`[${i+1}/${files.length}] Using cached upload for ${file}`);
      uploadMap[cleanKey] = cache[file];
      continue;
    }

    try {
      console.log(`[${i+1}/${files.length}] Uploading ${file} to Cloudinary...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'ev_scooters',
        public_id: file.replace(/\.webp$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')
      });
      console.log(`Uploaded! URL: ${result.secure_url}`);
      uploadMap[cleanKey] = result.secure_url;
      cache[file] = result.secure_url;
      
      // Save cache progress every 5 uploads
      if (i % 5 === 0) {
        fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
      }
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }

  // Final cache save
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
  console.log('All image uploads to Cloudinary completed. Syncing with database products...');

  // Map to products and update
  let matchedCount = 0;
  for (const product of products) {
    const nameClean = product.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const slugClean = product.slug.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Look for match in uploadMap
    let matchedUrl = null;
    let matchReason = '';

    // Check direct slug match
    if (uploadMap[slugClean]) {
      matchedUrl = uploadMap[slugClean];
      matchReason = `direct slug match: ${slugClean}`;
    } else {
      // Check if any clean filename matches or is contained in slug/name
      for (const [cleanFileKey, url] of Object.entries(uploadMap)) {
        if (slugClean === cleanFileKey || nameClean.includes(cleanFileKey) || cleanFileKey.includes(slugClean)) {
          matchedUrl = url;
          matchReason = `fuzzy match: ${cleanFileKey}`;
          break;
        }
      }
    }

    if (matchedUrl) {
      console.log(`Mapping product "${product.name}" (${product.slug}) -> Cloudinary URL via ${matchReason}`);
      const { error: updateError } = await supabase
        .from('products')
        .update({
          image_url: matchedUrl,
          images: [matchedUrl]
        })
        .eq('id', product.id);

      if (updateError) {
        console.error(`Failed to update DB for product ${product.name}:`, updateError.message);
      } else {
        matchedCount++;
      }
    } else {
      console.log(`No local image matched for product "${product.name}" (${product.slug})`);
    }
  }

  console.log(`Done! Successfully matched and updated ${matchedCount} out of ${products.length} products.`);
}

run().catch(err => {
  console.error('Global script failure:', err);
});
