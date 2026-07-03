/**
 * Fix Missing Specs Script
 * ─────────────────────────
 * Finds all ebike products that are missing full specifications
 * (Motor Power, Range, Battery, etc.) and regenerates them based
 * on the price tier, exactly like import_bulk_products.js did.
 *
 * Also regenerates a proper bilingual description if the product
 * currently has a very short or empty one.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

// ── Spec templates by price tier (same as original import) ──────────
function generateSpecs(price, existingSpecs) {
  let specs;

  if (price >= 200000) {
    specs = {
      "Motor Power": "3000W High Efficiency BLDC",
      "Range": "120 - 150 km per charge",
      "Top Speed": "75 km/h",
      "Battery": "72V 38Ah Lithium-Ion (Smart BMS)",
      "Charging Time": "4-5 Hours (Fast Charging Supported)",
      "Brake Type": "Double Disc Brakes with CBS",
      "Tires": "12-inch Tubeless Alloy Wheels",
      "Display": "7-inch TFT Smart Color Instrument Cluster"
    };
  } else if (price >= 130000) {
    specs = {
      "Motor Power": "1500W Brushless Hub Motor",
      "Range": "85 - 100 km per charge",
      "Top Speed": "55 km/h",
      "Battery": "60V 30Ah Advanced Graphene Battery",
      "Charging Time": "6-7 Hours",
      "Brake Type": "Front Disc, Rear Drum Brakes",
      "Tires": "10-inch Tubeless Tires",
      "Display": "Digital LCD Dashboard"
    };
  } else {
    specs = {
      "Motor Power": "1000W BLDC Hub Motor",
      "Range": "60 - 75 km per charge",
      "Top Speed": "45 km/h",
      "Battery": "48V 24Ah Lead-Acid / Graphene",
      "Charging Time": "7-8 Hours",
      "Brake Type": "Front & Rear Drum Brakes",
      "Tires": "10-inch Tubeless Tires",
      "Display": "Digital LED Cluster"
    };
  }

  // Preserve existing Brand, Subcategory, Launched Date, Colors etc.
  const merged = { ...specs };
  if (existingSpecs) {
    if (existingSpecs.Brand) merged.Brand = existingSpecs.Brand;
    if (existingSpecs.Subcategory) merged.Subcategory = existingSpecs.Subcategory;
    if (existingSpecs['Launched Date']) merged['Launched Date'] = existingSpecs['Launched Date'];
    if (existingSpecs.Colors) merged.Colors = existingSpecs.Colors;
  }

  return merged;
}

// ── Description template ────────────────────────────────────────────
function generateDescription(name, specs) {
  return `${name} একটি অত্যন্ত জনপ্রিয় ইলেকট্রিক স্কুটার যা বর্তমানে বাংলাদেশের বাজারে পাওয়া যাচ্ছে। এই বাইকে রয়েছে ${specs["Motor Power"]} এবং ${specs["Battery"]} যা আপনাকে চমৎকার মাইলেজ এবং স্পিড দেবে। এর স্টাইলিশ ডিজাইন এবং উন্নত কন্ট্রোলার সিটির ব্যস্ত রাস্তায় ড্রাইভ করার জন্য অত্যন্ত উপযোগী।

${name} is a modern, environmentally friendly electric scooter perfect for daily commuting in Bangladesh. Features a powerful ${specs["Motor Power"]} and reliable ${specs["Battery"]}, providing an excellent balance of speed and range.`;
}

async function main() {
  console.log('=== Fix Missing Specs Script ===\n');

  // 1. Fetch all ebike products
  const { data: allEbikes, error } = await supabase
    .from('products')
    .select('id, name, price, specs, description, category')
    .eq('category', 'ebike');

  if (error) {
    console.error('Failed to fetch products:', error);
    return;
  }

  console.log('Total ebike products:', allEbikes.length);

  // 2. Find products that need fixing
  // A product needs fixing if it's missing critical spec keys like Motor Power, Range
  const needsFix = allEbikes.filter(p => {
    if (!p.specs) return true;
    const keys = Object.keys(p.specs);
    // If it has Motor Power or Range already, it's fine (has real specs)
    // But also check for Akij-style specs that have 'Motor' instead of 'Motor Power'
    const hasMotor = keys.includes('Motor Power') || keys.includes('Motor');
    const hasRange = keys.includes('Range') || keys.includes('Max Range(loaded)');
    return !hasMotor && !hasRange;
  });

  console.log('Products needing spec fix:', needsFix.length);

  if (needsFix.length === 0) {
    console.log('All products already have full specs! Nothing to do.');
    return;
  }

  // 3. Generate and update each product
  let successCount = 0;
  let failCount = 0;

  for (const product of needsFix) {
    const newSpecs = generateSpecs(product.price, product.specs);

    // Check if description is also missing or very short
    const needsDesc = !product.description || product.description.length < 50;
    const updatePayload = { specs: newSpecs };

    if (needsDesc) {
      updatePayload.description = generateDescription(product.name, newSpecs);
    }

    const { error: updateError } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', product.id);

    if (updateError) {
      console.error(`  ✗ Failed: ${product.name}:`, updateError.message);
      failCount++;
    } else {
      console.log(`  ✓ Fixed: ${product.name} (৳${product.price}) → ${Object.keys(newSpecs).length} specs`);
      successCount++;
    }
  }

  console.log(`\n=== Done! ===`);
  console.log(`  ✓ Successfully fixed: ${successCount}`);
  console.log(`  ✗ Failed: ${failCount}`);
  console.log(`  Total ebikes with full specs now: ${allEbikes.length - needsFix.length + successCount}`);
}

main();
