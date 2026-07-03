"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Table, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/lib/types";

interface SEOData {
  title: string;
  intro: string;
  tableTitle: string;
  tableItems: { name: string; price: string }[];
  bulletTitle: string;
  bullets: string[];
  faqs: { question: string; answer: string }[];
}

const SEO_CONTENT: Record<ProductCategory | "all", SEOData> = {
  all: {
    title: "Electric Vehicles & EV Accessories Price in Bangladesh",
    intro: "EVStore is Bangladesh's premier online marketplace for sustainable electric mobility. We provide a comprehensive catalog of high-performance e-bikes, durable lithium battery packs, advanced motor controllers, and essential safety accessories at the most competitive price rates in the country.",
    tableTitle: "Latest EV Products Price List in Bangladesh",
    tableItems: [
      { name: "Thunder X1 E-Bike", price: "৳85,000" },
      { name: "PowerCell 48V 20Ah Lithium Battery", price: "৳18,500" },
      { name: "EV Controller 36V Brushless", price: "৳4,500" },
      { name: "Smart Helmet Pro (Bluetooth & LED)", price: "৳6,500" },
      { name: "UltraCell 60V 30Ah Waterproof Battery", price: "৳32,000" },
    ],
    bulletTitle: "Why Choose EVStore for Your Smart Mobility Needs?",
    bullets: [
      "Authentic Products: 100% genuine components sourced directly from certified manufacturers.",
      "Comprehensive Warranty: Dedicated replacement warranty on batteries, motors, and e-bikes.",
      "Professional Support: Expert assistance to help you pick the right parts for DIY builds.",
      "Reliable Fast Delivery: Fast and secure shipping across all districts in Bangladesh.",
    ],
    faqs: [
      {
        question: "How do I choose the correct component for my e-bike?",
        answer: "We recommend checking the voltage (V) and current/capacity (Ah/A) specifications of your current EV configuration. For help with compatibility, feel free to contact our technical support team."
      },
      {
        question: "Do you provide after-sales warranty services?",
        answer: "Yes. Most of our core products (such as lithium battery packs and complete electric bikes) come with an official warranty. Specific warranty details are listed on the respective product pages."
      },
      {
        question: "Is cash on delivery available?",
        answer: "Yes, we support cash on delivery options nationwide, subject to a small booking advance depending on shipment size."
      }
    ]
  },
  ebike: {
    title: "Electric Bikes (E-Bikes) in Bangladesh - Smart & Green Commuting",
    intro: "Experience the ultimate freedom of commuting with our premium collection of electric bikes. Designed specifically to navigate the busy streets of Dhaka and other major cities, our e-bikes offer a sustainable, sweat-free, and incredibly cost-effective alternative to traditional motorbikes and public transit.",
    tableTitle: "Latest E-Bike Models Price List in Bangladesh",
    tableItems: [
      { name: "Thunder X1 Urban E-Bike", price: "৳85,000" },
      { name: "Volt Pro 750W Mountain E-Bike", price: "৳1,25,000" },
      { name: "Exploit Babui Foldable E-Bike", price: "৳92,000" },
      { name: "I-am I Am $ Road City Commuter", price: "৳60,000" },
      { name: "Bir Magnum Sporty E-Bike", price: "৳73,500" },
    ],
    bulletTitle: "Outstanding Benefits of Switching to an Electric Bike",
    bullets: [
      "Zero Emissions: Help keep the environment clean with 100% emission-free green energy.",
      "Unbelievable Fuel Savings: Cost per kilometer is under 0.2 BDT, far lower than gasoline motorbikes.",
      "Dual Riding Modes: Seamlessly switch between pure electric throttle mode and pedal-assist mode.",
      "No License Required: Low-speed pedal-assist e-bikes generally do not require registration or licenses."
    ],
    faqs: [
      {
        question: "What is the average range of your e-bikes on a single charge?",
        answer: "Our standard e-bikes offer a range between 60 km and 85 km on pure electric mode, which can extend up to 120 km when utilizing pedal-assist mode, depending on riding style and load."
      },
      {
        question: "How long does it take to fully charge an e-bike battery?",
        answer: "A complete charge typically takes between 4 to 6 hours using a standard smart charger. Fast chargers can reduce this duration to under 3 hours."
      },
      {
        question: "Can I ride e-bikes in heavy rain or waterlogged streets?",
        answer: "Our e-bikes feature IP65-rated water resistance for motors and controllers, making them perfectly safe to ride in normal rain. However, driving through deep waterlogging where the motor is fully submerged should be avoided."
      }
    ]
  },
  battery: {
    title: "E-Bike Lithium & LiFePO4 Batteries - Reliable Power & Long Life",
    intro: "Empower your electric ride with our state-of-the-art battery collection. At EVStore, we specialize in high-density Lithium-Ion (Li-ion) and Lithium Iron Phosphate (LiFePO4) battery packs that offer consistent voltage discharge, superior thermal stability, and unmatched cycle durability.",
    tableTitle: "Premium E-Bike Battery Price List in Bangladesh",
    tableItems: [
      { name: "PowerCell 48V 20Ah Lithium Battery Pack", price: "৳18,500" },
      { name: "UltraCell 60V 30Ah Waterproof Battery", price: "৳32,000" },
      { name: "SmartCell 36V 10Ah Bottle-style Battery", price: "৳12,000" },
      { name: "SuperCharge 72V 40Ah Heavy Duty Pack", price: "৳45,000" },
    ],
    bulletTitle: "Key Advantages of Premium Lithium EV Batteries",
    bullets: [
      "Extended Cycle Life: Up to 1,500+ charge-discharge cycles with minimal capacity degradation.",
      "Smart BMS: High-end Battery Management Systems protect against overcharge, short-circuits, and heat.",
      "Lightweight Build: Up to 60% lighter than traditional lead-acid batteries with double the energy density.",
      "Waterproof Housing: Encased in heavy-duty, impact-resistant, and IP65 waterproof alloy/ABS casings."
    ],
    faqs: [
      {
        question: "What is the difference between Li-ion and LiFePO4 batteries?",
        answer: "LiFePO4 (Lithium Iron Phosphate) batteries offer significantly higher safety levels, thermal stability, and longer lifespans (up to 2,000+ cycles). Standard Lithium-Ion batteries are lighter and slightly more compact but have a lower cycle life (around 800-1,000 cycles)."
      },
      {
        question: "How can I maximize my e-bike battery's lifetime?",
        answer: "To extend battery health, avoid discharging it completely to 0% regularly, store it in a cool and dry place away from direct sunlight, and charge it up to 50-60% if you plan on storing it unused for a long duration."
      }
    ]
  },
  parts: {
    title: "High-Performance EV Spare Parts & Custom DIY Upgrade Kits",
    intro: "Maintain, repair, or upgrade your electric vehicles with our wide array of professional spare parts. We supply industrial-grade sine-wave controllers, brushless DC (BLDC) hub motors, throttle handles, electronic brake levers, and custom wiring kits designed to fit popular e-bike models.",
    tableTitle: "Latest EV Motors & Controller Price List",
    tableItems: [
      { name: "EV Brushless Controller 36V 15A", price: "৳4,500" },
      { name: "BLDC Hub Motor 500W High Torque", price: "৳8,500" },
      { name: "Smart Sine-wave Controller 48V-72V", price: "৳6,800" },
      { name: "Twist Throttle with LCD Voltage Display", price: "৳1,200" },
      { name: "Wuxing E-Brake Cut-off Levers (Pair)", price: "৳1,500" },
    ],
    bulletTitle: "Why Upgrade Your EV Components with Us?",
    bullets: [
      "Silent Operation: Our sine-wave controllers minimize motor hum and ensure smooth throttle acceleration.",
      "Standard Compatibility: Connectors are standard and easy to install on most Chinese and branded e-bikes.",
      "Durability Testing: All electrical parts undergo strict quality and load checks before delivery.",
      "DIY Friendly: We provide schematics and support to help hobbyists build their own electric custom rides."
    ],
    faqs: [
      {
        question: "What is the benefit of a Sine-wave controller over a Square-wave controller?",
        answer: "Sine-wave controllers generate a smooth sinusoidal current waveform, which leads to whisper-quiet motor operation, better efficiency, and smoother startup acceleration compared to noisier square-wave controllers."
      },
      {
        question: "Are these spare parts compatible with any e-bike brand?",
        answer: "Most of our parts are universally compatible with standard 3-phase BLDC motors and systems. However, we highly suggest double-checking the wiring diagram and connector shapes before purchasing."
      }
    ]
  },
  accessories: {
    title: "Essential EV Riding Gear & Accessories - Comfort & Security",
    intro: "Complete your smart commuting experience with our premium selection of safety and convenience accessories. EVStore offers everything from high-tech Bluetooth smart helmets and mobile mounts to heavy-duty security locks and intelligent battery chargers.",
    tableTitle: "Smart EV Accessories Price List in Bangladesh",
    tableItems: [
      { name: "Smart Helmet Pro (Bluetooth Speakers & Turn Signals)", price: "৳6,500" },
      { name: "Universal Smart Fast Charger 5A (36V/48V)", price: "৳3,200" },
      { name: "Waterproof Mobile Phone Mount", price: "৳950" },
      { name: "Heavy Duty Anti-Theft Disc Brake Lock", price: "৳1,800" },
      { name: "Waterproof Anti-Dust E-Bike Full Cover", price: "৳1,100" },
    ],
    bulletTitle: "Elevate Your Ride with Smart Safety Accessories",
    bullets: [
      "Active Safety: Smart helmets feature bright LED tail lights and turn indicators to ensure night visibility.",
      "Advanced Protection: Heavy-duty steel locks protect your valuable e-bike from theft in public areas.",
      "Weather Protection: Waterproof covers and phone holders keep your gadgets and vehicle safe in all seasons.",
      "Smart Charging: Chargers feature automatic shut-off to prevent battery overcharging."
    ],
    faqs: [
      {
        question: "Are your smart helmets certified for safety?",
        answer: "Yes, our smart helmets carry official European CE and US DOT safety ratings, providing premium impact protection alongside modern bluetooth connectivity."
      },
      {
        question: "Does the 5A charger work on any battery chemistry?",
        answer: "Our smart chargers are calibrated specifically for Lithium-Ion and LiFePO4 battery chemistries. Please select the voltage option (36V, 48V, or 60V) that matches your battery specification."
      }
    ]
  },
  solar: {
    title: "Premium Solar Panels & Clean Energy Solutions in Bangladesh",
    intro: "Empower your home, business, or EV charging setup with our high-efficiency solar panels. EVStore offers a curated collection of German-cell monocrystalline and bifacial solar panels, designed for optimal sunlight capture and long-term durability in tropical climates.",
    tableTitle: "Latest Solar Panels Price List in Bangladesh",
    tableItems: [
      { name: "Sunshine 55W Mono Solar Panel", price: "৳2,400" },
      { name: "Sunshine 100W Mono Solar Panel", price: "৳10,000" },
      { name: "Sunshine 200W Bifacial Solar Panel", price: "৳6,600" },
      { name: "JA Solar 615W Bifacial Solar Panel", price: "৳1,760" },
      { name: "REC Alpha Pro M 600W HJT Solar Panel", price: "৳1,760" },
    ],
    bulletTitle: "Why Choose Our Solar Panels?",
    bullets: [
      "Germany Cell Tech: Sunshine panels use premium German-engineered solar cells for high-efficiency.",
      "Bifacial Performance: Double-sided energy capture increases total power yield by up to 25%.",
      "Low-Light Efficiency: Excellent generation capabilities even on cloudy or weak sunlight days.",
      "Linear Power Warranty: Guaranteed 25 to 30 years of stable power output with minimal degradation."
    ],
    faqs: [
      {
        question: "Can I use these solar panels to charge my e-bike or battery pack?",
        answer: "Yes, you can easily pair solar panels with an appropriate MPPT solar charge controller to charge lithium or lead-acid battery packs directly."
      },
      {
        question: "What is the benefit of a bifacial solar panel?",
        answer: "Bifacial solar panels capture sunlight from both the front and back sides. When installed on highly reflective surfaces (like light-colored roofs), they generate up to 20-30% more power than traditional single-sided panels."
      }
    ]
  }
};

