/**
 * replace_watermarked_images.js
 * 
 * Watermark-free images গুলো Cloudinary-তে OVERWRITE করে,
 * তারপর DB-তে নতুন URL update করে।
 * 
 * File naming convention: ProductName_result.webp
 * Cloudinary folder: ev_scooters
 */

const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// ── Config ──────────────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Service role key bypasses RLS — needed for bulk DB writes from scripts
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey
);

const IMAGES_DIR  = path.join(__dirname, '..', 'upload', 'scooter_images');
const REPORT_PATH = path.join(__dirname, '..', 'upload', 'replace_report.json');
const CLOUD_FOLDER = 'ev_scooters';

// ── Helpers ──────────────────────────────────────────────────────────────────
/** "AIMA_F520_result.webp" → "AIMA_F520" (public_id for Cloudinary) */
function fileToPublicId(filename) {
  return filename.replace(/_result\.webp$/i, '');
}

/** Normalize string: lowercase, remove non-alphanumeric → for fuzzy match */
function norm(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log('\n🚀 Starting watermark-free image replacement...\n');

  // 1. Read local files
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('❌ Folder not found:', IMAGES_DIR);
    process.exit(1);
  }
  const files = fs.readdirSync(IMAGES_DIR)
    .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f));

  console.log(`📁 Found ${files.length} local images in upload/scooter_images\n`);

  // 2. Fetch all products from DB
  const { data: products, error: dbErr } = await supabase
    .from('products')
    .select('id, name, slug, image_url, images');

  if (dbErr) { console.error('❌ DB fetch error:', dbErr.message); process.exit(1); }
  console.log(`📦 Fetched ${products.length} products from database\n`);
  console.log('─'.repeat(70));

  const report = { uploaded: [], updated: [], skipped: [], errors: [] };

  // 3. Upload each file to Cloudinary (overwrite: true)
  for (let i = 0; i < files.length; i++) {
    const file    = files[i];
    const publicId = fileToPublicId(file);           // e.g. "AIMA_F520"
    const filePath = path.join(IMAGES_DIR, file);

    process.stdout.write(`[${String(i+1).padStart(3)}/${files.length}] Uploading ${file}... `);

    let cloudUrl;
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder:    CLOUD_FOLDER,
        public_id: publicId,
        overwrite: true,          // ← replaces existing image!
        invalidate: true,         // ← CDN cache bust
        resource_type: 'image',
      });
      cloudUrl = result.secure_url;
      console.log(`✅ ${cloudUrl.split('/').pop()}`);
      report.uploaded.push({ file, publicId, url: cloudUrl });
    } catch (err) {
      console.log(`❌ FAILED — ${err.message}`);
      report.errors.push({ file, error: err.message });
      continue; // skip DB update for this file
    }

    // 4. Find matching product(s) in DB
    const normPublicId = norm(publicId); // e.g. "aimaf520"

    const matched = products.filter(p => {
      const normSlug = norm(p.slug || '');
      const normName = norm(p.name || '');
      return (
        normSlug === normPublicId ||
        normName === normPublicId ||
        normPublicId.includes(normSlug) ||
        normSlug.includes(normPublicId) ||
        normPublicId.includes(normName) ||
        normName.includes(normPublicId)
      );
    });

    if (matched.length === 0) {
      console.log(`   ⚠️  No DB match for "${publicId}" — skipped DB update`);
      report.skipped.push({ file, publicId, reason: 'no DB match' });
      continue;
    }

    // 5. Update DB for each matched product
    for (const product of matched) {
      const { error: updateErr } = await supabase
        .from('products')
        .update({
          image_url: cloudUrl,
          images:    [cloudUrl],
        })
        .eq('id', product.id);

      if (updateErr) {
        console.log(`   ❌ DB update failed for "${product.name}": ${updateErr.message}`);
        report.errors.push({ file, product: product.name, error: updateErr.message });
      } else {
        console.log(`   🔗 DB updated → "${product.name}"`);
        report.updated.push({ file, publicId, product: product.name, url: cloudUrl });
      }
    }
  }

  // 6. Save report
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  // 7. Summary
  console.log('\n' + '═'.repeat(70));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(70));
  console.log(`✅ Uploaded to Cloudinary : ${report.uploaded.length}/${files.length}`);
  console.log(`🔗 DB records updated     : ${report.updated.length}`);
  console.log(`⚠️  Skipped (no DB match)  : ${report.skipped.length}`);
  console.log(`❌ Errors                 : ${report.errors.length}`);
  console.log(`\n📄 Full report saved → upload/replace_report.json`);
  console.log('═'.repeat(70) + '\n');

  if (report.skipped.length > 0) {
    console.log('⚠️  Products with no DB match (manual review needed):');
    report.skipped.forEach(s => console.log(`   - ${s.publicId}`));
  }
  if (report.errors.length > 0) {
    console.log('\n❌ Errors:');
    report.errors.forEach(e => console.log(`   - ${e.file}: ${e.error}`));
  }
}

run().catch(err => {
  console.error('\n💥 Fatal error:', err.message);
  process.exit(1);
});
