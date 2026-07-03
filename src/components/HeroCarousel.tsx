"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Shield, Battery } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const SLIDES = [
  {
    id: 1,
    tag: "New Arrival",
    tagColor: "text-emerald-850 bg-emerald-50 border-emerald-200",
    headline: "The Future of",
    sub: "Urban Commute",
    subGradient: "from-emerald-800 to-green-700",
    description:
      "Premium electric bikes and smart scooters built for Bangladesh roads. Zero emission. Maximum efficiency.",
    cta: { label: "Shop E-Bikes", href: "/products?category=ebike" },
    ctaSecondary: { label: "View All Products", href: "/products" },
    image: "/silver_scooter.png",
    bgGradient: "bg-gradient-to-r from-stone-50 to-stone-100",
    stats: [
      { icon: Zap, value: "80km", label: "Range" },
      { icon: Battery, value: "48V", label: "Power" },
      { icon: Shield, value: "2yr", label: "Warranty" },
    ],
  },
  {
    id: 2,
    tag: "Commercial EVs",
    tagColor: "text-blue-800 bg-blue-50 border-blue-200",
    headline: "Built For",
    sub: "Heavy Duty",
    subGradient: "from-blue-800 to-indigo-700",
    description:
      "High-performance electric auto-rickshaws, pickups, and utility vehicles designed for maximum ROI and reliability.",
    cta: { label: "Shop Commercial", href: "/products?category=commercial" },
    ctaSecondary: { label: "Learn More", href: "/products" },
    image: "/iso_commercial.png",
    bgGradient: "bg-gradient-to-r from-blue-50/40 to-indigo-50/40",
    stats: [
      { icon: Battery, value: "Heavy", label: "Duty" },
      { icon: Zap, value: "Max", label: "ROI" },
      { icon: Shield, value: "Tested", label: "Tough" },
    ],
  },
  {
    id: 3,
    tag: "Solar Energy",
    tagColor: "text-amber-850 bg-amber-50 border-amber-200",
    headline: "Power Your",
    sub: "Ride With Sun",
    subGradient: "from-amber-600 to-orange-500",
    description:
      "High-efficiency solar panels and inverters. Charge your EVs with 100% renewable energy directly from the sun.",
    cta: { label: "Shop Solar", href: "/products?category=solar" },
    ctaSecondary: { label: "Inverters", href: "/products?category=parts" },
    image: "/iso_solar.png",
    bgGradient: "bg-gradient-to-r from-amber-50/40 to-orange-50/30",
    stats: [
      { icon: Shield, value: "Tier 1", label: "Panels" },
      { icon: Battery, value: "Hybrid", label: "Inverters" },
      { icon: Zap, value: "100%", label: "Green" },
    ],
  },
];

export default function HeroCarousel() {
  return (
    <section className="relative overflow-hidden border-b border-stone-200/50">
      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {SLIDES.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className={cn("relative min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden", slide.bgGradient)}>
                
                {/* Removed Grid Overlay as requested */}

                <div className="container mx-auto px-4 md:px-6 relative z-10 py-12 md:py-20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    
                    {/* Left Column: Content */}
                    <div className="max-w-xl xl:max-w-2xl order-2 lg:order-1 pt-8 lg:pt-0">
                      {/* Tag */}
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold mb-6 shadow-sm bg-white/60 backdrop-blur-md",
                          slide.tagColor
                        )}
                      >
                        <Zap className="h-3 w-3" />
                        {slide.tag}
                      </div>

                      {/* Headline */}
                      <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[72px] font-extrabold tracking-tight text-stone-900 leading-[1.05] mb-6">
                        {slide.headline}
                        <br />
                        <span
                          className={`bg-gradient-to-r ${slide.subGradient} bg-clip-text text-transparent`}
                        >
                          {slide.sub}
                        </span>
                      </h1>

                      <p className="text-base md:text-lg text-stone-600 max-w-lg leading-relaxed mb-10">
                        {slide.description}
                      </p>

                      <div className="flex flex-col-reverse md:flex-col gap-8 md:gap-12">
                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            href={slide.cta.href}
                            className={cn(
                              buttonVariants({ size: "lg" }),
                              "bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-8 rounded-xl shadow-[0_8px_20px_-6px_rgba(4,120,87,0.3)] hover:shadow-[0_12px_24px_-6px_rgba(4,120,87,0.4)] hover:-translate-y-0.5 transition-all duration-300 text-sm h-12 border-0"
                            )}
                          >
                            {slide.cta.label}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                          <Link
                            href={slide.ctaSecondary.href}
                            className={cn(
                              buttonVariants({ variant: "outline", size: "lg" }),
                              "border-stone-300 text-stone-700 hover:bg-stone-100/50 px-8 rounded-xl bg-white/70 backdrop-blur-sm text-sm h-12 shadow-sm transition-all duration-300"
                            )}
                          >
                            {slide.ctaSecondary.label}
                          </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-6">
                          {slide.stats.map(({ icon: Icon, value, label }) => (
                            <div key={label} className="flex flex-col min-[450px]:flex-row items-center justify-center gap-1.5 sm:gap-3 bg-white/40 backdrop-blur-sm px-1 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/60 shadow-sm text-center min-[450px]:text-left">
                              <div className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm text-emerald-700">
                                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              </div>
                              <div>
                                <p className="text-xs sm:text-sm font-bold text-stone-900 leading-none mb-1 whitespace-nowrap">{value}</p>
                                <p className="text-[9px] sm:text-[10px] font-bold text-stone-500 uppercase tracking-wider leading-none whitespace-nowrap">{label}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Transparent Image via mix-blend-multiply with feathered mask */}
                    <div className="order-1 lg:order-2 relative w-full h-[320px] sm:h-[450px] lg:h-[600px] flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_75%)] md:[mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_80%)]">
                      <Image
                        src={slide.image}
                        alt={slide.headline}
                        fill
                        className="object-contain lg:scale-[1.15] transition-transform duration-700 hover:scale-[1.2] mix-blend-multiply"
                        priority={slide.id === 1}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev/Next — hidden on mobile */}
        <CarouselPrevious className="hidden md:flex left-6 h-10 w-10 border-stone-300 bg-white/80 text-stone-700 hover:bg-white hover:text-stone-900 backdrop-blur-sm shadow-md" />
        <CarouselNext className="hidden md:flex right-6 h-10 w-10 border-stone-300 bg-white/80 text-stone-700 hover:bg-white hover:text-stone-900 backdrop-blur-sm shadow-md" />

        {/* Dot indicators */}
        <HeroDots count={SLIDES.length} />
      </Carousel>
    </section>
  );
}

// ─── Dot indicators ───────────────────────────────────────────────
function HeroDots({ count }: { count: number }) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-1 w-6 rounded-full bg-stone-300 first:bg-emerald-700 first:w-8"
        />
      ))}
    </div>
  );
}
