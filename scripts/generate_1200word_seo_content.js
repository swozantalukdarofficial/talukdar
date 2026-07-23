const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function generateCategorySpecificContent(product) {
  const name = product.name || "EV Product";
  const category = (product.category || "ebike").toLowerCase();
  const specs = product.specs || {};
  const price = product.price ? `৳${product.price.toLocaleString('en-BD')}` : "Best Market Price";
  const brand = specs.Brand || specs.brand || "EV Solution BD";
  
  const voltage = specs.Voltage || specs.voltage || specs["Nominal Voltage"] || "";
  const capacity = specs.Capacity || specs.capacity || specs["Nominal Capacity"] || "";
  const motor = specs.Motor || specs["Motor Power"] || specs.motor || "";
  const range = specs.Range || specs["Max Range(loaded)"] || specs.range || "";
  const speed = specs["Top Speed"] || specs.speed || "";
  const subcategory = specs.Subcategory || category;

  if (category === "battery") {
    return `
<div class="seo-longform-container text-stone-800 space-y-6">
  <section id="overview" class="mb-8">
    <h2 class="text-2xl font-bold text-emerald-950 mb-4">${name} - Comprehensive Review & Price in Bangladesh</h2>
    <p class="leading-relaxed mb-4">
      The <strong>${name}</strong> is a high-performance energy storage solution engineered specifically for electric vehicles, e-bikes, solar setups, and commercial energy back-ups in Bangladesh. Built with high energy density cells and intelligent thermal control, this <strong>${brand}</strong> battery delivers stable voltage output and long cycle life under local climate conditions.
    </p>
    <p class="leading-relaxed mb-4">
      Priced competitively at <strong>${price}</strong> in Bangladesh, the ${name} provides high energy retention, rapid charging capabilities, and zero maintenance requirements, making it an ideal upgrade or replacement power pack.
    </p>
  </section>

  <section id="engineering" class="mb-8 border-t border-stone-200 pt-6">
    <h2 class="text-xl font-bold text-emerald-900 mb-4">1. Advanced Cell Architecture & BMS Safety</h2>
    <p class="leading-relaxed mb-4">
      Engineered with A-grade cells, the <strong>${name}</strong> features a multi-layered Battery Management System (BMS). The integrated BMS monitors voltage balance, current flow, and core temperature in real-time to protect against overcharging, deep discharge, and short circuits.
    </p>
    <div class="bg-emerald-50/60 p-5 rounded-xl border border-emerald-100 mb-4">
      <h3 class="font-bold text-emerald-950 mb-2">Key Battery Highlights:</h3>
      <ul class="list-disc pl-5 space-y-2 text-stone-700">
        ${voltage ? `<li><strong>Nominal Voltage:</strong> ${voltage} high-stability output.</li>` : ""}
        ${capacity ? `<li><strong>Storage Capacity:</strong> ${capacity} high amp-hour retention.</li>` : ""}
        <li><strong>Long Cycle Life:</strong> Engineered for over 1000+ to 2000+ deep discharge cycles.</li>
        <li><strong>Thermal Resistance:</strong> Premium flame-retardant housing withstands high ambient summer heat in BD.</li>
        <li><strong>Rapid Charging Support:</strong> Compatible with fast chargers without degrading internal chemistry.</li>
      </ul>
    </div>
  </section>

  <section id="performance" class="mb-8 border-t border-stone-200 pt-6">
    <h2 class="text-xl font-bold text-emerald-900 mb-4">2. Performance & Vehicle Compatibility</h2>
    <p class="leading-relaxed mb-4">
      Whether powering electric scooters, commercial e-rickshaws, or off-grid solar energy systems, the <strong>${name}</strong> ensures steady current delivery without sudden voltage sags. It is fully compatible with leading EV controllers and charging stations across Bangladesh.
    </p>
  </section>

  <section id="specifications" class="mb-8 border-t border-stone-200 pt-6">
    <h2 class="text-xl font-bold text-emerald-900 mb-4">3. Technical Specifications Sheet</h2>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse border border-stone-200 text-sm">
        <thead>
          <tr class="bg-stone-100">
            <th class="border border-stone-200 p-3 font-semibold text-stone-900">Parameter</th>
            <th class="border border-stone-200 p-3 font-semibold text-stone-900">Specification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-stone-200 p-3 font-medium text-stone-700">Product Name</td>
            <td class="border border-stone-200 p-3 text-stone-800">${name}</td>
          </tr>
          <tr class="bg-stone-50">
            <td class="border border-stone-200 p-3 font-medium text-stone-700">Brand / Manufacturer</td>
            <td class="border border-stone-200 p-3 text-stone-800">${brand}</td>
          </tr>
          <tr>
            <td class="border border-stone-200 p-3 font-medium text-stone-700">Category</td>
            <td class="border border-stone-200 p-3 text-stone-800">Lithium / EV Battery</td>
          </tr>
          ${voltage ? `<tr class="bg-stone-50"><td class="border border-stone-200 p-3 font-medium text-stone-700">Voltage</td><td class="border border-stone-200 p-3 text-stone-800">${voltage}</td></tr>` : ""}
          ${capacity ? `<tr><td class="border border-stone-200 p-3 font-medium text-stone-700">Capacity</td><td class="border border-stone-200 p-3 text-stone-800">${capacity}</td></tr>` : ""}
          <tr class="bg-stone-50">
            <td class="border border-stone-200 p-3 font-medium text-stone-700">Price in BD</td>
            <td class="border border-stone-200 p-3 font-semibold text-emerald-800">${price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section id="faq" class="mb-8 border-t border-stone-200 pt-6">
    <h2 class="text-xl font-bold text-emerald-900 mb-4">4. Frequently Asked Questions (FAQs)</h2>
    <div class="space-y-4">
      <div class="p-4 bg-stone-50 rounded-lg border border-stone-200">
        <h4 class="font-bold text-stone-900 mb-1">Q1: What is the price of ${name} in Bangladesh?</h4>
        <p class="text-stone-700 text-sm">The official price of ${name} is <strong>${price}</strong> at EV Store BD with genuine warranty.</p>
      </div>
      <div class="p-4 bg-stone-50 rounded-lg border border-stone-200">
        <h4 class="font-bold text-stone-900 mb-1">Q2: Does this battery come with warranty?</h4>
        <p class="text-stone-700 text-sm">Yes, all authentic ${brand} battery units purchased from EV Store include official warranty coverage.</p>
      </div>
      <div class="p-4 bg-stone-50 rounded-lg border border-stone-200">
        <h4 class="font-bold text-stone-900 mb-1">Q3: How long does charging take?</h4>
        <p class="text-stone-700 text-sm">Depending on charger amperage, standard charging takes 4 to 6 hours with automatic cut-off protection.</p>
      </div>
    </div>
  </section>
</div>
`;
  }

  // General E-bike & Commercial Vehicles & Solar/Parts
  return `
<div class="seo-longform-container text-stone-800 space-y-6">
  <section id="overview" class="mb-8">
    <h2 class="text-2xl font-bold text-emerald-950 mb-4">${name} - Full Technical Review & Price in BD</h2>
    <p class="leading-relaxed mb-4">
      The <strong>${name}</strong> is a high-grade <strong>${category}</strong> offering superior durability and operational efficiency in Bangladesh. Engineered by <strong>${brand}</strong>, it combines high-grade materials with modern performance standards tailored for local commuters and commercial operators.
    </p>
    <p class="leading-relaxed mb-4">
      Available now at <strong>${price}</strong>, this unit offers maximum value, minimal maintenance, and long-term reliability.
    </p>
  </section>

  <section id="engineering" class="mb-8 border-t border-stone-200 pt-6">
    <h2 class="text-xl font-bold text-emerald-900 mb-4">1. Core Design & Performance Breakdown</h2>
    <p class="leading-relaxed mb-4">
      Designed with high efficiency components, the <strong>${name}</strong> delivers smooth operation, low energy loss, and high structural strength.
    </p>
    <div class="bg-emerald-50/60 p-5 rounded-xl border border-emerald-100 mb-4">
      <h3 class="font-bold text-emerald-950 mb-2">Key Highlights:</h3>
      <ul class="list-disc pl-5 space-y-2 text-stone-700">
        ${motor ? `<li><strong>Motor Output:</strong> ${motor} high-efficiency drive system.</li>` : ""}
        ${range ? `<li><strong>Travel Range:</strong> ${range} on full single charge.</li>` : ""}
        ${speed ? `<li><strong>Speed Capability:</strong> ${speed} max operating speed.</li>` : ""}
        <li><strong>Weather & Moisture Resistance:</strong> Built for rainy and hot weather conditions in BD.</li>
        <li><strong>Low Running Cost:</strong> Minimal electricity consumption per kilometer.</li>
      </ul>
    </div>
  </section>

  <section id="specifications" class="mb-8 border-t border-stone-200 pt-6">
    <h2 class="text-xl font-bold text-emerald-900 mb-4">2. Technical Specifications Sheet</h2>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse border border-stone-200 text-sm">
        <thead>
          <tr class="bg-stone-100">
            <th class="border border-stone-200 p-3 font-semibold text-stone-900">Feature Parameter</th>
            <th class="border border-stone-200 p-3 font-semibold text-stone-900">Specification Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-stone-200 p-3 font-medium text-stone-700">Product Name</td>
            <td class="border border-stone-200 p-3 text-stone-800">${name}</td>
          </tr>
          <tr class="bg-stone-50">
            <td class="border border-stone-200 p-3 font-medium text-stone-700">Brand / Manufacturer</td>
            <td class="border border-stone-200 p-3 text-stone-800">${brand}</td>
          </tr>
          <tr>
            <td class="border border-stone-200 p-3 font-medium text-stone-700">Category</td>
            <td class="border border-stone-200 p-3 text-stone-800 capitalize">${category}</td>
          </tr>
          <tr class="bg-stone-50">
            <td class="border border-stone-200 p-3 font-medium text-stone-700">Current Price in BD</td>
            <td class="border border-stone-200 p-3 font-semibold text-emerald-800">${price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section id="faq" class="mb-8 border-t border-stone-200 pt-6">
    <h2 class="text-xl font-bold text-emerald-900 mb-4">3. Frequently Asked Questions (FAQs)</h2>
    <div class="space-y-4">
      <div class="p-4 bg-stone-50 rounded-lg border border-stone-200">
        <h4 class="font-bold text-stone-900 mb-1">Q1: What is the price of ${name} in BD?</h4>
        <p class="text-stone-700 text-sm">The current official price of ${name} is <strong>${price}</strong> at EV Store Bangladesh.</p>
      </div>
      <div class="p-4 bg-stone-50 rounded-lg border border-stone-200">
        <h4 class="font-bold text-stone-900 mb-1">Q2: Is home delivery available?</h4>
        <p class="text-stone-700 text-sm">Yes, we offer fast delivery inside Dhaka & Chittagong and nationwide cargo shipping across all 64 districts in Bangladesh.</p>
      </div>
    </div>
  </section>
</div>
`;
}

async function run() {
  console.log("Re-generating clean HTML SEO Content for all products in Supabase...");

  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    console.error("Error fetching products:", error.message);
    return;
  }

  console.log(`Updating ${products.length} products with category-accurate HTML SEO content...`);

  let count = 0;
  for (const product of products) {
    const htmlContent = generateCategorySpecificContent(product);

    const { error: updateErr } = await supabase
      .from('products')
      .update({
        description: htmlContent
      })
      .eq('id', product.id);

    if (updateErr) {
      console.error(`Failed to update ${product.name}:`, updateErr.message);
    } else {
      count++;
    }
  }

  console.log(`\n🎉 Successfully updated all ${count} products with clean HTML SEO layout in Supabase!`);
}

run();
