import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const smmSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://webestone.com/services/social-media-marketing#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://webestone.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://webestone.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Social Media Marketing", "item": "https://webestone.com/services/social-media-marketing" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://webestone.com/services/social-media-marketing#service",
      "serviceType": "Social Media Marketing & Advertising",
      "name": "Social Media Marketing Agency Services",
      "description": "Expert social media marketing services including Meta Ads, Instagram growth, LinkedIn marketing, TikTok campaigns, and AI-driven audience targeting strategies.",
      "url": "https://webestone.com/services/social-media-marketing",
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
        "name": "Social Media Marketing Packages",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Facebook & Instagram Ads" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Content Creation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "LinkedIn Marketing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "TikTok Growth Strategy" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Community Management" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Influencer Marketing" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What social media platforms do you manage?",
          "acceptedAnswer": { "@type": "Answer", "text": "We manage Facebook, Instagram, LinkedIn, TikTok, YouTube, Twitter/X, and Pinterest. We build a tailored platform strategy based on where your audience spends time and where your industry has the highest engagement." }
        },
        {
          "@type": "Question",
          "name": "How do you measure social media marketing results?",
          "acceptedAnswer": { "@type": "Answer", "text": "We track reach, engagement rate, follower growth, click-through rate, cost per lead, ROAS, and conversions using Meta Business Suite, LinkedIn Analytics, and third-party tools like Hootsuite and Sprout Social." }
        },
        {
          "@type": "Question",
          "name": "How long until we see social media marketing results?",
          "acceptedAnswer": { "@type": "Answer", "text": "Paid social campaigns can deliver measurable results within 7-14 days. Organic social media growth typically shows consistent improvement within 2-3 months of consistent posting and community engagement." }
        },
        {
          "@type": "Question",
          "name": "Do you create content for social media?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. We produce graphics, short-form videos, reels, carousels, and copy tailored to each platform's best practices and your brand's visual identity." }
        }
      ]
    }
  ]
};

import { 
  Plus, 
  Share2, 
  Zap, 
  Target, 
  BarChart3, 
  MessageSquare, 
  Users, 
  Play,
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
  Twitter,
  Heart
} from "lucide-react";
import { MagneticButton } from "../components/ui/MagneticButton";
import SEO from "../components/SEO";
import { useContent } from "../context/ContentContext";
import AdminServiceImageEditor from "../components/admin/AdminServiceImageEditor";

const processSteps = [
  {
    title: "Insight Planning",
    desc: "As a data driven social media marketing agency, we analyze audience behavior, engagement patterns, and platform metrics to support smarter decisions aligned with business goals and measurable performance."
  },
  {
    title: "Strategic Mapping",
    desc: "We examine your positioning, goals, and competitors to build an Expert Social Media Strategy supported by social media audience targeting and disciplined audience segmentation for relevance."
  },
  {
    title: "Creative Production",
    desc: "Our team delivers Best social media content creation with Expert social media creatives design, producing visuals and messaging through Canva tailored for platform behavior."
  },
  {
    title: "Live Engagement Handling",
    desc: "We manage social media page management and social media campaign management through scheduled publishing, active community management, and continuous social listening."
  },
  {
    title: "Measurement Refinement",
    desc: "Social media analytics, conversion tracking, and performance reporting help refine campaigns continuously while supporting a performance-based social media marketing agency focused on measurable growth."
  }
];

