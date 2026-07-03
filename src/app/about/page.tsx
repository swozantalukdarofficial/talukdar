import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Leaf, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | EVStore Bangladesh - Leading Smart EV & Solar Platform",
  description: "Learn about EVStore Bangladesh. We are the premier marketplace for electric bikes, high-performance lithium battery packs, solar energy solutions, and OEM electric vehicle spare parts in Bangladesh.",
};

export default function AboutPage() {
  const PILLARS = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-700" />,
      title: "Genuine Quality",
      desc: "We source 100% authentic, certified components directly from top global manufacturers, ensuring maximum reliability and performance.",
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-700" />,
      title: "Smart Technology",
      desc: "From smart BMS-equipped lithium packs to sine-wave controllers and high-efficiency solar modules, we bring the latest green tech to Bangladesh.",
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-700" />,
      title: "Eco Sustainability",
      desc: "Our core mission is reducing urban carbon footprints. We empower commuters to switch to electric vehicles and utilize clean solar energy.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-emerald-700" />,
      title: "Unmatched Support",
      desc: "We provide dedicated after-sales warranty services, professional technical consultations, and premium DIY assistance for all builds.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf9f6] text-stone-900" id="about-us-page">
      {/* 1. Elegant Hero Banner */}
      <section className="relative bg-stone-900 py-24 md:py-32 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600"
            alt="Advanced Green Tech Infrastructure"
            fill
            priority
            className="object-cover object-center filter saturate-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl space-y-6">
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
            Our Story
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Pioneering Smart & Sustainable Mobility in Bangladesh
          </h1>
          <p className="text-stone-300 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            At EVStore, we are building a zero-emission future by offering state-of-the-art electric vehicles, long-lasting energy storage, and premium clean energy configurations.
          </p>
        </div>
      </section>

      {/* 2. Brand Mission & Vision Grid */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            <span className="text-emerald-800 text-xs font-extrabold uppercase tracking-widest block">
              Who We Are
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900">
              Transforming Daily Commutes into Clean Journeys
            </h2>
            <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
              <p>
                Founded to address the growing issues of urban congestion, air pollution, and rising fossil fuel costs, EVStore has become the trusted destination for smart electric mobility components in Bangladesh.
              </p>
              <p>
                We do not just sell products; we construct sustainable energy ecosystems. By providing high-density lithium batteries, solar panel chargers, and OEM vehicle upgrades, we ensure riders can enjoy efficient, cost-effective, and environmentally safe transit.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/products"
                id="explore-products-btn"
                className="inline-flex items-center gap-2 bg-emerald-800 text-white hover:bg-emerald-850 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
              >
                Browse Our Catalog
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800"
              alt="Electric bike rider in modern city context"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 3. Key Values & Core Pillars */}
      <section className="bg-white border-t border-b border-stone-200/80 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <p className="text-emerald-800 text-xs font-extrabold uppercase tracking-widest">
              Our Foundations
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900">
              The Principles That Guide Us
            </h2>
            <p className="text-stone-500 text-xs md:text-sm">
              We operate with a commitment to excellence, pushing the boundaries of technology and service quality to satisfy Bangladesh's green energy pioneers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {PILLARS.map((p, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-5 rounded-2xl border border-stone-100 bg-[#faf9f6]/40 hover:bg-[#faf9f6]/95 hover:border-emerald-600/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 p-3 bg-white rounded-xl shadow-sm border border-stone-200/50 h-fit">
                  {p.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-semibold">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Impact CTA Banner */}
      <section className="bg-stone-950 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),transparent)]" />
        <div className="container mx-auto px-4 relative z-10 max-w-2xl space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-normal">
            Ready to Upgrade Your Mobility with Green Energy?
          </h2>
          <p className="text-stone-400 text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
            Contact our technical team today to design the perfect lithium battery pack or custom solar hybrid power setup for your vehicle.
          </p>
          <div className="flex gap-4 justify-center flex-wrap pt-2">
            <Link
              href="/contact"
              id="cta-contact-btn"
              className="bg-emerald-700 text-white hover:bg-emerald-800 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              Get In Touch
            </Link>
            <Link
              href="/products"
              id="cta-shop-btn"
              className="bg-white/10 hover:bg-white/15 text-stone-100 border border-white/20 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
