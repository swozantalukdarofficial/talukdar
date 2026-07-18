const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const updates = [
  {
    slug: "yadea-velax",
    description: `Yadea Velax is a premium, retro-styled electric scooter designed for urban riders in Bangladesh who want a perfect blend of classic elegance and clean, modern mobility. With a robust chassis and high-performance battery technology, it offers a smooth, reliable ride through daily city traffic.

Key Features:
⚡ Motor Power: DC Brushless Hub Motor providing silent and seamless acceleration.
🔋 Battery Type: High-performance Lithium-ion.
🔌 Charging Time: 5 to 8 Hr.
🚀 Top Speed: 50 km/h.
🔋 Maximum Range: 75 km to 90 km per single charge.
⚖️ Curb Weight: 90 kg.
📏 Wheelbase: 1331 Mm.
💡 Lighting: Full premium LED Head Light and Indicators.`,
    specs: {
      "Brand": "Yadea",
      "Height": "1097 Mm",
      "Weight": "90 kg",
      "Bike Type": "Electric Scooter",
      "Tyre Type": "tubeless",
      "Wheelbase": "1331 Mm",
      "Head Light": "LED",
      "Indicators": "LED",
      "Motor Type": "DC Brushless Hub Motor",
      "Clutch Type": "Automatic Clutch",
      "Engine Type": "Electric",
      "Speedometer": "digital",
      "Battery Type": "Lithium-ion",
      "Chassis Type": "Steel",
      "Charging Time": "5-8 Hr",
      "Overall Length": "1944 Mm",
      "Front Tyre Size": "90/90 - 14",
      "Rear Suspension": "Dual Shock Absorber",
      "Front Brake Type": "Single Disc",
      "Transmission Type": "Auto",
      "Front Brake Diameter": "220 mm",
      "Anti-Lock Braking System (ABS)": "No",
      "Top Speed": "50 km/h",
      "Range": "80 km"
    }
  },
  {
    slug: "zeeho-ae8-se",
    description: `The Zeeho Ae8 Se (by CFMoto) is a cutting-edge, high-performance electric scooter designed for enthusiasts who demand power, premium build quality, and sleek styling. With its high-torque motor and double disc braking system, it sets a new standard for EVs in Bangladesh.

Key Features:
⚡ Motor Output: 1200W High-torque motor for rapid acceleration.
🔋 Battery Technology: Graphene-enhanced battery pack.
🔌 Charging Duration: 6 to 8 Hours.
🚀 Top Speed: 45 to 50 km/h.
🔋 Average Range: 45 to 50 km per charge.
⚙️ Brakes: Dual-Disc brakes for responsive and reliable stopping.
🛠️ Tires: 100/80-12 Tubeless tires for superior grip.`,
    specs: {
      "Brand": "Zeeho",
      "Motor": "1200W",
      "Range": "45-50 km",
      "Brakes": "Dual-Disc",
      "Battery": "Graphene-Battery",
      "Charging": "6-8 hours",
      "Top Speed": "45-50 km/h",
      "Tyre Size": "100/80-12"
    }
  },
  {
    slug: "electric-vehicle-songi",
    description: `Akij Electric Vehicle Songi is a highly popular, eco-friendly electric rickshaw built for commercial passenger transport in Bangladesh. With an impressive loading capacity, a robust frame, and a high-capacity battery, it ensures maximum profitability and zero emissions for commercial operators.

Key Features:
⚡ Motor Power: 1500 Watt heavy-duty motor.
🔋 Battery Capacity: 60V 45Ah Lead-Acid / Graphene power pack.
🔌 Charging Time: 8 to 10 Hours.
🚀 Top Speed: 35 km/h.
🔋 Loaded Range: 60 km per charge.
⚖️ Curb Weight: 190 kg.
💪 Loading Capacity: 240 kg.
👥 Passenger Capacity: 03 Persons (plus driver).`,
    specs: {
      "Brand": "Akij",
      "Model": "Akij-Songi",
      "Motor": "1500 watt",
      "Battery": "60V 45Ah",
      "Curb Weight": "190 kg",
      "Subcategory": "rickshaw",
      "Recharge time": "8-10 hours",
      "Loading Capacity": "240 kg",
      "Country of Origin": "China",
      "Max Range(loaded)": "60 km",
      "Passenger capacity": "03 Person",
      "Top Speed": "35 km/h",
      "Range": "60 km"
    }
  },
  {
    slug: "revoo-falcon-xn3000",
    description: `REVOO Falcon Xn3000 is a sleek, modern electric scooter designed for daily office commutes and student travel in Bangladesh. Featuring comfortable dual hydraulic suspensions, tubeless tires, and a long-life graphene battery, it offers low maintenance and exceptionally low running costs.

Key Features:
⚡ Motor Type: BLDC Hub Motor (Brushless DC) for high efficiency.
🔋 Battery Type: Long-lifecycle Graphene-Battery.
🔌 Charging Duration: 6 to 7 Hours.
🚀 Top Speed: 45 to 50 km/h.
🔋 Maximum Range: 70 km to 80 km per charge.
⚖️ Total Weight: 144 kg.
📏 Overall Length: 1815 mm.
🛠️ Brakes: Single Disc front brake and reliable drum rear brake.`,
    specs: {
      "Brand": "REVOO",
      "Height": "1110 Mm",
      "Weight": "144 KG",
      "Made In": "China",
      "Bike Type": "Electric Scooter",
      "Tyre Type": "tubeless",
      "Wheelbase": "1340 Mm",
      "Head Light": "LED",
      "Indicators": "LED",
      "Motor Type": "BLDC Hub Motor (Brushless DC)",
      "Clutch Type": "Automatic Clutch",
      "Engine Type": "Electric Motor",
      "Speedometer": "digital",
      "Battery Type": "Graphene-Battery",
      "Chassis Type": "Twin Downtube Spine Frame",
      "Charging Time": "6-7h",
      "Overall Length": "1815 Mm",
      "Front Tyre Size": "110/70-12",
      "Rear Suspension": "Hydrolic Suspension",
      "Front Brake Type": "Single Disc",
      "Transmission Type": "Auto",
      "Front Brake Diameter": "220 MM",
      "Anti-Lock Braking System (ABS)": "No",
      "Top Speed": "45-50 km/h",
      "Range": "75 km"
    }
  },
  {
    slug: "tailg-saibei-f71",
    description: `Tailg Saibei F71 is a highly practical, mid-sized electric scooter that balances affordability, riding comfort, and modern features. Designed for daily city commuters, it comes with a high-power motor, a robust chassis, and a graphene-enhanced battery build.

Key Features:
⚡ Motor Output: 1500W High-power brushless motor.
🔋 Battery Type: Graphene-enhanced battery pack.
🔌 Charging Duration: 6 to 8 Hours.
🚀 Top Speed: 50 km/h.
🔋 Max Range: 65 km to 80 km per charge.
⚖️ Curb Weight: 140 kg.
🛠️ Suspension: Spring-loaded hydraulic shock absorbers.
🛡️ Brakes: Single Disc front brake.`,
    specs: {
      "Brand": "TAILG",
      "Height": "723 Mm",
      "Weight": "140 kg",
      "Made In": "China",
      "Bike Type": "Electric Scooter",
      "Tyre Type": "tubeless",
      "Wheelbase": "1360 Mm",
      "Head Light": "LED",
      "Indicators": "LED",
      "Motor Type": "1500W High-power motor",
      "Clutch Type": "Automatic Clutch",
      "Engine Type": "Electric",
      "Speedometer": "digital",
      "Battery Type": "Graphene-Battery",
      "Chassis Type": "mid-sized, comfortable urban electric scooter",
      "Charging Time": "6-8 Hr",
      "Overall Length": "1772 Mm",
      "Front Tyre Size": "90/80-11",
      "Rear Suspension": "spring-loaded hydraulic shock absorber",
      "Front Brake Type": "Single Disc",
      "Transmission Type": "Auto",
      "Anti-Lock Braking System (ABS)": "No",
      "Top Speed": "50 km/h",
      "Range": "70 km"
    }
  }
];

async function run() {
  console.log("=== Updating Product Descriptions & Specs ===");
  for (const item of updates) {
    const { slug, description, specs } = item;
    console.log(`Updating product with slug: "${slug}"...`);
    const { data, error } = await supabase
      .from('products')
      .update({ description, specs })
      .eq('slug', slug)
      .select('id, name');

    if (error) {
      console.error(`Error updating "${slug}":`, error.message);
    } else {
      console.log(`Success! Updated:`, data);
    }
  }
}

run();
