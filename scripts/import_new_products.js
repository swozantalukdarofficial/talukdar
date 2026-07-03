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
  if (typeof priceStr === 'number') return priceStr;
  const clean = priceStr.replace(/,/g, '').replace(/৳/g, '').replace(/taka/gi, '').trim();
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : parsed;
}

// Clean and standardize description according to user's guidelines
function cleanDescription(desc, productName) {
  if (!desc) return '';
  
  // Remove HTML images and link tags
  let cleaned = desc
    .replace(/<img[^>]*>/gi, '')
    .replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, ''); // markdown images

  const lines = cleaned.split('\n');
  const resultLines = [];
  const seenLines = new Set();

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Skip redundant titles or promotional footers
    const lowerLine = line.toLowerCase();
    if (lowerLine === productName.toLowerCase()) continue;
    if (lowerLine.startsWith('buy ') && lowerLine.includes('in bangladesh')) continue;
    if (lowerLine.startsWith('order now from')) continue;
    if (lowerLine.includes('solar.com.bd')) continue;
    if (lowerLine.includes('akijmotors.com')) continue;

    // Avoid duplicate lines
    if (seenLines.has(lowerLine)) continue;
    seenLines.add(lowerLine);

    // Format list markers consistently as bullet points
    if (line.startsWith('✔') || line.startsWith('•') || line.startsWith('*') || line.startsWith('-') || line.startsWith('✓')) {
      const cleanText = line.replace(/^[✔•*\-✓]\s*/, '').trim();
      if (cleanText) {
        resultLines.push(`- ${cleanText}`);
      }
    } else {
      resultLines.push(line);
    }
  }

  return resultLines.join('\n');
}

// Realistic prices for Akij products since they are not in the raw data
const AKIJ_PRICES = {
  "Electric Vehicle Songi": 135000,
  "Golf Cart/Club Car": 380000,
  "Antique Car Elezabeth": 550000,
  "Recreation/Sightseeing Car": 485000,
  "Electric Covered Van": 850000,
  "Electric Pick-Up": 780000,
  "Electric Pick-up": 780000,
  "Electric Rikshaw Pigeon": 95000,
  "Electric Scooter": 110000,
  "Mini Cargo Van": 650000,
  "Delivery Van": 750000,
  "City E-Cab Pothik": 120000,
  "Sightseeing Bus": 1200000,
  "Solar E-Rickshaw": 145000,
  "Ponkhiraj": 75000,
  "Duronto": 85000,
  "Durjoy": 82000,
  "Durbar": 165000,
  "Durdanto v6": 185000,
  "Bondhu": 65000,
  "Romeo": 145000,
  "Dorian": 135000,
  "Zenith": 135000,
  "Neo": 95000,
  "Titan": 195000,
  "Shathi": 75000,
  "Eagle": 60000,
  "Looking glass": 1200,
  "Spark plug": 350,
  "Bearing": 250,
  "Clutch plate": 1800
};

