require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

s.from('products').select('name,category,specs')
  .eq('category', 'ebike')
  .in('specs->>Subcategory', ['rickshaw', 'pickup', 'bus', 'utility'])
  .then(r => {
    console.log('Commercial query results:', r.data.length);
    r.data.forEach(p => console.log(' -', p.name));
  });
