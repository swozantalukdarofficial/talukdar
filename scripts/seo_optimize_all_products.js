const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Clean up text
function cleanText(text) {
  if (!text) return "";
  return text.replace(/\s+/g, " ").trim();
}

// Generate high ranking SEO content for a product
function generateSeoData(product) {
  const name = cleanText(product.name);
  const category = product.category || "ebike";
  const specs = product.specs || {};
  const brand = specs.Brand || specs.brand || "EV Solution";
  const price = product.price ? `৳${product.price.toLocaleString('en-BD')}` : "Best Price";
  
  // Extract key specs
  const motor = specs.Motor || specs["Motor Power"] || specs["motor"] || "";
  const battery = specs.Battery || specs["Battery Type"] || specs["battery"] || "";
  const range = specs.Range || specs["Max Range(loaded)"] || specs["range"] || "";
  const topSpeed = specs["Top Speed"] || specs["speed"] || "";
  const subcategory = specs.Subcategory || category;

  // 1. SEO Title (max 60 chars)
  let primaryKw = `${name} Price in BD`;
  let seoTitle = `${primaryKw} | EV Store`;
  if (seoTitle.length > 60) {
    seoTitle = `${name.slice(0, 45)} Price in BD`;
  }

  // 2. Meta Description (max 155 chars)
  let metaDesc = `Buy ${name} in Bangladesh at ${price}. ${brand} ${category} featuring official warranty and fast delivery across BD. Order online today!`;
  if (metaDesc.length > 155) {
    metaDesc = `Buy ${name} at ${price} in Bangladesh. Features official warranty and fast home delivery across BD. Order online now!`;
  }
  if (metaDesc.length > 155) {
    metaDesc = metaDesc.slice(0, 152) + "...";
  }

  // 3. Structured High-Ranking Description Content
  let formattedDesc = `${name} is an advanced ${category} designed for high efficiency and smooth commuting in Bangladesh. Engineered with durable components and reliable energy efficiency, it offers optimal performance on Bangladeshi roads.

Key Features & Specifications:
`;

  if (motor) formattedDesc += `⚡ Motor Output: ${motor}\n`;
  if (battery) formattedDesc += `🔋 Battery Type: ${battery}\n`;
  if (range) formattedDesc += `🚀 Travel Range: ${range} per charge\n`;
  if (topSpeed) formattedDesc += `💨 Top Speed: ${topSpeed}\n`;
  
  Object.keys(specs).forEach(key => {
    if (!["Motor", "Battery", "Range", "Top Speed"].includes(key) && typeof specs[key] === "string" && specs[key].length < 60) {
      formattedDesc += `⚙️ ${key}: ${specs[key]}\n`;
    }
  });

  formattedDesc += `
Why Buy From EV Store?
✅ 100% Genuine Quality Guarantee
✅ Official Warranty & Spare Parts Availability
✅ Fast Delivery across Dhaka & all Districts in Bangladesh
✅ 0% Interest EMI Facility Available`;

  return {
    description: formattedDesc,
    seo_title: seoTitle,
    meta_description: metaDesc
  };
}

async function run() {
  console.log("Starting bulk SEO optimization for all products in Supabase...");
  
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    console.error("Error fetching products from Supabase:", error.message);
    return;
  }

  console.log(`Found ${products.length} products to process.`);

  let updatedCount = 0;
  for (const product of products) {
    const seoData = generateSeoData(product);
    
    // Update product record in Supabase
    const { error: updateErr } = await supabase
      .from('products')
      .update({
        description: seoData.description,
      })
      .eq('id', product.id);

    if (updateErr) {
      console.error(`Failed to update ${product.name} (ID: ${product.id}):`, updateErr.message);
    } else {
      updatedCount++;
      if (updatedCount % 20 === 0 || updatedCount === products.length) {
        console.log(`Updated ${updatedCount}/${products.length} products in Supabase.`);
      }
    }
  }

  console.log(`\n🎉 Successfully completed SEO optimization and upload for ${updatedCount} products in Supabase!`);
}

run();