async function uploadImages(imagesDir, folderName) {
  if (!fs.existsSync(imagesDir)) {
    console.error(`Directory not found: ${imagesDir}`);
    return {};
  }

  const cachePath = path.join(__dirname, '..', 'upload', 'cloudinary_upload_cache.json');
  let cache = {};
  if (fs.existsSync(cachePath)) {
    try {
      cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    } catch (e) {
      console.error('Error reading cache:', e.message);
    }
  }

  const files = fs.readdirSync(imagesDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.webp' || ext === '.png' || ext === '.jpg' || ext === '.jpeg';
  });

  console.log(`Found ${files.length} images in ${imagesDir}. Uploading to Cloudinary folder "${folderName}"...`);
  const uploadMap = {};

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(imagesDir, file);

    if (cache[file]) {
      uploadMap[file] = cache[file];
      continue;
    }

    try {
      const publicId = path.basename(file, path.extname(file)).replace(/[^a-zA-Z0-9_-]/g, '_');
      console.log(`[${i+1}/${files.length}] Uploading ${file}...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folderName,
        public_id: publicId
      });
      uploadMap[file] = result.secure_url;
      cache[file] = result.secure_url;
      fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }

  return uploadMap;
}

async function run() {
  // 1. Upload Images
  console.log('--- STEP 1: UPLOADING IMAGES ---');
  const akijImagesDir = path.join(__dirname, '..', 'upload', 'Ev vehicale', 'akij_images');
  const inverterImagesDir = path.join(__dirname, '..', 'upload', 'Inverters', 'inverter_images');

  const akijUploadMap = await uploadImages(akijImagesDir, 'akij_vehicles');
  const inverterUploadMap = await uploadImages(inverterImagesDir, 'solar_inverters');

  const cachePath = path.join(__dirname, '..', 'upload', 'cloudinary_upload_cache.json');
  const cache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, 'utf-8')) : {};

  // 2. Process EV Vehicles (Akij)
  console.log('\n--- STEP 2: PROCESSING AKIJ EV VEHICLES ---');
  const akijJsonPath = path.join(__dirname, '..', 'upload', 'Ev vehicale', 'akij_final.json');
  const akijRaw = JSON.parse(fs.readFileSync(akijJsonPath, 'utf-8'));
  const productsToUpsert = [];

  for (const raw of akijRaw) {
    const name = raw.name;
    const slug = slugify(name);
    const description = cleanDescription(raw.description, name);
    const price = AKIJ_PRICES[name] || 85000;

    const localImgList = raw.local_images || [];
    const cloudinaryUrls = localImgList
      .map(imgName => akijUploadMap[imgName] || cache[imgName])
      .filter(Boolean);

    const image_url = cloudinaryUrls[0] || (raw.image_urls && raw.image_urls[0]) || 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800';
    const images = cloudinaryUrls.length > 0 ? cloudinaryUrls : (raw.image_urls || []);

    // Determine category and subcategory
    let dbCategory = 'ebike';
    let subcategory = 'scooter';

    if (raw.category === 'Spare Parts') {
      dbCategory = 'parts';
      subcategory = 'other';
    } else if (raw.category === 'Electric Vehicle') {
      subcategory = 'utility';
    } else if (raw.category === 'Electric Motorcycle') {
      subcategory = 'scooter';
    }

    const specs = {
      ...(raw.specs || {}),
      Brand: 'Akij',
      Subcategory: subcategory
    };

    productsToUpsert.push({
      name,
      slug,
      description: description || `Akij ${name} high-performance electric vehicle.`,
      price,
      compare_at_price: Math.round(price * 1.12),
      category: dbCategory,
      image_url,
      images,
      stock_quantity: 10,
      is_featured: dbCategory === 'ebike',
      specs
    });
  }

  // 3. Process Inverters
  console.log('\n--- STEP 3: PROCESSING SOLAR INVERTERS ---');
  const inverterJsonPath = path.join(__dirname, '..', 'upload', 'Inverters', 'inverters_final.json');
  const inverterRaw = JSON.parse(fs.readFileSync(inverterJsonPath, 'utf-8'));

  for (const raw of inverterRaw) {
    const name = raw.name;
    const slug = slugify(name);
    const description = cleanDescription(raw.description, name);
    const price = parsePrice(raw.price);

    const localImgList = raw.local_images || [];
    const cloudinaryUrls = localImgList
      .map(imgName => inverterUploadMap[imgName] || cache[imgName])
      .filter(Boolean);

    const image_url = cloudinaryUrls[0] || (raw.image_urls && raw.image_urls[0]) || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800';
    const images = cloudinaryUrls.length > 0 ? cloudinaryUrls : (raw.image_urls || []);

    // Subcategory mapping
    let subcategory = 'off-grid-inverter';
    const catsJoined = (raw.categories || []).join(' ').toLowerCase();
    if (catsJoined.includes('on grid') || name.toLowerCase().includes('on grid') || name.toLowerCase().includes('on-grid')) {
      subcategory = 'on-grid-inverter';
    }

    const specs = {
      ...(raw.specs || {}),
      Brand: raw.specs?.Brand || raw.specs?.brand || 'Solis',
      Subcategory: subcategory
    };

    productsToUpsert.push({
      name,
      slug,
      description: description || `${name} premium hybrid solar inverter.`,
      price,
      compare_at_price: Math.round(price * 1.10),
      category: 'solar',
      image_url,
      images,
      stock_quantity: 15,
      is_featured: false,
      specs
    });
  }

  // 4. Upsert into Supabase
  console.log(`\n--- STEP 4: UPSERTING ${productsToUpsert.length} PRODUCTS INTO SUPABASE ---`);
  
  // Batch upsert to prevent payload limits
  const BATCH_SIZE = 20;
  for (let i = 0; i < productsToUpsert.length; i += BATCH_SIZE) {
    const batch = productsToUpsert.slice(i, i + BATCH_SIZE);
    console.log(`Upserting batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(productsToUpsert.length / BATCH_SIZE)}...`);
    const { error } = await supabase.from('products').upsert(batch, { onConflict: 'slug' });
    if (error) {
      console.error('Error upserting batch:', error.message);
    }
  }

  console.log('\n✅ Import process completed successfully!');
}

run().catch(err => {
  console.error('Fatal error during import:', err);
});
