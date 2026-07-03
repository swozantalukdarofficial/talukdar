const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

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

function cleanDescription(desc, productName) {
  if (!desc) return '';
  let cleaned = desc
    .replace(/<img[^>]*>/gi, '')
    .replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '');

  const lines = cleaned.split('\n');
  const resultLines = [];
  const seenLines = new Set();

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    const lowerLine = line.toLowerCase();
    if (lowerLine === productName.toLowerCase()) continue;
    if (lowerLine.startsWith('buy ') && lowerLine.includes('in bangladesh')) continue;
    if (seenLines.has(lowerLine)) continue;
    seenLines.add(lowerLine);
    if (line.startsWith('✔') || line.startsWith('•') || line.startsWith('*') || line.startsWith('-') || line.startsWith('✓')) {
      const cleanText = line.replace(/^[✔•*\-✓]\s*/, '').trim();
      if (cleanText) resultLines.push(`- ${cleanText}`);
    } else {
      resultLines.push(line);
    }
  }
  return resultLines.join('\n');
}

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

  console.log(`Found ${files.length} images in ${imagesDir}.`);
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
      const result = await cloudinary.uploader.upload(filePath, { folder: folderName, public_id: publicId });
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
  console.log('--- STEP 1: UPLOADING SCOOTER IMAGES ---');
  const scooterImagesDir = path.join(__dirname, '..', 'upload', 'scooter_images');
  const scooterUploadMap = await uploadImages(scooterImagesDir, 'scooter_images');

  const cachePath = path.join(__dirname, '..', 'upload', 'cloudinary_upload_cache.json');
  const cache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, 'utf-8')) : {};

  console.log('\n--- STEP 2: PROCESSING MISSING PRODUCTS ---');
  const jsonPath = path.join(__dirname, '..', 'upload', 'bikebd_ev_scooters_bulk_import.json');
  const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  const { data: existingData } = await supabase.from('products').select('slug, category, specs');
  const existingSlugs = new Set((existingData || []).map(p => p.slug));

  const productsToUpsert = [];
  const productsToUpdateCategory = []; 
  const processedSlugs = new Set(existingSlugs);

  for (const raw of rawData) {
    const title = raw.Title || raw.name || raw.title;
    if (!title) continue;
    
    let name = title.replace(/Price\s+In\s+BD.*/gi, '').replace(/All\s+Variants.*/gi, '').replace(/—.*/gi, '').trim();
    if (raw.Brand && !name.toLowerCase().includes(raw.Brand.toLowerCase())) {
        name = `${raw.Brand} ${name}`;
    }
    
    let baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;
    while (processedSlugs.has(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    processedSlugs.add(slug);
    
    // Check if it's a commercial vehicle
    const isCommercial = name.toLowerCase().includes('rickshaw') || 
                         name.toLowerCase().includes('auto') || 
                         name.toLowerCase().includes('pickup') || 
                         name.toLowerCase().includes('pick-up') ||
                         name.toLowerCase().includes('bus') || 
                         name.toLowerCase().includes('van') ||
                         name.toLowerCase().includes('cargo');

    let subcategory = 'scooter';
    if (isCommercial) {
      if (name.toLowerCase().includes('rickshaw') || name.toLowerCase().includes('auto')) subcategory = 'rickshaw';
      else if (name.toLowerCase().includes('pickup') || name.toLowerCase().includes('pick-up') || name.toLowerCase().includes('van')) subcategory = 'pickup';
      else if (name.toLowerCase().includes('bus')) subcategory = 'bus';
      else subcategory = 'utility';
    }

    if (existingSlugs.has(slug)) {
      const existingProduct = existingData.find(p => p.slug === slug);
      if (isCommercial && existingProduct.category !== 'commercial') {
        productsToUpdateCategory.push({
          slug,
          category: 'commercial',
          specs: { ...(existingProduct.specs || {}), Subcategory: subcategory }
        });
      }
      continue;
    }

    const description = cleanDescription(raw.description, name);
    const priceStr = String(raw.Price_Cleaned || raw.Price || raw.price || '0').replace(/,/g, '');
    let price = parseFloat(priceStr);
    if (isNaN(price) || price === 0) price = 85000;
    
    const dbCategory = isCommercial ? 'commercial' : 'ebike';
    
    let image_url = 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800';
    let images = [];
    
    if (raw.URL) {
        // Find matching image by base name (we don't have local_images mapped, but we can search the cache)
        const possibleImageNames = Object.keys(cache).filter(k => k.toLowerCase().includes(raw.Brand?.toLowerCase() || '') || k.toLowerCase().includes(name.split(' ')[0].toLowerCase()));
        if (possibleImageNames.length > 0) {
            image_url = cache[possibleImageNames[0]];
            images = [image_url];
        }
    }

    const specs = {
      Brand: raw.Brand || 'EVStore',
      Subcategory: subcategory
    };
    
    // Add dynamically extracted specs from the raw object
    Object.keys(raw).forEach(k => {
       if (k.includes('Specifications - ') && raw[k]) {
           const specKey = k.split('Specifications - ')[1].replace(':', '').trim();
           if (specKey && raw[k]) specs[specKey] = raw[k];
       }
    });

    productsToUpsert.push({
      name,
      slug,
      description: description || `${name} high-performance electric vehicle.`,
      price,
      compare_at_price: Math.round(price * 1.10),
      category: dbCategory,
      image_url,
      images,
      stock_quantity: 10,
      is_featured: false,
      specs
    });
  }

  console.log(`\n--- STEP 3: UPDATING ${productsToUpdateCategory.length} COMMERCIAL VEHICLES ---`);
  for (const p of productsToUpdateCategory) {
    console.log(`Updating ${p.slug} to category: commercial`);
    const { error } = await supabase.from('products').update({ category: p.category, specs: p.specs }).eq('slug', p.slug);
    if (error) console.error(`Error updating ${p.slug}:`, error.message);
  }

  console.log(`\n--- STEP 4: UPSERTING ${productsToUpsert.length} NEW PRODUCTS INTO SUPABASE ---`);
  const BATCH_SIZE = 10;
  for (let i = 0; i < productsToUpsert.length; i += BATCH_SIZE) {
    const batch = productsToUpsert.slice(i, i + BATCH_SIZE);
    console.log(`Upserting batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(productsToUpsert.length / BATCH_SIZE)}...`);
    const { error } = await supabase.from('products').upsert(batch, { onConflict: 'slug' });
    if (error) {
        console.error('Error upserting batch:', error.message);
        if (error.code === '23514') {
            console.error('\n❌ DATABASE CONSTRAINT ERROR: You must update the category check constraint in Supabase to allow "commercial".');
            console.error('❌ Please run the SQL file: supabase/update_commercial_category.sql in your Supabase SQL Editor.');
            process.exit(1);
        }
    }
  }

  console.log('\n✅ Import process completed successfully!');
}

run().catch(err => {
  console.error('Fatal error during import:', err);
});
