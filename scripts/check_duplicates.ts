import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
async function run() {
  const { data } = await supabase.from('products').select('name, slug');
  if (!data) return;
  const slugs = data.map(d => d.slug);
  const duplicateSlugs = slugs.filter((e, i, a) => a.indexOf(e) !== i);
  console.log('Total products:', slugs.length);
  console.log('Total unique slugs:', new Set(slugs).size);
  console.log('Some duplicate slugs:', [...new Set(duplicateSlugs)].slice(0, 5));
}
run();
