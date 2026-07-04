const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../src/app/icon.svg');
const publicFaviconPath = path.join(__dirname, '../public/favicon.ico');
const appFaviconPath = path.join(__dirname, '../src/app/favicon.ico');

async function generate() {
  try {
    console.log('Generating favicon from:', svgPath);
    
    // Read SVG and convert to 48x48 PNG (standard size for Google favicon)
    const pngBuffer = await sharp(svgPath)
      .resize(48, 48)
      .png()
      .toBuffer();

    // Write to public/favicon.ico
    fs.writeFileSync(publicFaviconPath, pngBuffer);
    console.log('Successfully wrote:', publicFaviconPath);

    // Write to src/app/favicon.ico
    fs.writeFileSync(appFaviconPath, pngBuffer);
    console.log('Successfully wrote:', appFaviconPath);

    // Also generate a high-res PNG version for modern browsers
    const publicPngPath = path.join(__dirname, '../public/icon.png');
    await sharp(svgPath)
      .resize(192, 192)
      .png()
      .toFile(publicPngPath);
    console.log('Successfully wrote:', publicPngPath);

  } catch (error) {
    console.error('Failed to generate favicon:', error);
  }
}

generate();
