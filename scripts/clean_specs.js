/**
 * Clean up scraped spec values
 * Remove HTML entities, excessive whitespace, junk fields
 */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

// Keys to remove (not useful for customers)
const JUNK_KEYS = [
  'Bike Name', 'Models ➡️Specs ⬇️', 'Action', 'Edition 1',
  'Technology', 'Fuel Supply', 'Additional Features',
  'Engine Kill Switch', 'RPM Meter', 'Seat Type'
];

// Rename mapping for better display
const RENAME_MAP = {
  'Motor Type': 'Motor',
  'Bike Type': 'Vehicle Type',
  'Front Brake Type': 'Front Brake',
  'Rear Suspension': 'Rear Suspension',
  'Front Tyre Size': 'Tyre Size',
  'Tyre Type': 'Tyre Type',
  'Chassis Type': 'Chassis',
  'Charging Time': 'Charging Time',
  'Battery Type': 'Battery Type',
  'Transmission Type': 'Transmission',
  'Clutch Type': 'Clutch',
  'Overall Length': 'Length',
  'Front Brake Diameter': 'Brake Disc Size',
  'Anti-Lock Braking System (ABS)': 'ABS',
  'Engine Type': 'Engine',
  'Load Capacity': 'Max Load',
  'Head Light': 'Headlight',
  'Engine Kill Switch': 'Kill Switch',
};

function cleanValue(val) {
  if (typeof val !== 'string') return val;
  return val
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')        // collapse whitespace
    .replace(/\(See [^)]+\)/g, '') // remove "(See Apollo Tyre's)"
    .replace(/\(Approx\)/gi, '')
    .replace(/Info Not Available/gi, 'N/A')
    .trim();
}

async function main() {
  console.log('=== Cleaning Scraped Spec Values ===\n');

  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, specs')
    .eq('category', 'ebike');

  if (error) { console.error(error); return; }

  let cleaned = 0;

  for (const p of products) {
    if (!p.specs) continue;

    const newSpecs = {};
    let changed = false;

    Object.entries(p.specs).forEach(([key, val]) => {
      // Skip junk keys
      if (JUNK_KEYS.includes(key)) {
        changed = true;
        return;
      }

      // Clean value
      const cleanedVal = cleanValue(String(val));

      // Skip empty or N/A values
      if (!cleanedVal || cleanedVal === 'N/A' || cleanedVal === '-' || cleanedVal === '0') {
        changed = true;
        return;
      }

      // Rename key if needed
      const newKey = RENAME_MAP[key] || key;
      if (newKey !== key) changed = true;

      // Check if value was cleaned
      if (cleanedVal !== String(val)) changed = true;

      newSpecs[newKey] = cleanedVal;
    });

    if (changed) {
      const { error: updateErr } = await supabase
        .from('products')
        .update({ specs: newSpecs })
        .eq('id', p.id);

      if (!updateErr) {
        cleaned++;
      }
    }
  }

  console.log(`Cleaned ${cleaned} products\n`);

  // Verify a sample
  const { data: sample } = await supabase.from('products').select('name, specs').ilike('name', '%Yadea Velax%').limit(1);
  if (sample && sample[0]) {
    console.log('Sample - Yadea Velax:');
    Object.entries(sample[0].specs).forEach(([k, v]) => {
      console.log(`  ${k}: ${v}`);
    });
  }

  const { data: sample2 } = await supabase.from('products').select('name, specs').ilike('name', '%Eve Motors 5%').limit(1);
  if (sample2 && sample2[0]) {
    console.log('\nSample - Eve Motors 5:');
    Object.entries(sample2[0].specs).forEach(([k, v]) => {
      console.log(`  ${k}: ${v}`);
    });
  }

  const { data: sample3 } = await supabase.from('products').select('name, specs').ilike('name', '%Exploit Hammer%').limit(1);
  if (sample3 && sample3[0]) {
    console.log('\nSample - Exploit Hammer:');
    Object.entries(sample3[0].specs).forEach(([k, v]) => {
      console.log(`  ${k}: ${v}`);
    });
  }
}

main();
