import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  ChevronDown, 
  ArrowRight,
  Megaphone,
  Lightbulb,
  PenTool,
  Mic2,
  Edit3,
  Rocket
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const services = [
  {
    title: "Social media",
    desc: "Self-locking engagement on social media with vibrant, eye-catching motion graphics that stand out in a crowded feed.",
    icon: "https://cdn-icons-png.flaticon.com/512/3670/3670151.png" // Using representative icons since I can't split the grid image easily
  },
  {
    title: "Email Marketing",
    desc: "Boost click-through rates with custom animated email headers and graphics that emphasize your message clarity.",
    icon: "https://cdn-icons-png.flaticon.com/512/281/281769.png"
  },
  {
    title: "Logo Animation",
    desc: "Make a strong first impression with your logo, animating brand momentum for your integrated social media campaigns.",
    icon: "https://cdn-icons-png.flaticon.com/512/3242/3242337.png"
  },
  {
    title: "Explainer Videos",
    desc: "Simplify complex products or services with engaging, easy-to-understand animated narratives.",
    icon: "https://cdn-icons-png.flaticon.com/512/4233/4233830.png"
  },
  {
    title: "UI/UX Animation",
    desc: "Take your app or website prototype to life with interactive animations that showcase the user journey.",
    icon: "https://cdn-icons-png.flaticon.com/512/2311/2311516.png"
  },
  {
    title: "Lottie Animations",
    desc: "Lightweight, scalable vector animations optimized for web and mobile apps for seamless user integration.",
    icon: "https://cdn-icons-png.flaticon.com/512/8106/8106518.png"
  }
];

const processSteps = [
  {
    num: "01",
    title: "Discovery",
    desc: "Understanding your brand, goals, and target audience to lay a solid foundation.",
    icon: <Megaphone className="w-8 h-8" />,
    color: "bg-pink-900/20 text-pink-500",
    border: "border-pink-500/20"
  },
  {
    num: "02",
    title: "Concept",
    desc: "Brainstorming and scriptwriting to craft a compelling narrative for your video.",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "bg-blue-900/20 text-blue-500",
    border: "border-blue-500/20"
  },
  {
    num: "03",
    title: "Design",
    desc: "Creating the custom assets and breathing life into them with fluid, dynamic motion.",
    icon: <PenTool className="w-8 h-8" />,
    color: "bg-purple-900/20 text-purple-500",
    border: "border-purple-500/20"
  },
  {
    num: "04",
    title: "Audio",
    desc: "Adding professional voiceovers, sound effects, and music to elevate the experience.",
    icon: <Mic2 className="w-8 h-8" />,
    color: "bg-orange-900/20 text-orange-500",
    border: "border-orange-500/20"
  },
  {
    num: "05",
    title: "Animation",
    desc: "Animating the storyboards into a seamless, high-quality visual masterpiece.",
    icon: <Edit3 className="w-8 h-8" />,
    color: "bg-emerald-900/20 text-emerald-500",
    border: "border-emerald-500/20"
  },
  {
    num: "06",
    title: "Launch",
    desc: "Delivering the final files in required formats, ready for your marketing campaigns.",
    icon: <Rocket className="w-8 h-8" />,
    color: "bg-amber-900/20 text-amber-500",
    border: "border-amber-500/20"
  }
];

const faqs = [
  {
    q: "What is motion graphics and how does it help my business?",
    a: "Motion graphics adds animation, with text and audio as components. Combined, it’s an efficient creative design to help your business capture people’s emotions, inform them better, and making your brand look more professional and modern."
  },
  {
    q: "How long does an explainer video typically take to produce?",
    a: "A typical high-quality explainer video takes 4-6 weeks to produce, from script to final delivery."
  },
  {
    q: "What if I need changes to the video?",
    a: "We offer multiple revision rounds to ensure the final product perfectly matches your vision."
  },
  {
    q: "Do you provide voiceovers and sound design?",
    a: "Yes, we provide end-to-end services including professional voiceovers and custom sound design."
  },
  {
    q: "What do you need from me to get started?",
    a: "We need your brand guidelines, a brief overview of your goals, and any specific ideas or references you have in mind."
  }
];

