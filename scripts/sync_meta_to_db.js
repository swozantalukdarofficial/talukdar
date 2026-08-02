const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const metaDescriptions = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "src", "data", "meta-descriptions.json"), "utf8")
);

async function syncMetaToDatabase() {
  console.log("Fetching all products from Supabase to sync meta descriptions...");
  const { data: products, error } = await supabase.from("products").select("id, slug, specs");

  if (error) {
    console.error("Error fetching products:", error);
    return;
  }

  console.log(`Found ${products.length} products. Updating specs._meta_description in DB...`);
  let count = 0;

  for (const prod of products) {
    const metaDesc = metaDescriptions[prod.slug];
    if (metaDesc) {
      const updatedSpecs = {
        ...(prod.specs || {}),
        _meta_description: metaDesc,
      };

      const { error: updateErr } = await supabase
        .from("products")
        .update({ specs: updatedSpecs })
        .eq("id", prod.id);

      if (updateErr) {
        console.error(`Error updating ${prod.slug}:`, updateErr.message);
      } else {
        count++;
      }
    }
  }

  console.log(`Successfully synced meta descriptions to database for ${count} products.`);
}

syncMetaToDatabase();
