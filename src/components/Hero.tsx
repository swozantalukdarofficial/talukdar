import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./ui/MagneticButton";
import { ArrowRight, Play, Youtube, ExternalLink, Megaphone, Zap, Search, PenTool, Bot, MousePointerClick, TrendingUp, BarChart3 } from "lucide-react";
import { useState } from "react";

const HERO_VIDEO_ID = "MnLd2G198U8";

function HeroVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${HERO_VIDEO_ID}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="relative w-full group">
      <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-r from-neon-green via-cyan-400 to-blue-500 opacity-20 blur-xl group-hover:opacity-40 transition-all duration-700" />
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl">
        <div className="relative aspect-video w-full">
          <AnimatePresence mode="wait">
            {!isPlaying ? (
              <motion.div
                key="thumb"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <img src={thumbnail} alt="WebEstOne" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-neon-green rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-black fill-black ml-1" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={embedUrl}
                title="Hero Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-neon-green/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="flex h-2 w-2 rounded-full bg-neon-green animate-ping"></span>
            <span className="text-xs font-bold text-white uppercase tracking-widest">AI-POWERED CREATIVE & GROWTH AGENCY</span>
          </div>

          <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-1 italic">
            Attention is the new currency. We help you earn it, hold it, and convert it.
          </p>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
            AI-Powered Solutions <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-cyan-400">That Convert Attention Into</span> Revenue
          </h1>

          <p className="text-lg text-neutral-400 max-w-xl leading-relaxed">
            From AI driven SEO and conversion-focused web development to data-backed PPC, social media advertising services, and high-impact video marketing. We engineer the complete AI digital marketing ecosystem your brand needs to scale.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <MagneticButton className="px-8 py-4 bg-neon-green text-black font-black rounded-full flex items-center gap-2 shadow-[0_0_30px_rgba(135,230,92,0.4)] hover:shadow-neon-green/60 transition-all">
              <span>Get Your Free Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-neon-green" />
              <span>See Our Success</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <HeroVideoPlayer />

          {/* Floating Card 1: Conversion */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 hidden md:block p-5 rounded-2xl bg-neutral-900/90 border border-white/10 backdrop-blur-xl shadow-2xl z-20"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-neon-green/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Conversion Boost</div>
                <div className="text-lg font-black text-neon-green">+145%</div>
              </div>
            </div>
          </motion.div>

          {/* Floating Card 2: High Traffic */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-10 -right-10 hidden md:block p-5 rounded-2xl bg-neutral-900/90 border border-white/10 backdrop-blur-xl shadow-2xl z-20"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Organic Traffic</div>
                <div className="text-lg font-black text-blue-400">+250%</div>
              </div>
            </div>
          </motion.div>

          {/* Floating Card 3: Google Analytics */}
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 -right-16 hidden md:block p-4 rounded-xl bg-neutral-900/90 border border-white/10 backdrop-blur-xl shadow-2xl z-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Search className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-white/60 uppercase tracking-widest leading-none mb-1">GA4 Verified</div>
                <div className="text-xs font-black text-white">Data-Driven Growth</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
