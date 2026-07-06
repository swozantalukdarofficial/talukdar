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
                <img src={thumbnail} alt="AI powered solutions" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-24 w-24 rounded-full bg-neon-green/30 animate-ping"></span>
                    <div className="relative w-16 h-16 bg-neon-green rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(135,230,92,0.5)] group-hover:scale-110 transition-all duration-300">
                      <Play className="w-6 h-6 text-black fill-black ml-1" />
                    </div>
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
          className="space-y-5 md:space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
            </span>
            <span className="text-[10px] font-bold text-neon-green uppercase tracking-wider">
              Attention is the new currency. We help you earn, hold, and convert it.
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-black text-white leading-[1.12] tracking-tight">
            AI-Powered Solutions <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-teal-400 to-blue-500">
              That Convert Attention Into Revenue
            </span>
          </h1>

          <p className="text-base text-neutral-400 max-w-xl leading-relaxed">
            From AI driven SEO and conversion-focused web development to data-backed PPC, social media advertising services, and high-impact video marketing. We engineer the complete AI digital marketing ecosystem your brand needs to scale.
          </p>

          <div className="flex flex-wrap gap-4 pt-1">
            <MagneticButton className="px-8 py-4 bg-neon-green text-black font-black text-base rounded-full flex items-center gap-2 shadow-[0_0_25px_rgba(135,230,92,0.35)] hover:scale-105 transition-all">
              <span>Get Your Free Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-base rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-neon-green" />
              <span>See Our Success</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <HeroVideoPlayer />

          {/* Floating Card 1: Conversion */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 hidden md:block p-4 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl shadow-2xl z-20"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-neon-green/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-neon-green" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest leading-none mb-1">Conversion Boost</div>
                <div className="text-base font-black text-neon-green">+145%</div>
              </div>
            </div>
          </motion.div>

          {/* Floating Card 2: High Traffic */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-6 -right-6 hidden md:block p-4 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl shadow-2xl z-20"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest leading-none mb-1">Organic Traffic</div>
                <div className="text-base font-black text-blue-400">+250%</div>
              </div>
            </div>
          </motion.div>

          {/* Floating Card 3: Google Analytics */}
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-12 -right-8 hidden md:block p-4 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl shadow-2xl z-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Search className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest leading-none mb-1">GA4 Verified</div>
                <div className="text-xs font-black text-white">Data-Driven Growth</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
