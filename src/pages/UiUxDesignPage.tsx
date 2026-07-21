import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Awards from "../components/Awards";
import TestimonialSlider from "../components/TestimonialSlider";
import Counter from "../components/Counter";
import ProcessSection from "../components/ProcessSection";
import PortfolioSlider from "../components/PortfolioSlider";
import SEO from "../components/SEO";
import { useContent } from "../context/ContentContext";
import AdminServiceImageEditor from "../components/admin/AdminServiceImageEditor";
import {
  MonitorSmartphone,
  Figma,
  Component,
  Wand2,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  Users,
  BoxSelect,
  Sparkles,
  CheckCircle2,
  Building2,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Search,
  Code2,
  ShieldCheck
} from "lucide-react";

const uiUxSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://webestone.com/services/ui-ux-design#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://webestone.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://webestone.com/services" },
        { "@type": "ListItem", "position": 3, "name": "UI/UX Design Service", "item": "https://webestone.com/services/ui-ux-design" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://webestone.com/services/ui-ux-design#service",
      "serviceType": "UI/UX Design & Web Design",
      "name": "Custom UI/UX Design Services",
      "description": "Premium UI/UX design services including user research, wireframing, prototyping, usability testing, and conversion-focused interface design for web and mobile.",
      "url": "https://webestone.com/services/ui-ux-design",
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
        "name": "UI/UX Design Service Packages",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "User Research & UX Strategy" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wireframing & Prototyping" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web App UI Design" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App UI/UX Design" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Design System Creation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Usability Testing & CRO" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What tools do you use for UI/UX design?",
          "acceptedAnswer": { "@type": "Answer", "text": "Our designers work primarily in Figma for UI design and prototyping, supplemented by Adobe XD, Framer, Miro for UX mapping, and Maze for usability testing." }
        },
        {
          "@type": "Question",
          "name": "What is the difference between UI and UX design?",
          "acceptedAnswer": { "@type": "Answer", "text": "UI (User Interface) design focuses on the visual elements and layout users interact with. UX (User Experience) design focuses on the overall journey, usability, and how users feel while navigating a product." }
        },
        {
          "@type": "Question",
          "name": "How long does a UI/UX design project take?",
          "acceptedAnswer": { "@type": "Answer", "text": "A typical web or app UI/UX design project takes 3-8 weeks depending on scope. This includes discovery, wireframes, visual design, and prototyping phases." }
        },
        {
          "@type": "Question",
          "name": "Do you provide design handoff to developers?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. We deliver design files with developer handoff through Figma with complete specifications, component libraries, and documentation to ensure smooth implementation." }
        }
      ]
    }
  ]
};

/* ─── Data ─── */
const tools = [
  "Figma", "Sketch", "Adobe XD", "Framer", "Webflow", "Midjourney AI", "ChatGPT", "Miro", "InVision", "Protopie", "Zeplin", "Google Analytics"
];

const philosophy = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "01 Visibility defines who gets chosen",
    desc: "If your website is unclear, users leave instantly. Strong responsive design, information architecture, and accessibility ensure your message is understood without effort.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "02 Engagement decides who stays",
    desc: "Users do not explore. They decide quickly. Weak structure loses them. Strong user journeys, supported by user research and usability testing, keep them moving forward.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "03 Trust is built in seconds",
    desc: "Design signals trust before words do. Weak visual design creates doubt. Structured design builds confidence.",
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6" />,
    title: "04 Performance shapes every experience",
    desc: "If your website fails across devices, your growth fails with it. Consistent responsive design ensures stability everywhere.",
  }
];

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

