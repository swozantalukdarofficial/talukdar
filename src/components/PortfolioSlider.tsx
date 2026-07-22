import { motion } from "framer-motion";
import { Figma, ArrowUpRight } from "lucide-react";

const portfolio = [
  {
    client: "FinTech App",
    title: "Banking Dashboard Redesign",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    color: "from-blue-600/20 to-purple-600/20",
    border: "border-blue-500/20",
    tag: "Mobile App"
  },
  {
    client: "E-Commerce",
    title: "Mobile Shopping Experience",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    color: "from-pink-600/20 to-rose-600/20",
    border: "border-pink-500/20",
    tag: "E-commerce"
  },
  {
    client: "AI Startup",
    title: "SaaS Interface & Design System",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
    color: "from-emerald-600/20 to-teal-600/20",
    border: "border-emerald-500/20",
    tag: "SaaS"
  },
  {
    client: "HealthTech",
    title: "Telemedicine Platform UI",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    color: "from-cyan-600/20 to-blue-600/20",
    border: "border-cyan-500/20",
    tag: "Web App"
  }
];

function PortfolioCard({ item }: { item: typeof portfolio[0] }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`w-[280px] sm:w-[350px] md:w-[450px] flex-shrink-0 p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border ${item.border} bg-gradient-to-b ${item.color} flex flex-col min-h-[400px] sm:min-h-[450px] relative overflow-hidden group cursor-pointer mx-2 sm:mx-4`}
    >
      {/* Image Container */}
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
          <Figma className="w-5 h-5 text-neutral-500 group-hover:text-pink-500 transition-colors" />
        </div>
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">{item.client}</p>
        <h3 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">{item.title}</h3>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 blur-[50px] rounded-full group-hover:bg-pink-500/10 transition-all" />
    </motion.div>
  );
}

export default function PortfolioSlider() {
  const duplicatedPortfolio = [...portfolio, ...portfolio];

  return (
    <section id="portfolio" className="py-32 relative z-10 bg-white/[0.01] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Featured <span className="text-emerald-400">Prototypes</span>
            </motion.h2>
            <p className="text-neutral-400 text-lg max-w-xl">
              Exploring the boundaries of digital interfaces through high-fidelity, interactive prototypes.
            </p>
          </div>
        </div>
      </div>

      {/* Marquee Slider */}
      <div className="relative flex overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        <div className="flex animate-marquee hover:[animation-play-state:paused] py-4">
          {duplicatedPortfolio.map((item, i) => (
            <PortfolioCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
