/**
 * Fix product images - Map each product to its correct Cloudinary image
 * using the scooter_images filenames and URL slugs
 */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

async function main() {
  console.log('=== Fix Product Images ===\n');

  // Load cloudinary cache
  const cachePath = path.join(__dirname, '..', 'upload', 'cloudinary_upload_cache.json');
  const cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
  
  // Build a lookup: normalized filename -> cloudinary URL
  const imgLookup = {};
  Object.entries(cache).forEach(([filename, url]) => {
    // Only use ev_scooters images
    if (!url.includes('ev_scooters') && !url.includes('akij')) return;
    
    const baseName = path.basename(filename, path.extname(filename));
    // Normalize: lowercase, remove special chars, split into words
    const norm = baseName.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
    imgLookup[norm] = url;
    
    // Also store by original filename
    imgLookup[baseName.toLowerCase()] = url;
  });

  console.log('Image lookup entries:', Object.keys(imgLookup).length);

  // Load original JSON for URL-to-image mapping
  const jsonPath = path.join(__dirname, '..', 'upload', 'bikebd_ev_scooters_bulk_import.json');
  const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  // Build URL slug -> image filename mapping
  const slugToImg = {};
  const imgFiles = fs.readdirSync(path.join(__dirname, '..', 'upload', 'scooter_images'));
  
  rawData.forEach(item => {
    const urlParts = item.URL ? item.URL.split('/') : [];
    const urlSlug = urlParts[urlParts.length - 1] || '';
    if (!urlSlug) return;
    
    // Convert URL slug to potential image filename format
    // e.g., "green-tiger-gt-leo" -> "Green_Tiger_GT-Leo"
    const slugNorm = urlSlug.toLowerCase().replace(/-/g, ' ');
    
    // Find best matching image file
    let bestMatch = null;
    let bestScore = 0;
    
    imgFiles.forEach(file => {
      const fileBase = path.basename(file, path.extname(file));
      const fileNorm = fileBase.toLowerCase().replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim();
      
      // Score: count matching words
      const slugWords = slugNorm.split(' ').filter(w => w.length > 1);
      const fileWords = fileNorm.split(' ').filter(w => w.length > 1);
      
      let score = 0;
      slugWords.forEach(sw => {
        if (fileWords.some(fw => fw.includes(sw) || sw.includes(fw))) score++;
      });
      
      // Bonus for exact matches
      if (fileNorm === slugNorm) score += 10;
      if (fileNorm.replace(/\s/g, '') === slugNorm.replace(/\s/g, '')) score += 8;
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = file;
      }
    });
    
    if (bestMatch && bestScore >= 2) {
      slugToImg[urlSlug] = bestMatch;
    }
  });

  console.log('URL slug to image mappings:', Object.keys(slugToImg).length);

  // Get all ebike products
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, slug, image_url, specs')
    .eq('category', 'ebike');

  if (error) { console.error(error); return; }
  console.log('Total ebike products:', products.length);

  let fixed = 0;
  let alreadyGood = 0;
  let noMatch = 0;

  for (const product of products) {
    // Skip if already has a real Cloudinary image
    if (product.image_url && product.image_url.includes('cloudinary.com')) {
      alreadyGood++;
      continue;
    }

    // Try to find image by product name
    const nameNorm = product.name.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
    
    // Method 1: Direct name match in lookup
    let cloudUrl = imgLookup[nameNorm];
    
    // Method 2: Try partial matches
    if (!cloudUrl) {
      const nameWords = nameNorm.split(' ').filter(w => w.length > 2);
      const lookupKeys = Object.keys(imgLookup);
      
      let bestKey = null;
      let bestScore = 0;
      
      lookupKeys.forEach(key => {
        let score = 0;
        nameWords.forEach(nw => {
          if (key.includes(nw)) score++;
        });
        if (score > bestScore && score >= 2) {
          bestScore = score;
          bestKey = key;
        }
      });
      
      if (bestKey) cloudUrl = imgLookup[bestKey];
    }

    // Method 3: Try slug-based match
    if (!cloudUrl) {
      const slugClean = product.slug.replace(/-/g, ' ');
      const lookupKeys = Object.keys(imgLookup);
      const match = lookupKeys.find(k => {
        const kClean = k.replace(/\s+/g, '');
        const sClean = slugClean.replace(/\s+/g, '');
        return kClean.includes(sClean) || sClean.includes(kClean);
      });
      if (match) cloudUrl = imgLookup[match];
    }

    if (cloudUrl) {
      const { error: updateErr } = await supabase
        .from('products')
        .update({ image_url: cloudUrl, images: [cloudUrl] })
        .eq('id', product.id);

      if (!updateErr) {
        console.log(`  ✓ ${product.name} → ${cloudUrl.split('/').pop()}`);
        fixed++;
      }
    } else {
      console.log(`  ✗ No image found for: ${product.name}`);
      noMatch++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`  Already had Cloudinary image: ${alreadyGood}`);
  console.log(`  Fixed with correct image: ${fixed}`);
  console.log(`  No image match: ${noMatch}`);
}

main();
