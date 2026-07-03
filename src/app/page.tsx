import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import CategorySection from "@/components/CategorySection";
import ProductCarousel from "@/components/ProductCarousel";
import FlashSaleSection from "@/components/FlashSaleSection";
import ProductCard from "@/components/ProductCard";
import {
  getFeaturedProducts,
  getProductsByCategory,
  getSaleProducts,
} from "@/lib/products";
import FaqSection from "@/components/FaqSection";
import BlogSection from "@/components/BlogSection";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Parallel server-side fetches
  const [featured, ebikes, batteries, parts, accessories, solar, saleProducts] =
    await Promise.all([
      getFeaturedProducts(),
      getProductsByCategory("ebike"),
      getProductsByCategory("battery"),
      getProductsByCategory("parts"),
      getProductsByCategory("accessories"),
      getProductsByCategory("solar"),
      getSaleProducts(),
    ]);

  // Separate lists for independent sections
  const essentialBatteries = batteries.slice(0, 8);
  const solarPanels = solar.slice(0, 8);
  const essentialParts = [...parts, ...accessories].slice(0, 8);

  return (
    <>
      {/* 1. Full-screen hero carousel */}
      <HeroCarousel />

      {/* 2. Flash Sale Section with Countdown Timer */}
      <FlashSaleSection products={saleProducts} />

      {/* 3. Category browse cards (Visual Grid) */}
      <CategorySection />

      {/* 4. Best Selling E-Bikes & Scooters */}
      {ebikes.length > 0 && (
        <section className="bg-[#faf9f6] border-b border-stone-200/45">
          <ProductCarousel
            products={ebikes}
            title="Best Selling E-Bikes & Scooters"
            subtitle="Most popular rides"
            viewAllHref="/products?category=ebike"
          />
        </section>
      )}

      {/* 5. Essential Batteries Section */}
      {essentialBatteries.length > 0 && (
        <ProductCarousel
          products={essentialBatteries}
          title="Essential Lithium Batteries"
          subtitle="High Performance Packs"
          viewAllHref="/products?category=battery"
          bgClassName="bg-white"
        />
      )}

      {/* 5.3 Solar Panels Section */}
      {solarPanels.length > 0 && (
        <ProductCarousel
          products={solarPanels}
          title="High-Efficiency Solar Panels"
          subtitle="Clean Energy & Solar Power Solutions"
          viewAllHref="/products?category=solar"
          bgClassName="bg-[#faf9f6] border-t border-stone-200/35"
        />
      )}

      {/* 5.5 Essential Parts Section */}
      {essentialParts.length > 0 && (
        <ProductCarousel
          products={essentialParts}
          title="Essential Parts & Accessories"
          subtitle="OEM Spares & Upgrades"
          viewAllHref="/products?category=parts"
          bgClassName="bg-white border-t border-stone-200/35"
        />
      )}

      {/* 6. Featured Products Carousel */}
      <section className="bg-[#faf9f6]">
        <ProductCarousel
          products={featured}
          title="Featured Vehicles & Gear"
          subtitle="Selected premium electrics"
          viewAllHref="/products"
        />
      </section>

      {/* 7. Trust signals / Why Choose Us */}
      <TrustBanner />

      {/* 8. Blog Section */}
      <BlogSection />

      {/* 9. FAQ Section */}
      <FaqSection />

      {/* 10. SEO Text Section */}
      <section className="bg-white border-t border-stone-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 mb-5 tracking-tight">
            Green Mobility & Renewable Energy in Bangladesh: The E-Bike Revolution
          </h2>
          <div className="text-xs text-stone-555 leading-relaxed space-y-4">
            <p>
              As urban traffic in Dhaka and other major cities continues to rise, the demand for eco-friendly, fast, and budget-friendly transportation has never been higher. Electric bikes (E-Bikes) and smart E-Scooters represent the future of urban commuting in Bangladesh. Powered by high-efficiency brushless DC motors (BLDC) and long-lasting lithium batteries, these vehicles provide an emission-free alternative to fossil-fueled motorcycles.
            </p>
            <p>
              Upgrading to lithium-ion and LiFePO4 battery chemistry is a cornerstone of this transition. Modern lithium batteries deliver higher energy density, faster charging speeds, and a lifespan exceeding 2,000+ deep cycles, significantly outperforming traditional lead-acid batteries. This transition is not only economically beneficial for daily commuters but also plays a vital role in reducing greenhouse gas emissions and establishing sustainable, green cities.
            </p>
            <p>
              At EVStoreBD, we are committed to providing genuine components, smart BMS battery packs, replacement motors, and premium electric vehicles to support the green energy transition. By integrating solar energy chargers and smart hybrid inverters, commuters can achieve true energy independence and drive towards a zero-emission future.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Trust / USP Banner ───────────────────────────────────────────
function TrustBanner() {
  const ITEMS = [
    {
      icon: "🛠️",
      title: "Free Assembly",
      desc: "Expert setup and verification",
    },
    {
      icon: "🔋",
      title: "1 Year Battery Warranty",
      desc: "Original manufacturer replacement",
    },
    {
      icon: "💳",
      title: "EMI Available",
      desc: "Installment options with credit cards",
    },
    {
      icon: "🚚",
      title: "All BD Delivery",
      desc: "Fast shipping to all districts",
    },
  ];

  return (
    <section className="bg-stone-50 border-t border-b border-stone-200/80 py-10 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {ITEMS.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-2 group"
            >
              <span className="text-4xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-250">
                {icon}
              </span>
              <div>
                <p className="text-xs md:text-sm font-bold text-stone-900 tracking-tight">
                  {title}
                </p>
                <p className="text-[10px] md:text-xs text-stone-500 mt-1 max-w-[165px] mx-auto leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
