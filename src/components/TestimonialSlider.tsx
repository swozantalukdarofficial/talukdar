import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useContent } from "../context/ContentContext";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating?: number;
}

const fallbackTestimonials: Testimonial[] = [
  {
    quote: "Their UI/UX team completely transformed our SaaS product. User retention went up 45% in the first month just because the interface finally made sense. The logic they applied is world-class.",
    name: "Sarah Jenkins",
    role: "Product Manager, CloudScale",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5
  },
  {
    quote: "The design files they handed over to our devs were immaculate. The design system saved us months of coding time. Absolute perfectionists when it comes to detail and spacing.",
    name: "David Chen",
    role: "CTO, TechFlow Systems",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    rating: 5
  },
  {
    quote: "We were struggling with mobile conversions. Webestone redesigned our checkout flow and we saw an immediate 32% increase in sales. They truly understand consumer psychology.",
    name: "Emma Rodriguez",
    role: "CEO, LuxeMart",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    rating: 5
  },
  {
    quote: "Working with Webestone was a game-changer. Their attention to micro-interactions and accessibility standards is something we hadn't found elsewhere.",
    name: "Michael Ross",
    role: "Founder, FinEdge",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    rating: 5
  }
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="w-[270px] xs:w-[300px] md:w-[400px] flex-shrink-0 p-5 md:p-8 rounded-3xl bg-white border border-slate-200 relative flex flex-col h-full mx-2 sm:mx-4 hover:border-emerald-500/40 transition-all shadow-lg shadow-slate-200/50">
      <div className="flex gap-1 mb-6 text-amber-400">
        {[...Array(t.rating || 5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
      </div>
      <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-8 italic flex-1">"{t.quote}"</p>
      <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
        <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full bg-slate-100 object-cover border border-slate-200" />
        <div>
          <p className="text-slate-900 font-bold text-sm">{t.name}</p>
          <p className="text-slate-500 text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSlider() {
  const { testimonials: dynamicTestimonials } = useContent();

  const testimonialsList: Testimonial[] = dynamicTestimonials && dynamicTestimonials.length > 0
    ? dynamicTestimonials.map((t) => ({
        quote: t.text,
        name: t.name,
        role: `${t.role}${t.company ? `, ${t.company}` : ""}`,
        avatar: t.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(t.name)}`,
        rating: t.rating || 5,
      }))
    : fallbackTestimonials;

  // Quadruple or repeat items for a truly seamless infinite scrolling marquee loop
  const duplicatedTestimonials = testimonialsList.length < 4
    ? [...testimonialsList, ...testimonialsList, ...testimonialsList, ...testimonialsList]
    : [...testimonialsList, ...testimonialsList, ...testimonialsList];

  return (
    <section className="py-24 relative z-10 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Trusted by <span className="text-emerald-600">Founders & Teams</span></h2>
          <p className="text-slate-600">See how our designs and strategies have impacted real businesses across the globe.</p>
        </motion.div>
      </div>

      {/* Slider Container */}
      <div className="relative flex overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none" />

        <div 
          className="flex animate-marquee hover:[animation-play-state:paused] py-4"
        >
          {duplicatedTestimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
