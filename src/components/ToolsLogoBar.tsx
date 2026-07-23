import { motion } from "framer-motion";

const tools = [
  { name: "Ahrefs", color: "text-blue-400" },
  { name: "SEMrush", color: "text-orange-500" },
  { name: "Google Ads", color: "text-blue-500" },
  { name: "Meta Ads", color: "text-blue-600" },
  { name: "HubSpot", color: "text-orange-600" },
  { name: "Shopify", color: "text-emerald-500" },
  { name: "Google Analytics", color: "text-orange-400" },
  { name: "Mailchimp", color: "text-yellow-400" },
  { name: "WordPress", color: "text-blue-300" },
  { name: "Zapier", color: "text-orange-400" },
];

export default function ToolsLogoBar() {
  return (
    <section className="py-10 md:py-14 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12 flex items-center justify-center gap-4 md:gap-6">
        <div className="h-[1px] flex-grow max-w-[50px] md:max-w-[100px] bg-gradient-to-r from-transparent to-slate-200"></div>
        <p className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-black text-slate-500 whitespace-nowrap">
          Our High-Performance Tech Stack
        </p>
        <div className="h-[1px] flex-grow max-w-[50px] md:max-w-[100px] bg-gradient-to-l from-transparent to-slate-200"></div>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap gap-16 md:gap-28 items-center pr-16 md:pr-28"
        >
          {[...tools, ...tools].map((tool, index) => (
            <div key={index} className="flex items-center gap-3 group cursor-default">
              <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${tool.color} opacity-40 group-hover:opacity-100 transition-opacity`}></div>
              <span className={`text-lg md:text-2xl font-black ${tool.color} opacity-70 group-hover:opacity-100 transition-all duration-300 italic tracking-tighter uppercase select-none`}>
                {tool.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
