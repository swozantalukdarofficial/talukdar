const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const filesToUpload = [
  { key: 'ebike', file: 'e bike.avif' },
  { key: 'battery', file: 'bataries.avif' },
  { key: 'parts', file: 'parts.jpg' },
  { key: 'accessories', file: 'acccosories.jpg' }
];

async function run() {
  console.log('Starting upload of category images to Cloudinary...');
  const results = {};
  
  for (const item of filesToUpload) {
    const filePath = path.join(__dirname, '..', 'upload', item.file);
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }
    
    try {
      console.log(`Uploading ${item.file} to Cloudinary...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'ev_categories',
        public_id: item.key
      });
      console.log(`Successfully uploaded ${item.key}! URL: ${result.secure_url}`);
      results[item.key] = result.secure_url;
    } catch (err) {
      console.error(`Error uploading ${item.key}:`, err.message);
    }
  }
  
  console.log('\n--- UPLOAD SUMMARY (JSON) ---');
  console.log(JSON.stringify(results, null, 2));
}

run();
