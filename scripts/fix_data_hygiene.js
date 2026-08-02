const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function toTitleCase(str) {
  if (!str) return str;
  // If string is ALL CAPS, convert to Title Case
  if (str === str.toUpperCase() && str.length > 3) {
    return str
      .toLowerCase()
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return str;
}

function cleanTitle(name) {
  if (!name) return name;
  let clean = name.trim();

  // Fix typos
  clean = clean.replace(/ELECTRINICS/gi, "Electronics");
  clean = clean.replace(/\bBUSS\b/gi, "Bus");
  clean = clean.replace(/Orinal/gi, "Original");
  clean = clean.replace(/REMOTE CONTROLL/gi, "Remote Control");
  clean = clean.replace(/DIFFERENCIAL/gi, "Differential");

  // Remove "Price" at the end of product name
  clean = clean.replace(/\s+Price$/i, "");

  // Convert ALL CAPS titles
  clean = toTitleCase(clean);

  return clean;
}

async function fixDataHygiene() {
  console.log("Fetching all products from Supabase...");
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return;
  }

  console.log(`Found ${products.length} products to audit...`);
  let updatedCount = 0;

  for (const prod of products) {
    let modified = false;
    const updates = {};

    // 1. Title cleanup
    const newName = cleanTitle(prod.name);
    if (newName !== prod.name) {
      console.log(`[Title Fix] "${prod.name}" -> "${newName}"`);
      updates.name = newName;
      modified = true;
    }

    // 2. Specific price fix for LVTOPSUN 6KW
    if (prod.name.includes("LVTOPSUN") && prod.name.includes("6KW")) {
      if (prod.price < 30000) {
        console.log(`[Price Fix] LVTOPSUN 6KW from ৳${prod.price} to ৳62,500`);
        updates.price = 62500;
        updates.compare_at_price = 68000;
        modified = true;
      }
    }

    // 3. Fix invalid compare_at_price (negative discount)
    if (prod.compare_at_price && prod.compare_at_price <= prod.price) {
      console.log(`[Discount Fix] Removing invalid compare_at_price (${prod.compare_at_price} <= ${prod.price}) for ${prod.name}`);
      updates.compare_at_price = null;
      modified = true;
    }

    // 4. Fix description HTML <h1> -> <h2>
    if (prod.description && prod.description.includes("<h1")) {
      console.log(`[Description Fix] Replacing <h1> with <h2> in ${prod.name}`);
      updates.description = prod.description
        .replace(/<h1(\s|>)/gi, "<h2$1")
        .replace(/<\/h1>/gi, "</h2>");
      modified = true;
    }

    if (modified) {
      const { error: updateErr } = await supabase
        .from("products")
        .update(updates)
        .eq("id", prod.id);

      if (updateErr) {
        console.error(`Failed to update ${prod.name}: ${updateErr.message}`);
      } else {
        updatedCount++;
      }
    }
  }

  console.log(`Successfully updated ${updatedCount} products in database.`);
}

fixDataHygiene();