const faqs = [
  {
    q: "What does social media management include?",
    a: "It covers planning, publishing, and refinement using social media optimization (SMO). This supports consistent organic reach while aligning content with platform signals."
  },
  {
    q: "How does automation improve results?",
    a: "An AI driven social media marketing agency adapts faster than manual workflows. Automation improves efficiency while strategy remains human guided."
  },
  {
    q: "Does automation replace creativity?",
    a: "An AI social media automation agency supports execution, not replacement. Creative direction and brand tone remain human led."
  },
  {
    q: "How are paid campaigns managed?",
    a: "A paid advertising social media agency controls testing, delivery, and spend. This structure improves learning speed while reducing waste."
  },
  {
    q: "Is competitor research included?",
    a: "A social media audit supported by competitor analysis reveals positioning gaps. Insights guide content direction and channel focus."
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
  const { serviceImages } = useContent();
  const videoId = serviceImages?.["social-media-marketing-agency_video"] || "MnLd2G198U8";
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activePlatform, setActivePlatform] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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
    <main className="relative min-h-screen text-white overflow-x-hidden bg-black">
      <AdminServiceImageEditor serviceId="social-media-marketing-agency" />
      <SEO 
        pageKey="social-media-marketing-agency"
        title="Social Media Marketing Agency | Social Media Advertising Experts" 
        description="Trusted Social Media Marketing Agency driving growth through AI-driven strategies, Meta Business Suite, LinkedIn Campaign Manager and high-performing paid campaigns." 
        schemaMarkup={smmSchema}
      />
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>
      </div>

      <section className="relative z-10 px-6 lg:px-20 pt-32 md:pt-36 lg:pt-40 pb-16 min-h-[calc(100vh-5rem)] flex items-center w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8 flex flex-col justify-center w-full order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-black uppercase tracking-[0.15em] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              SMM Platform
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight uppercase">
                <span className="text-neon-green">Social Media</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                  Marketing Agency
                </span>
              </h1>
            </div>

            <p className="text-base md:text-lg text-neutral-300 leading-relaxed max-w-xl font-medium">
              By combining strategy and creativity, Webestone operates as a Social Media Marketing Agency that converts social engagement into steady, measurable business growth across digital platforms worldwide.
            </p>

            <div className="font-mono text-xs md:text-sm text-pink-500 uppercase tracking-widest font-black">
              connection that builds real growth
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link to="/contact-us">
                <MagneticButton className="px-8 py-3.5 bg-neon-green text-black font-bold text-sm rounded-full shadow-[0_10px_30px_rgba(135,230,92,0.2)] hover:scale-105 transition-all">
                  Begin smarter growth
                </MagneticButton>
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Mockup / Illustration (Vertical Smartphone Frame) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center w-full order-1 lg:order-2"
          >
            {/* Background Glows for Depth */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-pink-500/10 blur-[80px] rounded-full"></div>
            <div className="absolute -z-10 top-1/3 right-1/4 w-[250px] h-[250px] bg-neon-green/10 blur-[80px] rounded-full"></div>

            {/* Smartphone Container */}
            <div className="relative w-[280px] h-[560px] bg-neutral-950 rounded-[3rem] p-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border-4 border-neutral-800 ring-1 ring-white/10 flex flex-col justify-between overflow-hidden group hover:border-neon-green/30 hover:ring-neon-green/20 transition-all duration-500">
              
              {/* Dynamic Island / Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-neutral-900 rounded-full z-30 flex items-center justify-between px-3 border border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-850 border border-white/5 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-500/80 animate-pulse"></div>
                </div>
                <div className="w-4 h-1 bg-neutral-850 rounded-full"></div>
              </div>

              {/* Screen Content Wrapper */}
              <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-neutral-900 border border-white/5 flex flex-col justify-between p-4">
                
                {/* Screen Video / Thumbnail Area */}
                <div className="absolute inset-0 z-0">
                  <AnimatePresence mode="wait">
                    {!isVideoPlaying ? (
                      <motion.div
                        key="thumb"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 cursor-pointer group/thumb"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        <img 
                          src={serviceImages["social-media-marketing-agency"] || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                          alt="Social Media Marketing Agency" 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-105" 
                        />
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                        
                        {/* Centered Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.15)] relative z-10"
                          >
                            <Play className="w-6 h-6 text-white fill-current ml-1" />
                          </motion.div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="video"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0"
                      >
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&loop=1`}
                          title="Social Media Marketing"
                          className="w-full h-full object-cover pointer-events-none"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        {/* Overlay to allow clicking to pause/stop */}
                        <div 
                          className="absolute inset-0 bg-transparent cursor-pointer"
                          onClick={() => setIsVideoPlaying(false)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Simulated Social Interface Overlay */}
                <div className="relative z-10 w-full flex justify-between items-center text-[10px] font-semibold text-white/50 pt-6">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] opacity-70">5G</span>
                    <div className="w-5 h-2.5 border border-white/20 rounded-sm p-0.5 flex items-center">
                      <div className="h-full w-3 bg-white rounded-2xs"></div>
                    </div>
                  </div>
                </div>

                {/* Bottom UI Layout */}
                <div className="relative z-10 w-full mt-auto space-y-3 pb-2">
                  {/* User info */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full border border-white/20 overflow-hidden bg-neutral-900 flex items-center justify-center">
                      <img src="/favicon.png" className="w-full h-full object-cover" alt="WeBestOne Icon" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white">@webestone</p>
                      <p className="text-[9px] text-neutral-400">Social Architects</p>
                    </div>
                  </div>

                  {/* Caption */}
                  <p className="text-[10px] text-neutral-200 leading-normal line-clamp-2">
                    How we turn viral engagement into high-paying conversions. 🚀🔥 #socialmediamarketing #growth
                  </p>

                  {/* Horizontal Bar Spacer */}
                  <div className="h-1 bg-white/20 rounded-full w-24 mx-auto mt-2"></div>
                </div>

              </div>
            </div>

            {/* Floating Engagement Card */}
            <motion.div 
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-16 -left-12 bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl z-20 shadow-2xl flex items-center gap-3 hidden sm:flex"
            >
              <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Engagement</p>
                <p className="text-sm font-black text-white">+280% Likes</p>
              </div>
            </motion.div>

            {/* Floating Reach Card */}
            <motion.div 
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-16 -right-12 bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl z-20 shadow-2xl flex items-center gap-3 hidden sm:flex"
            >
              <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center">
                <Share2 className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Reach</p>
                <p className="text-sm font-black text-white">1.2M+ Views</p>
              </div>
            </motion.div>

            {/* Decorative glows */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/5 blur-[100px] rounded-full"></div>
          </motion.div>
        </div>
      </section>


      {/* 2. Process Slider Section */}
      <section className="py-12 md:py-16 px-6 relative z-10 bg-[#050505]">
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
              <Link to="/contact-us">
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
          <Link to="/contact-us">
            <MagneticButton className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
               Launch Your Strategy <ArrowRight className="w-5 h-5" />
            </MagneticButton>
          </Link>
        </div>
      </section>
    </main>
  );
}
