const platforms = [
  { name: "Upwork", sub: "Top Rated Plus", color: "text-emerald-500" },
  { name: "Clutch", sub: "5.0 ★ Rating", color: "text-blue-500" },
  { name: "Trustpilot", sub: "Excellent", color: "text-emerald-400" },
  { name: "Fiverr", sub: "Pro Verified", color: "text-green-500" },
  { name: "GoodFirms", sub: "Top Agency", color: "text-indigo-400" },
  { name: "Bark", sub: "Elite Pro", color: "text-blue-600" },
];

export default function TrustedPlatforms() {
  return (
    <section className="py-10 md:py-16 bg-neutral-950/80 border-y border-white/5 relative overflow-hidden backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-10">
        <p className="text-center text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-neutral-500">
          Trusted & Verified Performance On
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div
          className="flex whitespace-nowrap gap-16 md:gap-24 items-center pr-16 md:pr-24 animate-marquee"
        >
          {[...platforms, ...platforms].map((platform, index) => (
            <div key={index} className="flex flex-col items-center gap-1 group cursor-default">
              <span className={`text-xl md:text-3xl font-black ${platform.color} opacity-40 group-hover:opacity-100 transition-all duration-300 italic tracking-tighter uppercase select-none`}>
                {platform.name}
              </span>
              <span className="text-[7px] md:text-[8px] font-mono font-bold text-neutral-600 group-hover:text-neon-green transition-colors uppercase tracking-widest">
                {platform.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Gradient Overlays for smooth fade */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
