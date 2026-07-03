const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, category, specs');
    
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log(`Checking all ${data.length} products...`);
    const misclassified = [];
    data.forEach(p => {
      const name = p.name.toLowerCase();
      const cat = p.category;
      if (name.includes('battery') || name.includes('battary') || name.includes('charger') || name.includes('inverter')) {
        if (cat !== 'battery' && cat !== 'parts' && cat !== 'accessories') {
          misclassified.push(p);
        }
      }
    });
    console.log(`Found ${misclassified.length} potential misclassified battery/charger products:`);
    misclassified.forEach(p => {
      console.log(`- ${p.name} (Current Category: ${p.category})`);
    });
  }
}

test();
