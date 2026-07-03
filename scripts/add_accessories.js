const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials missing in .env.local!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const EXTRA_PRODUCTS = [
  {
    name: 'PowerCell 48V 20Ah Battery',
    slug: 'powercell-48v-20ah',
    description: 'প্রিমিয়াম লিথিয়াম ব্যাটারি প্যাক। বেশিরভাগ ই-বাইকের সাথে কম্প্যাটিবল। BMS সুরক্ষা এবং 1000+ চার্জ সাইকেল।\n\nPremium lithium battery pack compatible with most e-bikes. Equipped with BMS protection and 1000+ charge cycles.',
    price: 18500,
    compare_at_price: 22000,
    category: 'battery',
    image_url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    images: ['https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800'],
    stock_quantity: 25,
    is_featured: true,
    specs: { voltage: '48V', capacity: '20Ah', cycles: '1000+', weight: '4.5kg', type: 'Li-Ion', protection: 'BMS' }
  },
  {
    name: 'UltraCell 60V 30Ah Lithium Battery',
    slug: 'ultracell-60v-30ah',
    description: 'লং-ডিসটেন্স রাইডের জন্য হেভি-ডিউটি ব্যাটারি প্যাক। IP65 ওয়াটারপ্রুফ মেটাল বডি।\n\nHeavy-duty battery pack for long-distance rides. IP65 waterproof rated with sturdy metal body.',
    price: 32000,
    compare_at_price: 38000,
    category: 'battery',
    image_url: 'https://images.unsplash.com/photo-1609092486657-6bb1a78c6e5a?w=800',
    images: ['https://images.unsplash.com/photo-1609092486657-6bb1a78c6e5a?w=800'],
    stock_quantity: 12,
    is_featured: true,
    specs: { voltage: '60V', capacity: '30Ah', cycles: '1200+', weight: '7.2kg', type: 'Li-Ion', casing: 'Metal IP65' }
  },
  {
    name: 'EV Controller 36V/48V 350W',
    slug: 'ev-controller-36v-48v',
    description: 'ব্রাশলেস মোটর কন্ট্রোলার। অটো-ডিটেক্ট ভোল্টেজ এবং রিজেনারেটিভ ব্রেকিং সাপোর্ট করে।\n\nBrushless motor controller with automatic voltage detection and regenerative braking support.',
    price: 4500,
    compare_at_price: 5200,
    category: 'parts',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
    stock_quantity: 50,
    is_featured: false,
    specs: { voltage: '36V/48V', current: '15A', type: 'Brushless', power: '350W' }
  },
  {
    name: 'BLDC Hub Motor 500W',
    slug: 'bldc-hub-motor-500w-parts',
    description: 'উচ্চ-দক্ষতাসম্পন্ন হাব মোটর। ই-বাইক কনভার্সন কিটের জন্য উপযুক্ত।\n\nHigh-efficiency hub motor suitable for e-bike conversions and repairs.',
    price: 8500,
    compare_at_price: 10000,
    category: 'parts',
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800'],
    stock_quantity: 30,
    is_featured: false,
    specs: { power: '500W', voltage: '48V', torque: '45Nm', speed: '35kmh' }
  },
  {
    name: 'Smart Helmet Pro',
    slug: 'smart-helmet-pro-acc',
    description: 'LED টেইল লাইট এবং ব্লুটুথ স্পিকার সহ প্রিমিয়াম হেলমেট। সেফটি এবং মিউজিক একসাথে।\n\nPremium helmet with built-in LED tail light and Bluetooth speaker. Ride safe while staying connected.',
    price: 6500,
    compare_at_price: 8000,
    category: 'accessories',
    image_url: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=800',
    images: ['https://images.unsplash.com/photo-1504593811423-6dd665756598?w=800'],
    stock_quantity: 30,
    is_featured: true,
    specs: { sizes: 'M/L/XL', certification: 'DOT/CE', battery: '800mAh', bluetooth: 'v5.0' }
  },
  {
    name: 'Universal Fast Charger 5A',
    slug: 'fast-charger-5a-acc',
    description: 'লিথিয়াম ব্যাটারির জন্য ফাস্ট চার্জার। ওভার-চার্জ প্রোটেকশন সহ নিরাপদ চার্জিং।\n\nFast charger for lithium batteries with built-in over-charge and short-circuit protection.',
    price: 3200,
    compare_at_price: 3800,
    category: 'accessories',
    image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
    images: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800'],
    stock_quantity: 80,
    is_featured: false,
    specs: { output: '5A', voltage: '48V/60V/72V', compatible: 'Li-Ion', cooling: 'Active Fan' }
  }
];

async function run() {
  console.log('Inserting batteries, parts, and accessories...');
  const { data, error } = await supabase.from('products').insert(EXTRA_PRODUCTS);
  if (error) {
    console.error('Error inserting extra products:', error.message);
  } else {
    console.log('Successfully inserted extra products! 🎉');
  }
}

run();
