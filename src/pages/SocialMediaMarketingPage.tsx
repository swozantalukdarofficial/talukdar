import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Plus, 
  Share2, 
  Zap, 
  Target, 
  BarChart3, 
  MessageSquare, 
  Users, 
  PlayCircle,
  ArrowRight,
  TrendingUp,
  Search,
  Globe,
  Instagram,
  Youtube,
  Linkedin,
  Music,
  CheckCircle2,
  Facebook,
  Twitter
} from "lucide-react";
import { MagneticButton } from "../components/ui/MagneticButton";

const processSteps = [
  { 
    title: "Insight planning", 
    desc: "Understanding your audience's behavior and planning content that resonates with their needs and interests." 
  },
  { 
    title: "Content Creation & Curation", 
    desc: "Developing visually stunning and engaging content tailored for each specific social platform." 
  },
  { 
    title: "Audience Engagement", 
    desc: "Proactive community management and interaction to build real connections and brand loyalty." 
  },
  { 
    title: "Performance Tracking & Optimization", 
    desc: "Continuous data analysis to refine strategies and maximize your social media ROI." 
  }
];

const faqs = [
  {
    q: "How does automation improve results?",
    a: "Automation allows for faster response times, more precise targeting, and 24/7 engagement, ensuring no opportunity is missed in the fast-paced social landscape."
  },
  {
    q: "Does automation replace creativity?",
    a: "No, automation handles repetitive tasks like scheduling and data collection, freeing up our creative team to focus on high-level strategy and unique storytelling."
  },
  {
    q: "How are paid campaigns managed?",
    a: "We use data-driven insights to optimize ad spend across platforms like Meta, LinkedIn, and TikTok, ensuring maximum reach and conversion for your budget."
  },
  {
    q: "Is competitor research included?",
    a: "Yes, we perform deep-dive competitor analysis to identify gaps, trends, and opportunities within your specific niche."
  }
];

const platforms = [
  {
    name: "Instagram",
    desc: "Support visibility through immersive formats like Reels, placing brands inside natural browsing behavior and discovery.",
    icon: <Instagram className="w-8 h-8" />,
    gradient: "from-pink-600 to-purple-600"
  },
  {
    name: "TikTok",
    desc: "Dominate the fastest-growing short-form video platform with trend-focused content and viral-ready strategies.",
    icon: <Music className="w-8 h-8" />,
    gradient: "from-neutral-800 to-black"
  },
  {
    name: "YouTube",
    desc: "Long-form authority and Shorts engagement to build a sustainable video ecosystem for your brand.",
    icon: <Youtube className="w-8 h-8" />,
    gradient: "from-red-600 to-rose-700"
  },
  {
    name: "LinkedIn",
    desc: "B2B growth and professional thought leadership through strategic networking and high-value content.",
    icon: <Linkedin className="w-8 h-8" />,
    gradient: "from-blue-700 to-indigo-900"
  }
];

const stats = [
  { label: "Engagement Rate", value: "3.5x", icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> },
  { label: "Brand Reach", value: "2M+", icon: <Target className="w-5 h-5 text-blue-400" /> },
  { label: "Conversion Lift", value: "45%", icon: <BarChart3 className="w-5 h-5 text-purple-400" /> }
];

