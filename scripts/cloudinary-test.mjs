import { v2 as cloudinary } from "cloudinary";

// ── Step 1: Configure Cloudinary ─────────────────────────────────
cloudinary.config({
  cloud_name: "wgjgoifx",
  api_key: "289761241227249",
  api_secret: "LxEcH3KpSOigJXWEg10DSQfqqWY",
  secure: true,
});

// ── Step 2: Upload a sample image ────────────────────────────────
console.log("📤 Uploading image...");

const uploadResult = await cloudinary.uploader.upload(
  "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  {
    public_id: "ev_store_test_sample",
    overwrite: true,
    folder: "ev-store",
  }
);

console.log("\n✅ Upload successful!");
console.log("   Secure URL :", uploadResult.secure_url);
console.log("   Public ID  :", uploadResult.public_id);

// ── Step 3: Image metadata ────────────────────────────────────────
console.log("\n📊 Image details:");
console.log("   Width      :", uploadResult.width, "px");
console.log("   Height     :", uploadResult.height, "px");
console.log("   Format     :", uploadResult.format);
console.log("   File size  :", uploadResult.bytes, "bytes");

// ── Step 4: Generate transformed URL ─────────────────────────────
const transformedUrl = cloudinary.url(uploadResult.public_id, {
  fetch_format: "auto", // f_auto — serves best format (WebP, AVIF, etc.) per browser
  quality: "auto",      // q_auto — reduces file size with minimal quality loss
  secure: true,
});

console.log("\n🎉 Done! Click link below to see optimized version of the image.");
console.log("   Check the size and the format.");
console.log("\n   🔗 Transformed URL:");
console.log("  ", transformedUrl);
