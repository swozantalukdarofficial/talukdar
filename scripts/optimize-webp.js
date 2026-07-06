import sharp from "sharp";
import fs from "fs";
import path from "path";

const srcLogo = "src/assets/Webestone-Logo.png";
const destLogo = "src/assets/Webestone-Logo.webp";

const srcHero = "public/hero-thumbnail.jpg";
const destHero = "public/hero-thumbnail.webp";

async function optimize() {
  try {
    // 1. Convert and resize Logo to WebP
    if (fs.existsSync(srcLogo)) {
      console.log("Optimizing Logo to WebP...");
      await sharp(srcLogo)
        .resize(672, 140, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .webp({ quality: 85 })
        .toFile(destLogo);
      console.log("Logo converted to WebP successfully!");
    }

    // 2. Convert and resize Hero to WebP
    if (fs.existsSync(srcHero)) {
      console.log("Optimizing Hero Thumbnail to WebP...");
      await sharp(srcHero)
        .resize(634, 356, { fit: "cover" })
        .webp({ quality: 80 })
        .toFile(destHero);
      console.log("Hero converted to WebP successfully!");
    }
  } catch (error) {
    console.error("Error during optimization:", error);
  }
}

optimize();