export default function MotionGraphicsPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [hoveredStep, setHoveredStep] = useState<number>(2); // Default to Design (index 2)

  return (
    <main className="min-h-screen bg-black text-white pt-24 overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative px-6 lg:px-20 py-12 md:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Motion graphics <br />
              <span className="text-neon-green">services</span>
            </h1>
            <p className="text-neutral-400 text-lg max-w-lg leading-relaxed">
              Motion graphics empower company that delivers high-impact animated graphics for storytelling, visualizations, and brand marketing.
            </p>
            <div className="pt-4">
              <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-neon-green text-black font-bold text-lg rounded-full shadow-[0_10px_30px_rgba(135,230,92,0.2)] hover:scale-105 transition-all">
                Get a quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="relative"
          >
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 group bg-neutral-900 shadow-2xl">
              <img src="/motion_hero.png" alt="Motion Graphics Mockup" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-neon-green flex items-center justify-center shadow-[0_0_30px_rgba(135,230,92,0.5)]">
                  <Play className="w-8 h-8 text-black fill-black" />
                </div>
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-neon-green/10 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* 2. Our Services Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-neon-green">Our Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-neutral-900/40 border border-white/5 hover:border-neon-green/30 transition-all group"
              >
                <div className="w-20 h-20 rounded-2xl bg-neutral-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <img src={service.icon} alt={service.title} className="w-10 h-10 object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-neon-green transition-colors">{service.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Process Section */}
      <section className="py-24 px-6 relative z-10 bg-neutral-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20">OUR PROCESS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight">
              Here's How Our <span className="text-pink-500">Animated Explainer Video</span> Company Builds Your Wow Moment
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              As a leading animated explainer video company, we streamline the process to deliver stunning videos that captivate and convert. Here's how we do it.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row h-auto lg:h-[450px] w-full gap-4 max-w-6xl mx-auto">
            {processSteps.map((step, i) => {
              const isHovered = hoveredStep === i;
              return (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredStep(i)}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  animate={{ 
                    flex: isHovered ? 3 : 1, 
                  }}
                  className={`relative rounded-[2rem] ${step.color} border ${step.border} flex flex-col justify-center items-center text-center overflow-hidden cursor-pointer shadow-lg transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] min-h-[120px]`}
                >
                  {/* Background overlay that darkens unhovered items */}
                  <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
                  
                  {/* Number - top left, always visible but changes opacity */}
                  <div className={`absolute top-6 left-6 font-bold transition-all duration-500 z-10 ${isHovered ? 'text-2xl opacity-100' : 'text-xl opacity-50'}`}>
                    {step.num}
                  </div>

                  {/* Icon - Always centered when closed, moves up when open */}
                  <motion.div 
                    layout
                    className={`relative z-10 transition-all duration-500 flex items-center justify-center h-20 ${isHovered ? 'mb-4 scale-110' : 'mb-0 scale-100'}`}
                  >
                    <div className={`p-4 rounded-full transition-all duration-500 ${isHovered ? 'bg-black/40 backdrop-blur-md shadow-[0_0_40px_currentColor]' : 'bg-transparent'}`}>
                      {step.icon}
                    </div>
                  </motion.div>

                  {/* Content - Only visible when hovered */}
                  <AnimatePresence mode="wait">
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 relative z-10 overflow-hidden w-full"
                      >
                        <h4 className="font-bold text-white text-xl lg:text-2xl mb-3 whitespace-nowrap">
                          {step.title}
                        </h4>
                        <p className="text-sm font-medium opacity-80 leading-relaxed max-w-[250px] mx-auto line-clamp-3">
                          {step.desc}
                        </p>
                        
                        <div className="mt-6 flex justify-center pb-2">
                          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl font-bold text-white">
              Frequently <span className="text-neon-green">Asked Questions (FAQs)</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-3xl bg-neutral-900/30 border border-white/5 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-8 py-7 flex items-center justify-between text-left group"
                >
                  <span className={`text-lg font-bold transition-colors ${activeFaq === i ? 'text-neon-green' : 'text-white hover:text-neon-green/80'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all ${activeFaq === i ? 'bg-neon-green border-neon-green text-black rotate-180' : 'text-neutral-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-8 pb-8 text-neutral-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
