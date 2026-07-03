/**
 * Correct all product images using precise matching.
 * Compares normalized names and slugs by stripping all non-alphanumeric characters.
 */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

// Normalize a string to compare words accurately (removes hyphens, underscores, spaces)
function cleanStr(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function main() {
  console.log('=== Correcting Product Images via Precise Mapping ===\n');

  // 1. Load Cloudinary Cache
  const cachePath = path.join(__dirname, '..', 'upload', 'cloudinary_upload_cache.json');
  if (!fs.existsSync(cachePath)) {
    console.error('Cloudinary cache file not found!');
    return;
  }
  const cloudCache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
  console.log(`Loaded ${Object.keys(cloudCache).length} images from Cloudinary cache.`);

  // 2. Fetch all ebike products from database
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, slug, image_url')
    .eq('category', 'ebike');

  if (error) {
    console.error('Failed to fetch products:', error.message);
    return;
  }
  console.log(`Fetched ${products.length} ebike products from Supabase.`);

  let updatedCount = 0;

  for (const product of products) {
    const prodCleanSlug = cleanStr(product.slug);
    const prodCleanName = cleanStr(product.name);

    let bestMatchUrl = null;
    let bestScore = 0;
    let bestKey = null;

    // Check each key in Cloudinary cache
    Object.entries(cloudCache).forEach(([filename, url]) => {
      const fileClean = cleanStr(path.basename(filename, path.extname(filename)));
      
      let score = 0;

      // 1. Exact match of cleaned filename and slug/name
      if (fileClean === prodCleanSlug) {
        score += 100;
      }
      if (fileClean === prodCleanName) {
        score += 90;
      }

      // 2. Substring matching
      if (prodCleanSlug.includes(fileClean) || fileClean.includes(prodCleanSlug)) {
        score += 50;
      }
      if (prodCleanName.includes(fileClean) || fileClean.includes(prodCleanName)) {
        score += 40;
      }

      // 3. Word match count
      const fileWords = path.basename(filename, path.extname(filename))
        .toLowerCase()
        .split(/[^a-z0-9]/)
        .filter(w => w.length > 2);
      
      const nameWords = product.name
        .toLowerCase()
        .split(/[^a-z0-9]/)
        .filter(w => w.length > 2);

      let matchedWords = 0;
      nameWords.forEach(nw => {
        if (fileWords.includes(nw)) matchedWords++;
      });

      score += matchedWords * 10;

      // Update best match if score is higher
      if (score > bestScore) {
        bestScore = score;
        bestMatchUrl = url;
        bestKey = filename;
      }
    });

    // Check if we have a high-confidence match (score >= 40 means substring or word match of multiple terms)
    if (bestMatchUrl && bestScore >= 40) {
      if (product.image_url !== bestMatchUrl) {
        console.log(`[UPDATE] "${product.name}"`);
        console.log(`   Old Image: ...${product.image_url.substring(product.image_url.lastIndexOf('/'))}`);
        console.log(`   New Image: ...${bestMatchUrl.substring(bestMatchUrl.lastIndexOf('/'))} (Matched: "${bestKey}", Score: ${bestScore})`);
        
        const { error: updateErr } = await supabase
          .from('products')
          .update({ image_url: bestMatchUrl, images: [bestMatchUrl] })
          .eq('id', product.id);

        if (updateErr) {
          console.error(`   Error updating product:`, updateErr.message);
        } else {
          updatedCount++;
        }
      }
    } else {
      console.log(`[NO CONFIDENT MATCH] "${product.name}" (Best: "${bestKey}" with score ${bestScore})`);
    }
  }

  console.log(`\n=== Done! Updated ${updatedCount} products with their correct unique images. ===`);
}

main().catch(console.error);
