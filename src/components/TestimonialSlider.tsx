import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Their UI/UX team completely transformed our SaaS product. User retention went up 45% in the first month just because the interface finally made sense. The logic they applied is world-class.",
    name: "Sarah Jenkins",
    role: "Product Manager at CloudScale",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    quote: "The Figma files they handed over to our devs were immaculate. The design system saved us months of coding time. Absolute perfectionists when it comes to detail and spacing.",
    name: "David Chen",
    role: "CTO, TechFlow Systems",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  },
  {
    quote: "We were struggling with mobile conversions. Webestone redesigned our checkout flow and we saw an immediate 32% increase in sales. They truly understand consumer psychology.",
    name: "Emma Rodriguez",
    role: "CEO at LuxeMart",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
  },
  {
    quote: "Working with Webestone was a game-changer. Their attention to micro-interactions and accessibility standards is something we hadn't found elsewhere.",
    name: "Michael Ross",
    role: "Founder, FinEdge",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  }
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="w-[300px] md:w-[400px] flex-shrink-0 p-6 md:p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 relative flex flex-col h-full mx-4">
      <div className="flex gap-1 mb-6 text-yellow-500">
        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
      </div>
      <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-8 italic flex-1">"{t.quote}"</p>
      <div className="flex items-center gap-4 pt-6 border-t border-white/5">
        <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full bg-white/10" />
        <div>
          <p className="text-white font-bold text-sm">{t.name}</p>
          <p className="text-neutral-500 text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSlider() {
  // Triple the items for a truly seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 relative z-10 bg-white/[0.01] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted by <span className="text-yellow-400">Founders & Teams</span></h2>
          <p className="text-neutral-400">See how our designs have impacted real businesses across the globe.</p>
        </motion.div>
      </div>

      {/* Slider Container */}
      <div className="relative flex overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        <div 
          className="flex animate-marquee hover:[animation-play-state:paused]"
        >
          {duplicatedTestimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
