/**
 * Find and remove duplicate ebike products
 * Keeps the one with the best specs (most keys) or lowest price
 */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

async function main() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, slug, price, specs, image_url, description, category')
    .eq('category', 'ebike')
    .order('name');

  if (error) { console.error(error); return; }

  console.log('Total ebike products:', products.length);

  // Group by similar name (normalize to find duplicates)
  const groups = {};
  products.forEach(p => {
    // Normalize name: lowercase, remove trailing numbers like "5", "0", extra spaces
    let normName = p.name.toLowerCase().trim()
      .replace(/\s+\d+$/, '')     // remove trailing number like "Bir 5" -> "Bir"
      .replace(/\s+/g, ' ')
      .trim();
    
    if (!groups[normName]) groups[normName] = [];
    groups[normName].push(p);
  });

  // Find groups with duplicates
  const duplicateGroups = Object.entries(groups).filter(([_, items]) => items.length > 1);
  
  console.log('\n=== DUPLICATE GROUPS ===');
  console.log('Groups with duplicates:', duplicateGroups.length);
  
  let totalToDelete = 0;
  const idsToDelete = [];

  duplicateGroups.forEach(([normName, items]) => {
    console.log(`\n  "${normName}" (${items.length} copies):`);
    
    // Sort: prefer real product images (not unsplash), more specs, then by price
    items.sort((a, b) => {
      const aHasRealImg = !a.image_url.includes('unsplash') ? 1 : 0;
      const bHasRealImg = !b.image_url.includes('unsplash') ? 1 : 0;
      if (aHasRealImg !== bHasRealImg) return bHasRealImg - aHasRealImg;
      
      const aSpecCount = Object.keys(a.specs || {}).length;
      const bSpecCount = Object.keys(b.specs || {}).length;
      if (aSpecCount !== bSpecCount) return bSpecCount - aSpecCount;
      
      return a.price - b.price; // keep cheapest
    });

    // Keep first (best), mark rest for deletion
    items.forEach((item, idx) => {
      const specCount = Object.keys(item.specs || {}).length;
      const hasRealImg = !item.image_url.includes('unsplash');
      const status = idx === 0 ? '✓ KEEP' : '✗ DELETE';
      console.log(`    ${status}: "${item.name}" ৳${item.price} | ${specCount} specs | img: ${hasRealImg ? 'real' : 'unsplash'} | slug: ${item.slug}`);
      
      if (idx > 0) {
        idsToDelete.push(item.id);
        totalToDelete++;
      }
    });
  });

  console.log('\n=== SUMMARY ===');
  console.log('Total duplicates to delete:', totalToDelete);
  console.log('Products after cleanup:', products.length - totalToDelete);
  
  // Save IDs to file for review before deletion
  const fs = require('fs');
  fs.writeFileSync('scripts/duplicates_to_delete.json', JSON.stringify({
    totalToDelete,
    remainingAfter: products.length - totalToDelete,
    ids: idsToDelete
  }, null, 2));
  console.log('\nSaved IDs to scripts/duplicates_to_delete.json');
  console.log('Run with --delete flag to actually remove them');

  // If --delete flag is passed, do the deletion
  if (process.argv.includes('--delete')) {
    console.log('\n--- DELETING DUPLICATES ---');
    const batchSize = 20;
    for (let i = 0; i < idsToDelete.length; i += batchSize) {
      const batch = idsToDelete.slice(i, i + batchSize);
      const { error: delErr } = await supabase
        .from('products')
        .delete()
        .in('id', batch);
      
      if (delErr) {
        console.error(`Batch ${Math.floor(i/batchSize)+1} failed:`, delErr.message);
      } else {
        console.log(`Deleted batch ${Math.floor(i/batchSize)+1} (${batch.length} products)`);
      }
    }
    console.log('✓ Deletion complete!');
  }
}

main();
