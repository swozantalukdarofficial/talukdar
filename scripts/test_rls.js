require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

async function main() {
  console.log('=== Testing direct select and update of orders ===');
  
  const { data: selectData, error: selectErr } = await s.from('orders').select('*');
  console.log('Select error:', selectErr ? selectErr.message : 'None');
  console.log('Orders found:', selectData ? selectData.length : 0);

  if (selectData && selectData.length > 0) {
    const orderId = selectData[0].id;
    console.log(`Attempting to update order ${orderId} status to 'pending'...`);
    const { data: updateData, error: updateErr } = await s.from('orders').update({ status: 'pending' }).eq('id', orderId).select();
    console.log('Update error:', updateErr ? updateErr.message : 'None');
    console.log('Update result data:', updateData);
  }
}
main();
