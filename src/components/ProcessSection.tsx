import { motion } from "framer-motion";

const processSteps = [
  { num: "01", title: "Discover & Research", desc: "User interviews, competitor analysis, and defining the target persona to build a solid foundation." },
  { num: "02", title: "Wireframing", desc: "Low-fidelity sketches to establish information architecture and core user flows without distractions." },
  { num: "03", title: "Visual Design (UI)", desc: "Applying color theory, typography, and brand identity into high-fidelity screens that wow users." },
  { num: "04", title: "Interactive Prototyping", desc: "Connecting screens to simulate the final product experience and test complex interactions." },
  { num: "05", title: "Usability Testing", desc: "Observing real users navigating the prototype to catch friction points and refine the logic." },
  { num: "06", title: "Dev Handoff", desc: "Exporting assets, redlines, and comprehensive style guides for a pixel-perfect development." },
];

export default function ProcessSection() {
  return (
    <section className="py-32 px-6 relative z-10 bg-[#050505] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Methodology</span>
          </motion.h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            A battle-tested 6-step process to ensure flawless execution from initial idea to final developer handoff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Vertical/Horizontal Connectors (Hidden on Mobile) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent -translate-y-1/2 pointer-events-none" />
          
          {processSteps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:bg-white/[0.04]"
            >
              {/* Number Badge */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-2xl font-black text-white mb-8 shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {step.num}
              </div>

              {/* Decorative Line */}
              <div className="absolute top-12 left-24 right-8 h-[1px] bg-white/5 hidden lg:block group-hover:bg-indigo-500/20 transition-colors" />

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                {step.desc}
              </p>

              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
