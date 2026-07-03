require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

async function main() {
  const { data: selectData } = await s.from('orders').select('*');
  if (selectData && selectData.length > 0) {
    const order = selectData[0];
    console.log(`Current status: '${order.status}', Current payment: '${order.payment_status}'`);
    
    const nextStatus = order.status === 'pending' ? 'confirmed' : 'pending';
    console.log(`Attempting to update status to '${nextStatus}'...`);
    
    const { data: updateData, error: updateErr } = await s.from('orders')
      .update({ status: nextStatus })
      .eq('id', order.id)
      .select();

    if (updateErr) {
      console.log('Update error:', updateErr.message);
    } else {
      console.log('Update result data:', updateData);
    }
  }
}
main();
