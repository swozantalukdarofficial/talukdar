import { motion } from "framer-motion";
import { Award, ShieldCheck, CheckCircle, Star } from "lucide-react";

const certifications = [
  { 
    name: "Google Partner", 
    icon: CheckCircle, 
    year: "2024",
    color: "from-blue-500/20 to-neon-green/20",
    textColor: "text-blue-400"
  },
  { 
    name: "Meta Business Partner", 
    icon: ShieldCheck, 
    year: "2024",
    color: "from-blue-600/20 to-purple-600/20",
    textColor: "text-blue-500"
  },
  { 
    name: "HubSpot Certified", 
    icon: Award, 
    year: "2022",
    color: "from-orange-500/20 to-amber-500/20",
    textColor: "text-orange-400"
  },
  { 
    name: "Shopify Partner", 
    icon: Star, 
    year: "2024",
    color: "from-emerald-500/20 to-teal-500/20",
    textColor: "text-emerald-400"
  },
];

export default function Awards() {
  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6">
              <Award className="w-3.5 h-3.5 text-neon-green" />
              Verified Excellence
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Certifications & <span className="text-neon-green">Global Partners</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              We do not just claim industry standards. We are certified by the platforms that set them.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative p-10 rounded-3xl bg-neutral-900/50 border border-white/10 group-hover:border-white/20 backdrop-blur-xl flex flex-col items-center text-center transition-all h-full">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <cert.icon className={`w-10 h-10 ${cert.textColor}`} />
                </div>
                <h3 className="text-white font-black mb-3 uppercase tracking-wider text-sm group-hover:text-neon-green transition-colors">{cert.name}</h3>
                <div className="h-[1px] w-12 bg-white/10 mb-4 group-hover:w-20 transition-all"></div>
                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.3em] font-bold">Official Partner {cert.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
