import { MagneticButton } from "./ui/MagneticButton";
import { ArrowRight, Play, Search, TrendingUp, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useContent } from "../context/ContentContext";
import { Link } from "react-router-dom";
import { parseYouTubeEmbedUrl } from "../lib/youtubeUtils";

function HeroVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { hero } = useContent();

  const localThumbnail = hero.thumbnailUrl || "/hero-thumbnail.webp";
  const rawUrl = hero.videoUrl || "https://www.youtube.com/embed/MnLd2G198U8";
  const cleanEmbed = parseYouTubeEmbedUrl(rawUrl);
  const embedUrl = cleanEmbed.includes("?") ? `${cleanEmbed}&autoplay=1` : `${cleanEmbed}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="relative w-full group">
      <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-r from-neon-green via-cyan-400 to-blue-500 opacity-20 blur-xl group-hover:opacity-40 transition-all duration-700" />
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl">
        <div className="relative aspect-video w-full">
          {!isPlaying ? (
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              {/* Local image — eliminates YouTube CDN round-trip for LCP */}
              <img
                src={localThumbnail}
                alt="AI powered digital marketing solutions by WeBestOne agency"
                className="w-full h-full object-cover"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                width="1280"
                height="720"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <span className="absolute inline-flex h-24 w-24 rounded-full bg-neon-green/30 animate-ping" />
                  <div className="relative w-16 h-16 bg-neon-green rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(135,230,92,0.5)] group-hover:scale-110 transition-all duration-300">
                    <Play className="w-6 h-6 text-black fill-black ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={embedUrl}
              title="WeBestOne AI Marketing Solutions"
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { hero } = useContent();

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-neon-green/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left — Text */}
        <div className="space-y-5 md:space-y-6 opacity-0 animate-fade-in-up order-2 lg:order-1">
          {hero.badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
              </span>
              <span className="text-[10px] font-bold text-neon-green uppercase tracking-wider">
                {hero.badge}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-black text-white leading-[1.12] tracking-tight">
            {hero.heading} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-teal-400 to-blue-500">
              {hero.headingHighlight}
            </span>
          </h1>

          <p className="text-base text-neutral-400 max-w-xl leading-relaxed">
            {hero.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-1">
            {hero.ctaPrimary && (
              <Link to={hero.ctaPrimaryUrl || "/contact-us"}>
                <MagneticButton className="px-8 py-4 bg-neon-green text-black font-black text-base rounded-full flex items-center gap-2 shadow-[0_0_25px_rgba(135,230,92,0.35)] hover:scale-105 transition-all">
                  <span>{hero.ctaPrimary}</span>
                  <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </Link>
            )}
            {hero.ctaSecondary && (
              <Link to={hero.ctaSecondaryUrl || "/work"}>
                <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-base rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-neon-green" />
                  <span>{hero.ctaSecondary}</span>
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Right — Video + Floating Cards */}
        <div className="relative opacity-0 animate-fade-in-scale order-1 lg:order-2">
          <HeroVideoPlayer />

          {/* Floating Card 1 */}
          {hero.floatingCard1Label && (
            <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3.5 p-4 rounded-2xl bg-black/80 border border-white/10 shadow-2xl z-20 animate-float-card">
              <div className="w-9 h-9 rounded-xl bg-neon-green/20 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-neon-green" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest leading-none mb-1">{hero.floatingCard1Label}</div>
                <div className="text-base font-black text-neon-green">{hero.floatingCard1Value}</div>
              </div>
            </div>
          )}

          {/* Floating Card 2 */}
          {hero.floatingCard2Label && (
            <div className="absolute -top-6 -right-6 hidden md:flex items-center gap-3.5 p-4 rounded-2xl bg-black/80 border border-white/10 shadow-2xl z-20 animate-float-card-slow">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest leading-none mb-1">{hero.floatingCard2Label}</div>
                <div className="text-base font-black text-blue-400">{hero.floatingCard2Value}</div>
              </div>
            </div>
          )}

          {/* Floating Card 3 */}
          {hero.floatingCard3Label && (
            <div className="absolute bottom-12 -right-8 hidden md:flex items-center gap-3 p-4 rounded-2xl bg-black/80 border border-white/10 shadow-2xl z-20 animate-float-card">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest leading-none mb-1">{hero.floatingCard3Label}</div>
                <div className="text-xs font-black text-white">{hero.floatingCard3Value}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
