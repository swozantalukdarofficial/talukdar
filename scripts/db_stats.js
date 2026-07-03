require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

async function main() {
  console.log('=== Checking Database Tables and Counts ===');
  
  // Count products
  const { count: prodCount } = await s.from('products').select('*', { count: 'exact', head: true });
  console.log('Products count:', prodCount);

  // Count orders
  const { data: orders, error: ordersErr } = await s.from('orders').select('id, total');
  if (ordersErr) {
    console.log('Orders table does not exist or error:', ordersErr.message);
  } else {
    console.log('Orders count:', orders.length);
    const totalRev = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    console.log('Total Revenue:', totalRev);
  }

  // Count unique customers (from orders or profiles/users)
  const { data: customers, error: custErr } = await s.from('orders').select('customer_email');
  if (!custErr && customers) {
    const uniqueEmails = new Set(customers.map(c => c.customer_email).filter(Boolean));
    console.log('Unique customers from orders:', uniqueEmails.size);
  }
}
main();
