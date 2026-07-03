import Link from "next/link";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FEATURES = [
  { icon: Zap, label: "High Performance", desc: "Up to 80km range" },
  { icon: Shield, label: "2 Year Warranty", desc: "Full coverage" },
  { icon: Truck, label: "Free Delivery", desc: "Dhaka & Chattogram" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(52,211,153,0.15)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.08)_0%,_transparent_60%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium mb-8">
            <Zap className="h-3.5 w-3.5" />
            Bangladesh&apos;s Premium EV Store
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-6">
            Ride the{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Future
            </span>
            <br />
            of Mobility
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-10">
            Premium e-bikes, batteries & parts. Zero emission. Maximum
            performance. Built for Bangladesh.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/products"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-green-500 hover:bg-green-400 text-black font-bold h-13 px-8 rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all text-base"
              )}
            >
              Shop Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link
              href="/products?category=ebike"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/20 text-white hover:bg-white/10 h-13 px-8 rounded-xl text-base bg-transparent"
              )}
            >
              Explore E-Bikes
            </Link>
          </div>

          {/* Feature pills */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 border border-green-500/20 flex-shrink-0">
                  <Icon className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-white/40">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