interface CollectionSEOContentProps {
  category: ProductCategory | "all";
}

export default function CollectionSEOContent({ category }: CollectionSEOContentProps) {
  const data = SEO_CONTENT[category] || SEO_CONTENT.all;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function toggleFaq(index: number) {
    setOpenFaq(openFaq === index ? null : index);
  }

  return (
    <section className="mt-16 border-t border-stone-200/60 pt-16 pb-12 bg-stone-50/50 -mx-6 lg:-mx-12 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Intro Section */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight leading-snug">
            {data.title}
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed max-w-4xl">
            {data.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Price Table Section */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-stone-800 font-bold text-sm uppercase tracking-wider">
              <Table className="w-4 h-4 text-[#dfc5a6]" />
              <h3>{data.tableTitle}</h3>
            </div>
            <div className="overflow-hidden border border-stone-200 bg-white rounded-2xl shadow-sm">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50 text-[11px] font-extrabold text-stone-600 uppercase tracking-wider">
                    <th className="py-3 px-4">Model Name</th>
                    <th className="py-3 px-4 text-right">Latest Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                  {data.tableItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-stone-800">{item.name}</td>
                      <td className="py-3 px-4 text-right font-bold text-stone-900">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-stone-800 font-bold text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#dfc5a6]" />
              <h3>Key Features</h3>
            </div>
            <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm space-y-4">
              <h4 className="text-xs font-extrabold text-stone-800 uppercase tracking-wider">
                {data.bulletTitle}
              </h4>
              <ul className="space-y-3">
                {data.bullets.map((bullet, idx) => {
                  const [boldPart, normalPart] = bullet.split(": ");
                  return (
                    <li key={idx} className="flex gap-2.5 items-start text-xs leading-relaxed text-stone-650">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#dfc5a6] shrink-0 mt-1.5" />
                      <span>
                        <strong className="text-stone-850 font-bold">{boldPart}:</strong>{" "}
                        {normalPart}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs Accordion Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-stone-800 font-bold text-sm uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-[#dfc5a6]" />
            <h3>Frequently Asked Questions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-stone-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-stone-800 hover:text-stone-900 transition-colors focus:outline-none"
                  >
                    <span className="text-xs md:text-sm">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ml-3",
                        isOpen ? "transform rotate-180 text-stone-700" : ""
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-200 ease-in-out border-stone-100",
                      isOpen ? "grid-rows-[1fr] border-t p-4 bg-stone-50/30" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs md:text-sm text-stone-605 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
