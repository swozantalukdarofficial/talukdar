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

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  // Format: "(80W x 30৳) = 2,400৳" or similar
  const parts = priceStr.split('=');
  const target = parts[parts.length - 1]; // get portion after =
  const clean = target.replace(/,/g, '').replace(/৳/g, '').replace(/taka/gi, '').trim();
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : parsed;
}

async function run() {
  const imagesDir = path.join(__dirname, '..', 'upload', 'Solar panel', 'solar_panel_images');
  if (!fs.existsSync(imagesDir)) {
    console.error('solar_panel_images directory not found at:', imagesDir);
    process.exit(1);
  }

  const jsonFilePath = path.join(__dirname, '..', 'upload', 'Solar panel', 'solar_panels_final.json');
  if (!fs.existsSync(jsonFilePath)) {
    console.error('solar_panels_final.json not found at:', jsonFilePath);
    process.exit(1);
  }

  // Load Cloudinary cache
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

  // Find all local image files
  const imageFiles = fs.readdirSync(imagesDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.webp' || ext === '.png' || ext === '.jpg' || ext === '.jpeg';
  });
  console.log(`Found ${imageFiles.length} image files in directory.`);

  const uploadMap = {}; // filename -> cloudinary_url

  // Upload images to Cloudinary
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const filePath = path.join(imagesDir, file);

    if (cache[file]) {
      console.log(`[${i+1}/${imageFiles.length}] Using cached upload for ${file}`);
      uploadMap[file] = cache[file];
      continue;
    }

    try {
      console.log(`[${i+1}/${imageFiles.length}] Uploading ${file} to Cloudinary...`);
      // Use filename (without extension) clean as public_id
      const publicId = path.basename(file, path.extname(file)).replace(/[^a-zA-Z0-9_-]/g, '_');
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'solar_panels',
        public_id: publicId
      });
      console.log(`Uploaded! URL: ${result.secure_url}`);
      uploadMap[file] = result.secure_url;
      cache[file] = result.secure_url;

      // Save cache progress periodically
      if (i % 5 === 0) {
        fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
      }
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }

  // Final cache save
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
  console.log('All image uploads to Cloudinary completed. Processing products JSON...');

  // Read products
  const productsRaw = fs.readFileSync(jsonFilePath, 'utf-8');
  const rawProducts = JSON.parse(productsRaw);

  const finalProducts = [];
  const sqlValues = [];

  for (const rawProd of rawProducts) {
    const name = rawProd.name;
    const slug = slugify(name);
    const description = rawProd.description || '';
    const price = parsePrice(rawProd.price);

    // Map local images to Cloudinary URLs
    const localImgList = rawProd.local_images || [];
    const cloudinaryUrls = localImgList
      .map(imgName => uploadMap[imgName] || cache[imgName])
      .filter(Boolean);

    // If no local images uploaded, fallback to original urls or placeholder
    const image_url = cloudinaryUrls[0] || rawProd.image_urls[0] || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800';
    const images = cloudinaryUrls.length > 0 ? cloudinaryUrls : (rawProd.image_urls || []);

    // Determine subcategory based on name
    let subcategory = 'mono';
    if (name.toLowerCase().includes('bifacial')) {
      subcategory = 'bifacial';
    } else if (name.toLowerCase().includes('heterojunction') || name.toLowerCase().includes('hjt')) {
      subcategory = 'hjt';
    }

    const specs = {
      ...(rawProd.specs || {}),
      Subcategory: subcategory
    };

    const product = {
      name,
      slug,
      description,
      price,
      compare_at_price: null,
      category: 'solar',
      image_url,
      images,
      stock_quantity: 15,
      is_featured: false,
      specs
    };

    finalProducts.push(product);

    // Escape single quotes for SQL
    const nameEscaped = name.replace(/'/g, "''");
    const slugEscaped = slug.replace(/'/g, "''");
    const descEscaped = description.replace(/'/g, "''");
    const imageUrlEscaped = image_url.replace(/'/g, "''");
    const imagesSql = "ARRAY[" + images.map(img => `'${img.replace(/'/g, "''")}'`).join(', ') + "]";
    const specsJson = JSON.stringify(specs).replace(/'/g, "''");

    sqlValues.push(`(
      '${nameEscaped}',
      '${slugEscaped}',
      '${descEscaped}',
      ${price},
      'solar',
      '${imageUrlEscaped}',
      ${imagesSql},
      15,
      false,
      '${specsJson}'::jsonb
    )`);
  }

  // 1. Generate SQL script file
  const sqlFolder = path.join(__dirname, '..', 'supabase');
  if (!fs.existsSync(sqlFolder)) {
    fs.mkdirSync(sqlFolder, { recursive: true });
  }

  const sqlContent = `-- ================================================================
-- SQL Script to import Solar Panels into EVStore Bangladesh DB
-- Run this in your Supabase SQL Editor
-- ================================================================

-- 1. Drop existing check constraint and add updated one with 'solar'
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE products ADD CONSTRAINT products_category_check CHECK (category IN ('ebike', 'battery', 'parts', 'accessories', 'solar'));

-- 2. Insert or update the products
INSERT INTO products (
  name,
  slug,
  description,
  price,
  category,
  image_url,
  images,
  stock_quantity,
  is_featured,
  specs
)
VALUES
${sqlValues.join(',\n')}
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  stock_quantity = EXCLUDED.stock_quantity,
  specs = EXCLUDED.specs,
  updated_at = now();
`;

  const sqlFilePath = path.join(sqlFolder, 'insert_solar_panels.sql');
  fs.writeFileSync(sqlFilePath, sqlContent, 'utf-8');
  console.log(`Generated SQL script file at: ${sqlFilePath}`);

  // Save the complete parsed JSON file too
  const parsedJsonPath = path.join(__dirname, '..', 'upload', 'Solar panel', 'solar_panels_ready.json');
  fs.writeFileSync(parsedJsonPath, JSON.stringify(finalProducts, null, 2), 'utf-8');
  console.log(`Generated ready JSON file at: ${parsedJsonPath}`);

  // 2. Try inserting via Supabase SDK
  console.log('Attempting direct insert to Supabase database via API...');
  const { data, error } = await supabase.from('products').upsert(finalProducts, { onConflict: 'slug' });
  if (error) {
    console.warn('\n⚠️ Direct API Insert failed (this is expected if you haven\'t updated the CHECK constraint in Supabase SQL editor yet):');
    console.warn(error.message);
    console.log('\n👉 PLEASE COPY AND RUN THE GENERATED SQL SCRIPT IN YOUR SUPABASE SQL EDITOR!');
    console.log(`File path: ${sqlFilePath}`);
  } else {
    console.log('\n✅ Direct API Insert succeeded! Solar panel products have been inserted/updated in Supabase successfully!');
  }
}

run();
