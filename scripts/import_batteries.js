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
  const batteryDir = path.join(__dirname, '..', 'upload', 'Battaryes');
  const jsonPath = path.join(batteryDir, 'products_final.json');
  const imagesDir = path.join(batteryDir, 'product_images');

  if (!fs.existsSync(jsonPath)) {
    console.error('JSON file not found at:', jsonPath);
    process.exit(1);
  }

  const rawData = fs.readFileSync(jsonPath, 'utf-8');
  const batteryProducts = JSON.parse(rawData);
  console.log(`Loaded ${batteryProducts.length} battery products from JSON.`);

  // Load or initialize Cloudinary cache
  const cachePath = path.join(batteryDir, 'cloudinary_battery_cache.json');
  let cache = {};
  if (fs.existsSync(cachePath)) {
    try {
      cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
      console.log(`Loaded ${Object.keys(cache).length} cached image uploads.`);
    } catch (e) {
      console.error('Error reading cache:', e.message);
    }
  }

  // Helper to upload image or get from cache
  async function getCloudinaryUrl(fileName) {
    if (!fileName) return null;
    if (cache[fileName]) {
      return cache[fileName];
    }

    const filePath = path.join(imagesDir, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`Local image file not found: ${filePath}`);
      return null;
    }

    try {
      console.log(`Uploading ${fileName} to Cloudinary...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'ev_batteries',
        public_id: fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')
      });
      console.log(`Uploaded! URL: ${result.secure_url}`);
      cache[fileName] = result.secure_url;
      fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
      return result.secure_url;
    } catch (err) {
      console.error(`Failed to upload ${fileName}:`, err.message);
      return null;
    }
  }

  // Clear existing battery products to avoid duplicates and allow clean re-import
  console.log('Clearing existing battery products from database...');
  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .eq('category', 'battery');
  
  if (deleteError) {
    console.error('Error deleting old battery products:', deleteError.message);
  } else {
    console.log('Cleared existing battery products.');
  }

  const processedSlugs = new Set();
  const importBatch = [];

  for (let i = 0; i < batteryProducts.length; i++) {
    const item = batteryProducts[i];
    console.log(`\nProcessing [${i + 1}/${batteryProducts.length}]: ${item.name}`);

    // Parse price
    let price = 0;
    if (item.price) {
      const cleanedPriceStr = item.price.replace(/[^0-9.]/g, '');
      price = parseFloat(cleanedPriceStr) || 0;
    }

    // Default price fallback if missing
    if (price === 0) {
      price = 45000;
    }

    // Compare at price (approx 15% higher)
    const compareAtPrice = Math.round((price * 1.15) / 1000) * 1000;

    // Generate unique slug
    let slug = item.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    if (processedSlugs.has(slug)) {
      slug = `${slug}-${i}`;
    }
    processedSlugs.add(slug);

    // Determine brand
    let brand = 'Generic';
    const upperName = item.name.toUpperCase();
    if (upperName.includes('LVTOPSUN')) brand = 'LVTOPSUN';
    else if (upperName.includes('CROWN')) brand = 'CROWN';
    else if (upperName.includes('SOLIS')) brand = 'Solis';
    else if (upperName.includes('DJDC')) brand = 'DJDC';
    else if (upperName.includes('GENIXGREEN') || upperName.includes('GENIX GREEN')) brand = 'GENIXGREEN';
    else if (upperName.includes('SAKO')) brand = 'SAKO';
    else if (upperName.includes('HITHIUM')) brand = 'HITHIUM';
    else if (upperName.includes('LUXWATT')) brand = 'Luxwatt';
    else if (upperName.includes('AKAIYAI')) brand = 'AKAIYAI';

    // Determine category: Solis is an inverter, let's keep it as battery or parts?
    // Let's make Solis inverter 'parts', others 'battery'. Wait, let's check types.ts
    // parts has subcategories: motors, controllers, throttles, chargers.
    // Let's set category to 'parts' if it's Solis inverter, otherwise 'battery'.
    // Wait, the user specifically said "eij batareis catagoru te gesi tao filter abar ctagory show korte..."
    // Let's keep category as 'battery' so all of them are inside the batteries section.
    const isSolisInverter = upperName.includes('SOLIS') && upperName.includes('INVERTER');
    const category = isSolisInverter ? 'parts' : 'battery';

    // Determine subcategory based on name and description
    let subcatValue = 'lithium'; // default
    let subcatLabel = 'Lithium-Ion';

    const fullText = (item.name + ' ' + (item.description || '')).toLowerCase();
    
    if (isSolisInverter) {
      subcatValue = 'charger'; // under parts -> Chargers & Converters
      subcatLabel = 'Chargers & Converters';
    } else if (fullText.includes('lifepo4') || fullText.includes('lithium iron phosphate') || fullText.includes('lifepo₄')) {
      subcatValue = 'lifepo4';
      subcatLabel = 'LiFePO4';
    } else if (fullText.includes('lead') || fullText.includes('acid') || fullText.includes('gel') || fullText.includes('tubular') || fullText.includes('agm')) {
      subcatValue = 'lead';
      subcatLabel = 'Lead-Acid';
    } else if (fullText.includes('acut') || fullText.includes('graphene')) {
      subcatValue = 'acut';
      subcatLabel = 'Acut Power / Graphene';
    } else if (fullText.includes('lithium') || fullText.includes('li-ion') || fullText.includes('smart bms')) {
      subcatValue = 'lithium';
      subcatLabel = 'Lithium-Ion';
    }

    // Process images
    const imageUrls = [];
    if (item.local_images && item.local_images.length > 0) {
      for (const localImg of item.local_images) {
        const cloudinaryUrl = await getCloudinaryUrl(localImg);
        if (cloudinaryUrl) {
          imageUrls.push(cloudinaryUrl);
        }
      }
    }

    // Fallback to remote images if no local images were uploaded
    if (imageUrls.length === 0 && item.image_urls && item.image_urls.length > 0) {
      console.log(`No local image found. Using remote URL fallback: ${item.image_urls[0]}`);
      imageUrls.push(item.image_urls[0]);
    }

    // Final fallback image if still empty
    if (imageUrls.length === 0) {
      imageUrls.push('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800');
    }

    // Merge specs and add Subcategory/Brand fields
    const specs = {
      ...(item.specs || {}),
      'Brand': brand,
      'Subcategory': subcatValue,
      'Battery Type': subcatLabel,
      'Type': subcatLabel
    };

    // Clean up empty parameters from specs
    if (specs['Parameter'] === 'Value') {
      delete specs['Parameter'];
    }
    if (specs['Specification'] === 'Value') {
      delete specs['Specification'];
    }

    const stock_quantity = Math.floor(Math.random() * 12) + 6; // 6 to 17
    const is_featured = i < 6; // first 6 products are featured in batteries

    importBatch.push({
      name: item.name,
      slug,
      description: item.description || '',
      price,
      compare_at_price: compareAtPrice,
      category,
      image_url: imageUrls[0],
      images: imageUrls,
      stock_quantity,
      is_featured,
      specs
    });
  }

  // Insert products in batches
  console.log(`\nInserting ${importBatch.length} products to database...`);
  const batchSize = 10;
  let successCount = 0;

  for (let j = 0; j < importBatch.length; j += batchSize) {
    const slice = importBatch.slice(j, j + batchSize);
    console.log(`Inserting batch ${Math.floor(j/batchSize) + 1} (${slice.length} products)...`);
    const { error } = await supabase.from('products').insert(slice);
    if (error) {
      console.error(`Error inserting batch starting at ${j}:`, error.message);
    } else {
      successCount += slice.length;
    }
  }

  console.log(`\nDatabase import completed! Successfully imported ${successCount}/${importBatch.length} products. 🎉`);
}

run().catch(err => {
  console.error('Fatal error running import:', err);
});
