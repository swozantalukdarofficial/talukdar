const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Read env variables
const envConfig = dotenv.parse(fs.readFileSync(path.join(__dirname, '..', '.env.local')));
const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('products').select('category, name, specs');
  if (error) {
    console.error("Error fetching products:", error);
    return;
  }
  
  const keysByCategory = {};
  const valuesForKeys = {};
  
  data.forEach(p => {
    const cat = p.category;
    if (!keysByCategory[cat]) {
      keysByCategory[cat] = new Set();
    }
    if (p.specs) {
      Object.keys(p.specs).forEach(k => {
        keysByCategory[cat].add(k);
        const lowerK = k.toLowerCase();
        if (!valuesForKeys[lowerK]) {
          valuesForKeys[lowerK] = new Set();
        }
        valuesForKeys[lowerK].add(p.specs[k]);
      });
    }
  });
  
  console.log("Specs Keys per Category in Database:");
  for (const [cat, keys] of Object.entries(keysByCategory)) {
    console.log(`- ${cat}:`, Array.from(keys).slice(0, 15));
  }
  
  console.log("\nSample Values for common keys (like type, category, etc.):");
  ['type', 'battery type', 'motor type', 'voltage', 'capacity'].forEach(k => {
    if (valuesForKeys[k]) {
      console.log(`- ${k}:`, Array.from(valuesForKeys[k]).slice(0, 10));
    }
  });
}

main();
