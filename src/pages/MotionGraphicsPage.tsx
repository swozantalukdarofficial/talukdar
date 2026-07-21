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
  Rocket,
  Sparkles,
  Mail,
  Layers,
  Video,
  Smartphone
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SEO from "../components/SEO";
import { useContent } from "../context/ContentContext";
import AdminServiceImageEditor from "../components/admin/AdminServiceImageEditor";

const motionGraphicsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://webestone.com/services/motion-graphics#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://webestone.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://webestone.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Motion Graphics Services", "item": "https://webestone.com/services/motion-graphics" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://webestone.com/services/motion-graphics#service",
      "serviceType": "Motion Graphics & 3D Animation",
      "name": "Motion Graphics Services",
      "description": "Professional motion graphics and 3D animation services including explainer videos, logo animations, product demos, cinematic intros, and animated social media content.",
      "url": "https://webestone.com/services/motion-graphics",
      "provider": {
        "@type": "LocalBusiness",
        "name": "WeBestOne",
        "url": "https://webestone.com",
        "logo": "https://webestone.com/favicon.png",
        "telephone": "+8801815025322",
        "email": "webestone@gmail.com",
        "address": { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressRegion": "Dhaka Division", "addressCountry": "BD" }
      },
      "areaServed": ["BD", "US", "GB", "AU", "CA"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Motion Graphics Packages",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Explainer Video Animation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Logo Animation & Intro" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "3D Product Animation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Animated Social Media Content" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kinetic Typography" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What motion graphics software do you use?",
          "acceptedAnswer": { "@type": "Answer", "text": "We use Adobe After Effects, Cinema 4D, Blender, and Adobe Premiere Pro for motion graphics and 3D animation projects of all scales and styles." }
        },
        {
          "@type": "Question",
          "name": "What file formats do you deliver?",
          "acceptedAnswer": { "@type": "Answer", "text": "We deliver finished animations in MP4, MOV, WebM, GIF, and transparent PNG sequences depending on your usage requirements for web, social media, or broadcast." }
        },
        {
          "@type": "Question",
          "name": "How long does a motion graphics project take?",
          "acceptedAnswer": { "@type": "Answer", "text": "A 30-60 second explainer or logo animation typically takes 5-10 business days. Complex 3D product animations or longer productions may require 2-4 weeks." }
        },
        {
          "@type": "Question",
          "name": "Can you match our brand style and guidelines?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. We incorporate your brand colors, typography, logo, and visual tone into every animation to ensure consistency with your existing identity across all platforms." }
        }
      ]
    }
  ]
};

const services = [
  {
    title: "Social media motion graphics",
    desc: "As a motion graphics agency, WebestOne creates social media motion graphics using kinetic typography, animated transitions, and infographics animation. Every piece is built to stop scrolling and hold attention.",
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    title: "Email motion graphics",
    desc: "We turn static communication into motion-driven experiences using digital animation and compositing. This improves engagement and response without increasing complexity.",
    icon: <Mail className="w-8 h-8" />
  },
  {
    title: "Logo animation",
    desc: "Our logo motion graphics service transforms static branding into dynamic identity. Using vector animation, keyframing, and motion tracking, we build visuals people remember.",
    icon: <Layers className="w-8 h-8" />
  },
  {
    title: "Explainer video motion graphics",
    desc: "We deliver explainer video motion graphics using storyboarding and visual storytelling. This is where clarity meets engagement.",
    icon: <Video className="w-8 h-8" />
  },
  {
    title: "UI motion design",
    desc: "As a professional motion graphics studio, we create UI motion design using animated transitions and interaction-based animation that improves usability and flow.",
    icon: <Smartphone className="w-8 h-8" />
  },
  {
    title: "Promo video motion graphics",
    desc: "Our Promo Video Motion Graphics Service is built to make offers clearer, faster to understand, and harder to ignore. We combine motion, pacing, and visual hierarchy to move viewers toward action.",
    icon: <Megaphone className="w-8 h-8" />
  }
];

const processSteps = [
  {
    num: "01",
    title: "Strategy",
    desc: "We analyze your audience, positioning, and communication gaps to define direction.",
    icon: <Megaphone className="w-8 h-8" />,
    color: "bg-neon-green/10 text-neon-green",
    border: "border-neon-green/20"
  },
  {
    num: "02",
    title: "Concept and storyboarding",
    desc: "We structure your message using storyboarding and visual hierarchy so everything flows naturally.",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "bg-emerald-950/30 text-emerald-400",
    border: "border-emerald-500/20"
  },
  {
    num: "03",
    title: "Design and animation",
    desc: "We build using 2D animation and 3D motion graphics supported by tools like adobe after effects, cinema 4d, blender, adobe illustrator, and photoshop.",
    icon: <PenTool className="w-8 h-8" />,
    color: "bg-neon-green/10 text-neon-green",
    border: "border-neon-green/20"
  },
  {
    num: "04",
    title: "Production and editing",
    desc: "We refine using visual effects, compositing, and motion tracking along with adobe premiere pro to deliver a complete output.",
    icon: <Edit3 className="w-8 h-8" />,
    color: "bg-emerald-950/30 text-emerald-400",
    border: "border-emerald-500/20"
  },
  {
    num: "05",
    title: "Optimization and delivery",
    desc: "We optimize for platforms including corporate motion graphics, social media motion graphics, promo video graphics, and educational video graphics.",
    icon: <Rocket className="w-8 h-8" />,
    color: "bg-neon-green/10 text-neon-green",
    border: "border-neon-green/20"
  }
];

