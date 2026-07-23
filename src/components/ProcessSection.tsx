import { motion } from "framer-motion";

const processSteps = [
  { num: "01", title: "Discovery", desc: "We define direction using structured user personas." },
  { num: "02", title: "Research", desc: "We identify friction through UX audits and heuristic evaluation." },
  { num: "03", title: "Strategy", desc: "We build a clear UX strategy supported by strong information architecture." },
  { num: "04", title: "Wireframing", desc: "We create wireframes that define flow before design begins." },
  { num: "05", title: "UI design", desc: "We design using Figma, Adobe XD, Sketch, and InVision." },
  { num: "06", title: "UX optimization", desc: "We refine through usability testing to remove hesitation." },
  { num: "07", title: "Content alignment", desc: "We align messaging with how users think and decide." },
  { num: "08", title: "Development", desc: "We build stable, scalable digital systems." },
  { num: "09", title: "Quality assurance", desc: "We test usability, performance, and consistency." },
  { num: "10", title: "Analytics and setup", desc: "We implement tracking to measure behavior and outcomes." },
  { num: "11", title: "Launch and scale", desc: "We improve continuously based on real user data." },
];

export default function ProcessSection() {
  return (
    <section className="py-32 px-6 relative z-10 bg-[#050505] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-[#63b93a]">web design process</span>
          </motion.h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            This is not random execution. It is a structured system. Every stage exists to remove friction and guide decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Vertical/Horizontal Connectors (Hidden on Mobile) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-green/20 to-transparent -translate-y-1/2 pointer-events-none" />

          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-neon-green/30 transition-all duration-500 hover:bg-white/[0.04]"
            >
              {/* Number Badge */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-green to-[#63b93a] flex items-center justify-center text-2xl font-black text-black mb-8 shadow-lg shadow-neon-green/20 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {step.num}
              </div>

              {/* Decorative Line */}
              <div className="absolute top-12 left-24 right-8 h-[1px] bg-white/5 hidden lg:block group-hover:bg-neon-green/20 transition-colors" />

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-green transition-colors">
                {step.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                {step.desc}
              </p>

              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
