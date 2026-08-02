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

async function applyTitlesAndSlugs() {
  console.log("Reading update-titles-slugs.sql...");
  const sqlFile = fs.readFileSync(
    path.join(__dirname, "..", "public", "Upload", "update-titles-slugs.sql"),
    "utf8"
  );

  // Parse SQL UPDATE statements
  const statements = sqlFile
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.startsWith("UPDATE products SET"));

  console.log(`Parsed ${statements.length} UPDATE statements.`);

  let updatedCount = 0;

  for (const stmt of statements) {
    // Extract meta_title, name, slug, and WHERE slug
    const metaTitleMatch = stmt.match(/meta_title\s*=\s*'([^']+)'/);
    const nameMatch = stmt.match(/name\s*=\s*'([^']+)'/);
    const newSlugMatch = stmt.match(/slug\s*=\s*'([^']+)'/);
    const whereSlugMatch = stmt.match(/WHERE\s+slug\s*=\s*'([^']+)'/);

    if (nameMatch && newSlugMatch && whereSlugMatch) {
      const metaTitle = metaTitleMatch ? metaTitleMatch[1] : null;
      const name = nameMatch[1];
      const newSlug = newSlugMatch[1];
      const oldSlug = whereSlugMatch[1];

      // Fetch existing product
      const { data: prods, error: fetchErr } = await supabase
        .from("products")
        .select("id, specs")
        .eq("slug", oldSlug);

      if (fetchErr || !prods || prods.length === 0) {
        console.warn(`Product not found for old slug: "${oldSlug}"`);
        continue;
      }

      const prod = prods[0];
      const updatedSpecs = {
        ...(prod.specs || {}),
        ...(metaTitle ? { _meta_title: metaTitle } : {}),
      };

      const { error: updateErr } = await supabase
        .from("products")
        .update({
          name: name,
          slug: newSlug,
          specs: updatedSpecs,
        })
        .eq("id", prod.id);

      if (updateErr) {
        console.error(`Error updating product ${oldSlug} -> ${newSlug}:`, updateErr.message);
      } else {
        updatedCount++;
      }
    }
  }

  console.log(`Successfully updated titles and slugs for ${updatedCount} products in Supabase Database!`);
}

applyTitlesAndSlugs();
