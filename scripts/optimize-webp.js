import sharp from "sharp";
import fs from "fs";
import path from "path";

const assetsDir = "src/assets";
const publicDir = "public";

async function optimizeFolder(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(dirPath, file);
    
    // Only optimize raw PNG and JPG/JPEG files
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      const baseName = path.basename(file, ext);
      const outputWebpPath = path.join(dirPath, `${baseName}.webp`);

      // Skip already optimized webp conversion if it exists and original hasn't changed (optional check)
      console.log(`Converting and optimizing: ${filePath} -> WebP...`);
      try {
        const image = sharp(filePath);
        const metadata = await image.metadata();

        // If it's a huge background image, resize it to max 1920 width to prevent excessive size
        if (metadata.width > 1920) {
          await image
            .resize(1920)
            .webp({ quality: 80 })
            .toFile(outputWebpPath);
        } else {
          await image
            .webp({ quality: 80 })
            .toFile(outputWebpPath);
        }
        console.log(`Successfully created: ${outputWebpPath}`);
      } catch (err) {
        console.error(`Failed to optimize ${file}:`, err);
      }
    }
  }
}

async function run() {
  console.log("Starting bulk image WebP optimization...");
  await optimizeFolder(assetsDir);
  await optimizeFolder(publicDir);
  console.log("All images optimized successfully!");
}

run();
