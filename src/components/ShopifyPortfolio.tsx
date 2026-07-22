import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import { useContent } from "../context/ContentContext";

interface PortfolioCardItem {
  client: string;
  title: string;
  img: string;
  color: string;
  border: string;
  tag: string;
}

function PortfolioCard({ item }: { item: PortfolioCardItem }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`w-[280px] sm:w-[350px] md:w-[450px] flex-shrink-0 p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border ${item.border} bg-gradient-to-b ${item.color} flex flex-col min-h-[400px] sm:min-h-[450px] relative overflow-hidden group cursor-pointer mx-2 sm:mx-4`}
    >
      <div className="relative aspect-[16/10] w-full mb-8 rounded-2xl overflow-hidden bg-black/40 border border-white/10">
        <img 
          src={item.img} 
          alt={item.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="mt-auto relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            {item.tag}
          </span>
          <ShoppingCart className="w-5 h-5 text-neutral-500 group-hover:text-neon-green transition-colors" />
        </div>
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">{item.client}</p>
        <h3 className="text-2xl font-bold text-white group-hover:text-neon-green transition-colors">{item.title}</h3>
      </div>

      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 blur-[50px] rounded-full group-hover:bg-[#87E65C]/10 transition-all" />
    </motion.div>
  );
}

export default function ShopifyPortfolio() {
  const { portfolio: dynamicPortfolio } = useContent();

  if (!dynamicPortfolio || dynamicPortfolio.length === 0) {
    return null;
  }

  const portfolioList: PortfolioCardItem[] = dynamicPortfolio.map((p, idx) => ({
    client: p.client || "E-commerce Showcase",
    title: p.title || p.alt || `Project ${idx + 1}`,
    img: p.src,
    color: "from-neon-green/10 to-teal-900/10",
    border: "border-[#87E65C]/20",
    tag: p.tag || "Shopify"
  }));

  // Duplicate list enough times for infinite marquee animation
  const displayPortfolio = portfolioList.length < 4 
    ? [...portfolioList, ...portfolioList, ...portfolioList, ...portfolioList] 
    : [...portfolioList, ...portfolioList];

  return (
    <section id="portfolio" className="py-32 relative z-10 bg-white/[0.01] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            E-commerce <span className="text-neon-green">Showcase</span>
          </motion.h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Explore our high-converting Shopify stores designed for global brands and ambitious startups.
          </p>
        </div>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        <div className="flex animate-marquee hover:[animation-play-state:paused] py-4">
          {displayPortfolio.map((item, i) => (
            <PortfolioCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