const services = [
  {
    icon: <Component className="w-8 h-8 text-neon-green" />,
    title: "01 UI and UX design",
    desc: "We deliver custom UI UX solutions that remove confusion and guide action.",
    span: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-neon-green/10 to-black border-neon-green/20"
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6 text-neon-green" />,
    title: "02 Interface structure",
    desc: "We organize content using strong information architecture.",
    span: "md:col-span-1 bg-black border-white/10"
  },
  {
    icon: <Search className="w-6 h-6 text-neon-green" />,
    title: "03 Conversion pages",
    desc: "We build pages that reduce friction and increase decisions.",
    span: "md:col-span-1 bg-black border-white/10"
  },
  {
    icon: <ShoppingBag className="w-6 h-6 text-neon-green" />,
    title: "04 Ecommerce experience",
    desc: "Our ecommerce web design services simplify buying and reduce drop-offs.",
    span: "md:col-span-1 bg-black border-white/10"
  },
  {
    icon: <HeartPulse className="w-6 h-6 text-neon-green" />,
    title: "05 Mobile interaction design",
    desc: "We design for real behavior, not assumptions.",
    span: "md:col-span-1 bg-black border-white/10"
  },
  {
    icon: <Wand2 className="w-8 h-8 text-neon-green" />,
    title: "06 User movement planning",
    desc: "We map user journeys using interaction design principles.",
    span: "md:col-span-1 bg-black border-white/10"
  },
  {
    icon: <Building2 className="w-8 h-8 text-neon-green" />,
    title: "07 Advanced Solutions",
    desc: "We also deliver advanced custom web design service solutions for dashboards, platforms, and complex environments.",
    span: "md:col-span-1 md:col-start-1 md:col-end-4 bg-gradient-to-r from-neutral-900 to-black border-white/10"
  },
];

const stats = [
  { value: 400, suffix: "%", label: "Potential Conversion Lift", sub: "With optimized UX design" },
  { value: 88, suffix: "%", label: "Less Likely to Return", sub: "After a bad user experience" },
  { prefix: "$", value: 100, label: "Return on Investment", sub: "For every $1 invested in UX" },
  { value: 3, suffix: "x", label: "Faster Development", sub: "Using strict Design Systems" },
];

const industries = [
  { name: "SaaS & Tech", icon: <BoxSelect className="w-6 h-6 text-neon-green" />, desc: "Complex dashboards, B2B software, and AI interfaces designed for maximum productivity." },
  { name: "E-Commerce", icon: <ShoppingBag className="w-6 h-6 text-neon-green" />, desc: "High-converting shopping experiences that reduce cart abandonment and boost sales." },
  { name: "FinTech", icon: <Briefcase className="w-6 h-6 text-neon-green" />, desc: "Secure, trustworthy, and intuitive interfaces for banking, crypto, and financial tools." },
  { name: "Healthcare", icon: <HeartPulse className="w-6 h-6 text-neon-green" />, desc: "Accessible and clear UI for telemedicine, patient portals, and health tracking apps." },
  { name: "EdTech", icon: <GraduationCap className="w-6 h-6 text-neon-green" />, desc: "Engaging and distraction-free learning management systems and course platforms." },
  { name: "Real Estate", icon: <Building2 className="w-6 h-6 text-neon-green" />, desc: "Immersive property listings and seamless search experiences for buyers and agents." },
];

const faqs = [
  {
    q: "01 How much does a custom website project cost?",
    a: "Costs depend on structure and complexity. Every project is scoped based on actual requirements.",
  },
  {
    q: "02 How long does it take to design a website?",
    a: "Most projects are completed within a few weeks depending on size and scope.",
  },
  {
    q: "03 Do you provide custom UI UX solutions?",
    a: "Yes. Every project is built using custom UI UX solutions aligned with user behavior and business goals.",
  },
  {
    q: "04 Will my website be mobile friendly?",
    a: "Yes. Every build includes full responsive design support.",
  },
  {
    q: "05 Is your design SEO friendly?",
    a: "Yes. The structure supports speed, clarity, and modern search performance.",
  },
  {
    q: "06 Do you provide ecommerce web design services?",
    a: "Yes. Our ecommerce web design services are built to reduce friction and improve conversions.",
  },
  {
    q: "07 Do you offer ongoing support after launch?",
    a: "Yes. We continuously refine performance and user experience after launch.",
  },
];

