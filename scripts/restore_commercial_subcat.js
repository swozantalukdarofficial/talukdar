/**
 * Restore Subcategory specs for commercial EV products in Supabase
 * so they are properly categorized as "commercial" by the frontend.
 */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

// Map product name to its correct Subcategory
const COMMERCIAL_MAPPING = {
  'Electric Vehicle Songi': 'rickshaw',
  'Electric Covered Van': 'utility',
  'Golf Cart/Club Car': 'utility',
  'Antique Car Elezabeth': 'bus',
  'Recreation/Sightseeing Car': 'bus',
  'Electric Pick-Up': 'pickup',
  'Electric Pick-up': 'pickup',
  'Electric Rikshaw Pigeon': 'rickshaw',
  'Mini Cargo Van': 'utility',
  'Delivery Van': 'utility',
  'City E-Cab Pothik': 'rickshaw',
  'Sightseeing Bus': 'bus',
  'Solar E-Rickshaw': 'rickshaw'
};

async function main() {
  console.log('=== Restoring Commercial EV Subcategories ===\n');

  // Fetch these products
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, specs')
    .in('name', Object.keys(COMMERCIAL_MAPPING));

  if (error) {
    console.error('Error fetching products:', error.message);
    return;
  }

  console.log(`Found ${products.length} commercial products to update.`);

  let updatedCount = 0;
  for (const product of products) {
    const subcat = COMMERCIAL_MAPPING[product.name];
    const newSpecs = {
      ...(product.specs || {}),
      Subcategory: subcat
    };

    const { error: updateErr } = await supabase
      .from('products')
      .update({ specs: newSpecs })
      .eq('id', product.id);

    if (updateErr) {
      console.error(`Failed to update ${product.name}:`, updateErr.message);
    } else {
      console.log(`✓ Updated "${product.name}" with Subcategory: "${subcat}"`);
      updatedCount++;
    }
  }

  console.log(`\nSuccessfully updated ${updatedCount} products.`);
}

main().catch(console.error);
