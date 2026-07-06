import fs from "fs";
import path from "path";

// List of target image filenames to replace extensions for
const imagesToReplace = [
  "ai-brain",
  "ai-letters",
  "ai-robot",
  "circuit-board",
  "seo-dashboard",
  "seo-guide-blog",
  "Webestone-Logo",
  "digital-marketing-guide",
  "motion_hero",
  "motion_services",
  "ppc_cta",
  "shopify_seo_hero",
  "top-10-digital-marketing-agency-in-bangladesh",
  "video_commercial",
  "video_corporate",
  "video_editing_hero",
  "video_post",
  "video_process",
  "video_reels",
  "web_dev_hero",
  "wordpress_hero"
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let replaced = false;

  imagesToReplace.forEach((imageName) => {
    // Replace imageName.png with imageName.webp
    const pngRegex = new RegExp(`${imageName}\\.png`, "g");
    if (pngRegex.test(content)) {
      content = content.replace(pngRegex, `${imageName}.webp`);
      replaced = true;
    }

    // Replace imageName.jpg with imageName.webp
    const jpgRegex = new RegExp(`${imageName}\\.jpg`, "g");
    if (jpgRegex.test(content)) {
      content = content.replace(jpgRegex, `${imageName}.webp`);
      replaced = true;
    }
  });

  if (replaced) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Updated image extensions in: ${filePath}`);
  }
}

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // Skip node_modules and .git
      if (file !== "node_modules" && file !== ".git" && file !== "dist") {
        traverseDirectory(fullPath);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === ".tsx" || ext === ".ts" || ext === ".html" || ext === ".css") {
        replaceInFile(fullPath);
      }
    }
  });
}

console.log("Replacing image extensions (.png/.jpg -> .webp) in source code...");
traverseDirectory("./src");
replaceInFile("./index.html");
console.log("Image extension updates complete!");
