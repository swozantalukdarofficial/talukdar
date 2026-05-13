import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Lightbulb, PenTool, Rocket, TrendingUp } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    title: "Discovery & Audit",
    description: "We dive deep into your brand, market, and competitors to find untapped growth opportunities and data gaps.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/20",
  },
  {
    title: "Strategy Planning",
    description: "Our experts craft a data-driven roadmap tailored specifically to your business goals and KPIs.",
    icon: Lightbulb,
    color: "from-purple-500 to-indigo-500",
    glow: "shadow-purple-500/20",
  },
  {
    title: "Creative Execution",
    description: "High-quality content, precision design, and technical setups that bring the strategy to life with impact.",
    icon: PenTool,
    color: "from-rose-500 to-pink-500",
    glow: "shadow-rose-500/20",
  },
  {
    title: "Launch & Scale",
    description: "We deploy the campaigns across platforms and continuously optimize them to maximize performance and ROI.",
    icon: Rocket,
    color: "from-neon-green to-emerald-500",
    glow: "shadow-neon-green/20",
  },
  {
    title: "Revenue Growth",
    description: "The final result: increased visibility, higher conversion rates, and scalable revenue for your brand.",
    icon: TrendingUp,
    color: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/20",
  },
];

export default function WorkingProcess() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden bg-black">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-neon-green/[0.02] blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.3em] mb-6">
              Our Roadmap
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Our <span className="text-neon-green">Proven</span> Process
            </h2>
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We don't believe in guesswork. Our systematic approach ensures that every project is built for long-term success.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Central Vertical Line (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block">
            <motion.div 
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-neon-green via-blue-500 to-purple-500 shadow-[0_0_15px_rgba(135,230,92,0.5)]"
            />
          </div>

          <div className="space-y-12 md:space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-[42%] group">
                  <div className="relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 group-hover:bg-white/[0.04] group-hover:border-white/20 transition-all duration-500 backdrop-blur-xl">
                    <div className="absolute -top-12 -right-6 text-9xl font-black text-white/[0.02] pointer-events-none select-none group-hover:text-neon-green/[0.05] transition-colors">
                      0{index + 1}
                    </div>
                    
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} ${step.glow} flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-green transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Circle Indicator */}
                <div className="relative z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black border-2 border-white/10 group-hover:border-neon-green transition-colors duration-500 overflow-hidden">
                   <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                   <span className="relative z-10 text-xs font-black text-white group-hover:text-black">0{index + 1}</span>
                </div>

                {/* Empty Spacer for desktop alignment */}
                <div className="hidden md:block w-[42%]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