const faqs = [
  {
    q: "01 What makes WebestOne a motion graphics services company worth choosing",
    a: "We combine strategy, visual storytelling, and production precision to create motion graphics that hold attention and drive action."
  },
  {
    q: "02 What types of motion graphics services do you offer",
    a: "We provide social media motion graphics, explainer videos, logo animation, Promo Video Motion Graphics Service, and UI motion design."
  },
  {
    q: "03 Do you offer both 2D and 3D motion graphics services",
    a: "Yes. We deliver both 2D animation and 3D motion graphics services based on your platform and audience needs."
  },
  {
    q: "04 What tools and technologies do you use",
    a: "We use adobe after effects, adobe premiere pro, cinema 4d, blender, adobe illustrator, and photoshop for motion graphics production."
  },
  {
    q: "05 How long does a motion graphics project take",
    a: "Most projects take one to three weeks depending on complexity and scope."
  }
];

export default function MotionGraphicsPage() {
  const { serviceImages } = useContent();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [hoveredStep, setHoveredStep] = useState<number>(2); // Default to Design (index 2)

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <AdminServiceImageEditor serviceId="motion-graphics-services-company" />
      <SEO 
        pageKey="motion-graphics-services-company"
        title="Motion Graphics Services Company | 3D Animation services" 
        description="Advanced Motion Graphics Services Company specializes in Explainer Videos, 3D Motion Graphics, visual Storytelling and Animated Transitions that scale your brand." 
        schemaMarkup={motionGraphicsSchema}
      />
      {/* 1. HERO SECTION (UPGRADED) */}
      <section className="relative px-6 lg:px-20 pt-28 pb-16 overflow-visible min-h-screen flex items-center w-full">
        {/* Animated Mesh Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[0%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-neon-green/10 blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-600/10 blur-[120px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-24 items-center relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/10 text-neon-green text-[11px] font-semibold backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              Premium Animation Studio
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[60px] font-black leading-[1.1] tracking-tight">
              Motion graphics services company that turns visuals into <br/>
              <span className="text-neon-green">
                attention and action
              </span>
            </h1>
            <div className="text-neutral-400 text-sm max-w-xl leading-relaxed space-y-2.5">
              <p className="text-white font-medium border-l-2 border-neon-green/50 pl-4 py-0.5 italic opacity-90">
                 "Most brands are not invisible because they lack effort. They are invisible because they fail to hold attention."
              </p>
              <p>
                 As a motion graphics services company, WebestOne creates visual content that moves, explains, and stays with your audience. We combine 2D animation, 3D animation, and visual storytelling to turn ideas into clear, high-impact motion.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link to="/contact-us" className="inline-flex items-center gap-3 px-6 py-3.5 bg-neon-green text-black font-bold text-sm rounded-full shadow-[0_0_30px_rgba(135,230,92,0.3)] hover:shadow-[0_0_50px_rgba(135,230,92,0.5)] hover:scale-105 transition-all">
                👉 start a project <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-4 text-sm font-bold text-neutral-400">
                  <div className="flex -space-x-3">
                      <img src="https://i.pravatar.cc/100?img=1" className="w-10 h-10 rounded-full border-2 border-black" alt="Client" />
                      <img src="https://i.pravatar.cc/100?img=2" className="w-10 h-10 rounded-full border-2 border-black" alt="Client" />
                      <img src="https://i.pravatar.cc/100?img=3" className="w-10 h-10 rounded-full border-2 border-black" alt="Client" />
                  </div>
                  <span>Trusted by 100+ Brands</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="relative mt-10 lg:mt-0 lg:pl-10 order-1 lg:order-2 w-full"
          >
            {/* Floating Element 1 */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 bg-neutral-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl z-20 shadow-2xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Engagement</p>
                <p className="text-lg font-black text-white">+340%</p>
              </div>
            </motion.div>

            {/* Floating Element 2 */}
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -right-8 bg-neutral-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl z-20 shadow-2xl flex items-center gap-3"
            >
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-6 bg-neon-green rounded-full animate-pulse" style={{ animationDelay: `${i*0.1}s` }} />)}
              </div>
              <p className="text-sm font-bold text-white">4K Rendering</p>
            </motion.div>

            <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden border border-white/10 group bg-neutral-900 shadow-2xl">
              <img src={serviceImages["motion-graphics-services-company"] || "/motion_hero.webp"} alt="Motion Graphics Services Company" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-neon-green flex items-center justify-center shadow-[0_0_50px_rgba(135,230,92,0.6)] cursor-pointer group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-black fill-black ml-1" />
                </div>
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-neon-green/20 blur-[120px] rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* 2. Our Services Section */}
      <section className="pt-8 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Services we offer</h2>
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
                <div className="w-20 h-20 rounded-2xl bg-neutral-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-neon-green">
                  {service.icon}
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
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neon-green px-4 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20">PROCESS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight">
              Built for <span className="text-neon-green">clarity.</span> Designed for performance.
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              As a motion graphics services company, WebestOne follows a structured workflow that connects creativity with execution.
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
      {/* 5. CTA / Final Line */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">Attention is not given. <br/><span className="text-neon-green">It is created.</span></h2>
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
                As a motion graphics services company, WebestOne builds motion that captures attention, explains clearly, and drives action.
            </p>
            <div className="pt-4">
              <Link to="/contact-us" className="inline-flex items-center gap-3 px-10 py-5 bg-neon-green text-black font-bold text-lg rounded-full shadow-[0_10px_30px_rgba(135,230,92,0.2)] hover:scale-105 transition-all">
                👉 start a project <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
        </div>
      </section>
    </main>
  );
}
