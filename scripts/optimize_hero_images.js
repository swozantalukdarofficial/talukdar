const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "..", "public");

async function optimizeImages() {
  const files = fs.readdirSync(publicDir);
  console.log("Starting WebP optimization for hero images...");

  for (const file of files) {
    if (file.endsWith(".png") && !file.includes("icon")) {
      const srcPath = path.join(publicDir, file);
      const targetName = file.replace(/\.png$/, ".webp");
      const destPath = path.join(publicDir, targetName);

      const beforeSize = fs.statSync(srcPath).size / 1024;
      await sharp(srcPath)
        .webp({ quality: 82, effort: 6 })
        .toFile(destPath);

      const afterSize = fs.statSync(destPath).size / 1024;
      console.log(`Converted ${file} (${beforeSize.toFixed(1)} KB) -> ${targetName} (${afterSize.toFixed(1)} KB)`);
    }
  }

  console.log("Image optimization complete!");
}

optimizeImages();