export default function SocialMediaMarketingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activePlatform, setActivePlatform] = useState(0);

  // Auto-scroll for Workflow Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < processSteps.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll for Platforms Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePlatform((prev) => (prev < platforms.length - 1 ? prev + 1 : 0));
    }, 6000); // Slightly different timing for variation
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen text-white pt-20 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>
      </div>

      {/* Hero Section - Balanced sizes */}
      <section className="relative z-10 px-6 lg:px-20 py-12 md:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase">
                <span className="text-neon-green">Social Media</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                  Marketing Service
                </span>
              </h1>
            </div>

            <p className="text-base md:text-lg text-neutral-300 max-w-lg leading-relaxed font-medium">
              By combining strategy and creativity, Webestone operates as a Social Media Marketing Agency that converts social engagement into steady, measurable business growth across digital platforms worldwide.
            </p>

            <p className="text-xs md:text-sm text-pink-500 font-bold tracking-[0.2em] uppercase">
              CONNECTION THAT BUILDS REAL GROWTH
            </p>

            <div className="pt-2">
              <Link to="/contact">
                <MagneticButton className="px-8 py-4 bg-neon-green text-black font-bold text-base rounded-full shadow-[0_10px_30px_rgba(135,230,92,0.2)] hover:scale-105 transition-all">
                  Begin smarter growth
                </MagneticButton>
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Smartphone Frame UI - Standard Size */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Phone Frame */}
            <div className="relative w-[240px] h-[480px] md:w-[280px] md:h-[560px] bg-neutral-900 rounded-[2.5rem] border-[6px] border-neutral-800 shadow-2xl overflow-hidden">
              {/* Internal Screen Content - YouTube Video */}
              <div className="absolute inset-0 bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&modestbranding=1&showinfo=0&rel=0"
                  title="Social Media Marketing"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                
                {/* Overlay to catch clicks and maintain aesthetics if needed */}
                <div className="absolute inset-0 pointer-events-none border-[12px] border-transparent rounded-[2rem]"></div>
              </div>

              {/* Phone Frame Shine */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
            </div>

            {/* Decorative glows */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-600/5 blur-[100px] rounded-full"></div>
          </motion.div>
        </div>
      </section>


      {/* 2. Process Slider Section */}
      <section className="py-24 px-6 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-neon-green font-mono text-xs tracking-[0.3em] uppercase block">
              WORKFLOW
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              How We Manage <br />
              <span className="relative inline-block">
                <span className="text-neon-green">Social Growth</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" fill="none">
                  <path d="M5 15Q150 5 295 15" stroke="#87E65C" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="relative p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 backdrop-blur-3xl overflow-hidden min-h-[400px] flex flex-col justify-center"
              >
                {/* Step Label */}
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                  STEP {activeStep + 1}
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase leading-tight max-w-2xl">
                    {processSteps[activeStep].title}
                  </h3>
                  <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-3xl">
                    {processSteps[activeStep].desc}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-12 left-12 right-12">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-neon-green"
                      initial={{ width: 0 }}
                      animate={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12">
              <button 
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : processSteps.length - 1))}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-neon-green transition-all group"
              >
                <ArrowRight className="w-5 h-5 rotate-180 group-hover:text-neon-green" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12">
              <button 
                onClick={() => setActiveStep((prev) => (prev < processSteps.length - 1 ? prev + 1 : 0))}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-neon-green transition-all group"
              >
                <ArrowRight className="w-5 h-5 group-hover:text-neon-green" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Platforms Slider Section */}
      <section className="py-24 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Platform Card Slider */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlatform}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`p-10 md:p-14 rounded-[3rem] aspect-square md:aspect-video lg:aspect-square flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${platforms[activePlatform].gradient} border border-white/10 shadow-2xl`}
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                    {platforms[activePlatform].icon}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    {platforms[activePlatform].name}
                  </h3>
                </div>

                <div className="space-y-8">
                  <p className="text-neutral-200 text-lg md:text-xl leading-relaxed max-w-sm">
                    {platforms[activePlatform].desc}
                  </p>
                  
                  {/* Dots & Nav */}
                  <div className="flex items-center gap-6">
                    <div className="flex gap-2">
                      {platforms.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 transition-all duration-500 rounded-full ${activePlatform === i ? 'w-8 bg-white' : 'w-2 bg-white/20'}`} 
                        />
                      ))}
                    </div>
                    <button 
                      onClick={() => setActivePlatform((prev) => (prev < platforms.length - 1 ? prev + 1 : 0))}
                      className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <PlayCircle className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>

                {/* Decorative background logo/element */}
                <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12 scale-150">
                   {platforms[activePlatform].icon}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Content */}
          <div className="space-y-8">
            <span className="text-neon-green font-mono text-xs tracking-[0.3em] uppercase block">
              PLATFORMS
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Performance Across <br />
              <span className="relative inline-block">
                <span className="text-neon-green">Social Platforms</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 350 20" fill="none">
                  <path d="M5 15Q175 5 345 15" stroke="#87E65C" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-xl">
              As a global social media marketing agency, we adapt execution for Instagram, TikTok, YouTube, and LinkedIn, aligning formats, timing, and interaction styles with each platform.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Why Us Section - Redesigned */}
      <section className="py-24 px-6 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-purple-500 font-mono text-xs tracking-[0.3em] uppercase block">
              WHY US
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
              Why Businesses Partner With a <br />
              <span className="relative inline-block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                  Social Media Management Company
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 500 20" fill="none">
                  <path d="M5 15Q250 5 495 15" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Your audience is already active", desc: "As a Top Social Media Management Company, we place brands inside ongoing discovery using Instagram Reels and natural browsing behavior." },
              { title: "Trust grows through interaction", desc: "Social media influencer marketing and UGC help brands connect through authentic participation rather than promotional noise." },
              { title: "Platforms influence discovery", desc: "As an Instagram marketing agency and youtube marketing agency, we support visibility through formats such as YouTube Shorts." },
              { title: "Competition keeps rising", desc: "As a facebook marketing agency delivering paid social media advertising, we operate Facebook Ads Manager to compete effectively." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-neutral-900/40 border border-white/5 hover:border-purple-500/20 transition-all group flex gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section - Centered & Clean */}
      <section className="py-24 px-6 relative z-10 bg-black overflow-hidden border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12 text-center">
            <div className="space-y-4">
              <span className="text-neon-green font-mono text-xs tracking-[0.3em] uppercase block">
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Frequently Asked Questions <br />
                <span className="relative inline-block">
                  <span className="text-neon-green">(FAQs)</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 150 20" fill="none">
                    <path d="M5 15Q75 5 145 15" stroke="#87E65C" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`rounded-2xl border transition-all duration-300 ${openFaq === idx ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-neutral-800 bg-transparent hover:border-neutral-700'}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-6 flex items-center justify-between text-left group"
                  >
                    <span className={`text-sm md:text-base font-bold uppercase tracking-wider transition-colors ${openFaq === idx ? 'text-yellow-500' : 'text-neutral-400 group-hover:text-white'}`}>
                      {faq.q}
                    </span>
                    <Plus className={`w-5 h-5 transition-transform duration-300 ${openFaq === idx ? 'rotate-45 text-yellow-500' : 'text-neutral-500'}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-neutral-400 text-sm leading-relaxed border-t border-yellow-500/10 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Link to="/contact">
                <MagneticButton className="px-10 py-4 bg-neon-green text-black font-bold text-base rounded-full shadow-[0_10px_30px_rgba(135,230,92,0.2)] hover:scale-105 transition-all mx-auto">
                  Begin smarter growth
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto p-12 rounded-[4rem] bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-white/10 backdrop-blur-xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Ready to dominate <br />
            <span className="text-purple-400">every feed?</span>
          </h2>
          <Link to="/contact">
            <MagneticButton className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
               Launch Your Strategy <ArrowRight className="w-5 h-5" />
            </MagneticButton>
          </Link>
        </div>
      </section>
    </main>
  );
}