const deliverables = [
  { title: "Full UI Audit", desc: "We analyze your current product for friction points and usability gaps before we start.", icon: <Search className="w-6 h-6 text-neon-green" /> },
  { title: "Weekly Syncs", desc: "Stay updated with live design reviews and collaborative Figma sessions every week.", icon: <Users className="w-6 h-6 text-neon-green" /> },
  { title: "Source Files", desc: "You get full ownership of the Figma source files, including the organized design system.", icon: <Figma className="w-6 h-6 text-neon-green" /> },
  { title: "Dev Handoff", desc: "Detailed documentation and redlines to make development a breeze for your engineers.", icon: <Code2 className="w-6 h-6 text-neon-green" /> },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      onClick={() => setOpen(!open)}
      className="border-b border-white/10 py-5 cursor-pointer group"
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-lg font-medium text-white group-hover:text-neon-green transition-colors">{q}</h4>
        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all ${open ? 'bg-neon-green border-neon-green text-black rotate-180' : 'text-neutral-400'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-neutral-400 leading-relaxed pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function UiUxDesignPage() {
  const { serviceImages } = useContent();
  const containerRef = useRef(null);
  
  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-neon-green/30">
      <AdminServiceImageEditor serviceId="web-design-service" />
      <SEO 
        pageKey="web-design-service"
        title="Web Design Service | Custom UI UX Design service Agency" 
        description="Expert Web Design Service offering Custom UI UX Solutions, UX Strategy and Usability Testing to ensure high-performing results from our Web Design Agency." 
        schemaMarkup={uiUxSchema}
      />
      
      {/* Background Ambient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-neon-green/5 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-neon-green/5 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>
      
      {/* ══════════════════════════════════════════
          SECTION 1: HERO
      ══════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex items-center pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-4 md:space-y-5 relative z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/10 text-neon-green text-xs font-semibold tracking-wide backdrop-blur-md uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Award-Winning UI/UX Agency
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-black leading-[1.15] tracking-tight"
            >
              Web Design Service That <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-[#63b93a] block mt-1">
                Controls How Users Think, Move, and Act.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-2.5"
            >
              <h2 className="text-base md:text-lg font-semibold text-white">Modern websites shaped with intention and precision</h2>
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-lg">
                This is not a typical web design service. Most websites are built to look good. <span className="text-white font-semibold">Very few are built to work.</span>
              </p>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-lg">
                At WebestOne, design is not decoration. It is control. As a custom UI UX design agency, we design experiences that shape how users see, understand, and decide without confusion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link to="/contact-us" className="px-8 py-4 bg-[#87E65C] text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_40px_rgba(135,230,92,0.25)]">
                Start Design Project <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="#portfolio" className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors">
                View Prototypes
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative h-[500px] w-full perspective-1000 flex items-center justify-center"
          >
            {serviceImages["web-design-service"] ? (
              <img
                src={serviceImages["web-design-service"]}
                alt="UI/UX Web Design Service"
                className="w-full h-auto max-h-full object-contain rounded-3xl border border-white/20 shadow-[0_0_80px_rgba(135,230,92,0.15)] z-20"
              />
            ) : (
              <>
                 <motion.div 
                   animate={{ rotateY: [-5, 5, -5], rotateX: [5, -5, 5] }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_80px_rgba(135,230,92,0.15)] flex flex-col overflow-hidden transform-gpu"
                 >
                    <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.01]">
                       <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-rose-500" />
                          <div className="w-3 h-3 rounded-full bg-amber-500" />
                          <div className="w-3 h-3 rounded-full bg-emerald-500" />
                       </div>
                       <div className="flex gap-4">
                          <div className="h-2 w-12 rounded bg-white/20" />
                          <div className="h-2 w-12 rounded bg-white/20" />
                       </div>
                    </div>
                    <div className="flex-1 p-8 flex gap-6">
                       <div className="w-1/3 flex flex-col gap-4">
                          <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-neon-green/10 to-neon-green/20 border border-white/10" />
                          <div className="h-4 w-3/4 rounded bg-white/10" />
                          <div className="h-2 w-1/2 rounded bg-white/5" />
                       </div>
                       <div className="flex-1 flex flex-col gap-4">
                          <div className="h-32 w-full rounded-2xl bg-white/5 border border-white/10" />
                          <div className="flex gap-4">
                            <div className="h-20 flex-1 rounded-xl bg-white/5" />
                            <div className="h-20 flex-1 rounded-xl bg-white/5" />
                          </div>
                          <div className="mt-auto h-10 w-full rounded-full bg-gradient-to-r from-neon-green to-[#63b93a]" />
                       </div>
                    </div>
                 </motion.div>

                 <motion.div 
                   animate={{ x: [0, 150, 50, 0], y: [0, -50, 100, 0] }}
                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-1/2 left-1/4 z-30 pointer-events-none"
                 >
                    <div className="w-6 h-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black border-2 border-white transform rotate-[-20deg] shadow-lg" />
                    <div className="ml-4 px-3 py-1 bg-neon-green text-black text-[10px] font-bold rounded-full shadow-xl">
                      Designing...
                    </div>
                 </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Trust: Awards & Certifications */}
      <Awards />

      {/* ══════════════════════════════════════════
          SECTION 2: MODERN TOOLS MARQUEE
      ══════════════════════════════════════════ */}
      <section className="py-10 border-y border-white/5 bg-white/[0.01] overflow-hidden relative z-10 flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20" />
        
        <div className="flex w-max items-center gap-10 md:gap-20 whitespace-nowrap px-10 animate-marquee text-neutral-500 font-bold text-xl md:text-3xl tracking-widest uppercase hover:[animation-play-state:paused]">
          {[...tools, ...tools].map((tool, i) => (
            <span key={i} className="hover:text-neon-green transition-colors cursor-default">{tool}</span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3: CORE PHILOSOPHY
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why professional <span className="text-neon-green">web design matters</span></h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">Everything is intentional. Every click, every section, every flow. Structure that aligns with real user behavior.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {philosophy.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-neutral-900/40 border border-white/5 text-center group hover:bg-neutral-900 hover:border-neon-green/30 transition-all"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-neon-green mb-6 group-hover:scale-110 group-hover:bg-neon-green/10 transition-all">
                  {p.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{p.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4: SERVICES BENTO
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our web design <br /><span className="text-neon-green">services.</span></h2>
            <p className="text-neutral-400 max-w-lg mt-4">Design is not what users see. It is what they do next.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
            {services.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-3xl border overflow-hidden group ${item.span}`}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500" />
                
                {i === 0 && (
                  <div className="absolute top-10 right-10 w-48 h-48 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="w-full h-12 bg-neon-green/20 rounded border border-neon-green/40" />
                      <div className="w-full h-12 bg-neon-green/20 rounded border border-neon-green/40" />
                      <div className="col-span-2 h-8 bg-neon-green/20 rounded border border-neon-green/40" />
                      <div className="col-span-2 h-16 bg-white/10 rounded border border-white/20 flex items-center justify-center">
                         <span className="text-xs text-white/50 font-mono">Component_Button</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5: WHY DESIGN MATTERS (ROI)
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-16"
          >
            The True Value of <span className="text-neon-green">Great Design</span>
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-neon-green to-[#63b93a] mb-4">
                  <Counter 
                    value={stat.value} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                  />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{stat.label}</h4>
                <p className="text-xs text-neutral-500 uppercase tracking-widest">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      {/* ══════════════════════════════════════════
          SECTION 7: DESIGN SYSTEMS SHOWCASE
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Scalable <br /><span className="text-neon-green">Design Systems</span></h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              We don't just design pages; we build exhaustive component libraries. Colors, typography, spacing tokens, and atomic components all meticulously organized in Figma.
            </p>
            <ul className="space-y-4 mb-8">
              {["Atomic Design Principles", "Auto-Layout Mastery", "Interactive Variants", "Developer-Ready Tokens"].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                  className="flex items-center gap-3 text-neutral-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-neon-green" /> {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square w-full max-w-md mx-auto"
          >
             <div className="absolute inset-0 bg-neon-green/10 rounded-full blur-[80px]" />
             <div className="relative z-10 h-full w-full bg-neutral-900 border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
                <div className="h-6 w-32 bg-white/10 rounded mb-4" />
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-neon-green" />
                  <div className="w-12 h-12 rounded-full bg-emerald-600" />
                  <div className="w-12 h-12 rounded-full bg-white" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                   <div className="px-4 py-2 rounded-lg bg-neon-green text-black text-center text-sm font-medium">Primary Button</div>
                   <div className="px-4 py-2 rounded-lg border border-white/20 text-white text-center text-sm font-medium">Secondary</div>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-black border border-white/5 space-y-3">
                   <div className="h-2 w-full bg-white/10 rounded" />
                   <div className="h-2 w-3/4 bg-white/10 rounded" />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT YOU GET: HIGH VALUE DELIVERABLES
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              What You <span className="text-neon-green">Actually Get</span>
            </motion.h2>
            <p className="text-neutral-400">We go beyond just 'screens'. We provide the full infrastructure for your product's success.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-neon-green/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PortfolioSlider />

      {/* ══════════════════════════════════════════
          INDUSTRIES WE SERVE
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Industries <span className="text-neon-green">We Serve</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-neutral-400 max-w-2xl mx-auto"
            >
              From ambitious startups to enterprise giants, we design interfaces tailored to specific business goals and industry standards.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-neutral-900/40 border border-white/5 group hover:bg-neutral-900 hover:border-neon-green/30 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-neon-green/10 transition-all">
                  {ind.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{ind.name}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm md:text-base">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSlider />

      {/* ══════════════════════════════════════════
          SATISFACTION & TRUST BANNER
      ══════════════════════════════════════════ */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-r from-neon-green/5 via-[#63b93a]/5 to-black border border-white/10 p-10 md:p-16 text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
           >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-neon-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Satisfaction Guarantee</h2>
              <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-8">
                We don't stop until you're 100% satisfied. We offer unlimited revisions during the initial design phase and a dedicated project manager for seamless communication.
              </p>
              <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                <div className="flex items-center gap-2 text-white font-medium text-sm md:text-base">
                  <CheckCircle2 className="w-5 h-5 text-neon-green" /> 100% Satisfaction
                </div>
                <div className="flex items-center gap-2 text-white font-medium text-sm md:text-base">
                  <CheckCircle2 className="w-5 h-5 text-neon-green" /> Transparent Pricing
                </div>
                <div className="flex items-center gap-2 text-white font-medium text-sm md:text-base">
                  <CheckCircle2 className="w-5 h-5 text-neon-green" /> 24/7 Support
                </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 10: FAQS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Design <span className="text-neutral-500">FAQs</span></h2>
        <div className="border-t border-white/10">
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 11: CTA
      ══════════════════════════════════════════ */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/5 py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#87E65C]/20 bg-[#87E65C]/10 text-[#87E65C] text-sm font-medium mb-8">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Ready to Start?
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            We move with speed.<br className="hidden md:block" />
            <span className="text-[#87E65C]">Your business keeps up.</span>
          </h2>
          
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Slow execution costs visibility, leads, and growth. As a performance-focused partner, we build structured websites designed to perform from day one.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
            {["Unlimited revisions", "Dedicated manager", "Clear timelines", "Transparent communication"].map(feature => (
              <div key={feature} className="flex items-center gap-2 text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#87E65C]" />
                {feature}
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <Link 
              to="/contact-us" 
              className="w-full sm:w-auto px-8 py-4 bg-[#87E65C] text-black font-bold rounded-full hover:bg-[#87E65C]/90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(135,230,92,0.25)] flex items-center justify-center gap-2"
            >
              Request a Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact-us" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all flex items-center justify-center"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
