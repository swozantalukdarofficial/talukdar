import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useContent } from "../context/ContentContext";

const testimonials = [
  {
    name: "Akramul Haque",
    role: "Founder, Maisha Net",
    content: "Webestone transformed our online presence. Our organic traffic and leads grew by 300% within just six months of working with their AI-driven SEO and content team.",
    image: "https://i.pravatar.cc/150?u=akram",
  },
  {
    name: "Sarah Ahmed",
    role: "CEO, Arch Leather",
    content: "The best AI digital marketing agency, period. Their data-backed approach to social media advertising and Meta Ads gave us our best sales quarter ever.",
    image: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Rahat Kabir",
    role: "Director, EduBD",
    content: "Professional, creative, and results-oriented. They built our Ed-Tech platform from scratch with clean responsive design and managed the entire launch campaign flawlessly.",
    image: "https://i.pravatar.cc/150?u=rahat",
  },
];

export default function Testimonials() {
  const { testimonials: dynamicTestimonials } = useContent();

  const displayTestimonials = dynamicTestimonials && dynamicTestimonials.length > 0
    ? dynamicTestimonials.map(t => ({
        name: t.name,
        role: t.company ? `${t.role}, ${t.company}` : t.role,
        content: t.text,
        image: t.avatar,
        rating: t.rating || 5
      }))
    : testimonials.map(t => ({ ...t, rating: 5 }));

  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Trusted by <span className="text-emerald-600">Visionary Brands</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Don't just take our word for it. Here is what our clients have to say about their growth journey with WeBestOne.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white border border-slate-200 relative group hover:border-emerald-500/40 transition-all shadow-lg shadow-slate-200/50"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-slate-100 group-hover:text-emerald-100 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(Math.min(5, Math.max(0, Math.round(Number(item.rating) || 5))))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                ))}
              </div>

              <p className="text-slate-700 italic mb-8 leading-relaxed relative z-10">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
