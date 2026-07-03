const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, category, specs')
    .eq('category', 'battery');
    
  if (error) {
    console.error('Error:', error.message);
  } else {
    data.forEach(p => {
      const name = p.name.toLowerCase();
      const desc = (p.description || '').toLowerCase();
      const fullText = name + ' ' + desc;
      
      let detected = 'unknown';
      if (fullText.includes('lifepo4') || fullText.includes('lithium iron phosphate') || fullText.includes('lifepo₄')) {
        detected = 'lifepo4';
      } else if (fullText.includes('lead') || fullText.includes('acid') || fullText.includes('gel') || fullText.includes('tubular') || fullText.includes('agm')) {
        detected = 'lead';
      } else if (fullText.includes('acut') || fullText.includes('graphene')) {
        detected = 'acut';
      } else if (fullText.includes('lithium') || fullText.includes('li-ion') || fullText.includes('smart bms')) {
        detected = 'lithium';
      }
      
      console.log(`Product: ${p.name}`);
      console.log(`  Mapped Subcategory: ${p.specs?.Subcategory}`);
      console.log(`  Detected Subcategory: ${detected}`);
      if (detected !== p.specs?.Subcategory) {
        console.log(`  *** MISMATCH! ***`);
      }
    });
  }
}

test();
