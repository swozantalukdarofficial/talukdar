import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, animate, useMotionValue, useSpring, useTransform } from "framer-motion";
import SEO from "../components/SEO";
import {
  Code2,
  Globe,
  TrendingUp,
  Smartphone,
  CheckCircle2,
  Search,
  Users,
  Zap,
  ShieldCheck,
  ArrowRight,
  ShoppingCart,
  LayoutTemplate,
  Wrench,
  Server,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Eye,
  MousePointerClick,
  Award,
  Star,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";


/* ─── Animated Counter Component ─── */
interface AnimatedCounterProps {
  value: string;
  duration?: number;
}


/* ─── 3D Ambient Tilt Card Component ─── */
function Card3D({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 150 });
  
  const scale = useSpring(1, { damping: 20, stiffness: 150 });
  const shineX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    let animationFrameId: number;
    const startTime = Date.now();

    const animateFloat = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const angle = elapsed * 0.8; // Slow rotation speed
      x.set(Math.cos(angle) * 0.15);
      y.set(Math.sin(angle * 1.5) * 0.15);
      
      animationFrameId = requestAnimationFrame(animateFloat);
    };

    animateFloat();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, x, y]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.04);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="relative w-full h-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative z-10 transition-shadow duration-300 rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)]"
      >
        {/* Shine Overlay */}
        <motion.div
          style={{
            background: `radial-gradient(circle 250px at ${shineX} ${shineY}, rgba(255,255,255,0.06), transparent)`,
          }}
          className="absolute inset-0 z-20 pointer-events-none"
        />
        
        {/* Inner Content (parallax depth) */}
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function AnimatedCounter({ value, duration = 2.5 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    // Matches values like "<1.5s", "99.9%", "100+", "45%", "100/100"
    const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
    if (!match) {
      if (ref.current) ref.current.textContent = value;
      return;
    }

    const prefix = match[1] || "";
    const targetNumber = parseFloat(match[2]);
    const suffix = match[3] || "";
    const isDecimal = match[2].includes(".");

    const controls = animate(0, targetNumber, {
      duration: duration,
      ease: "easeOut",
      onUpdate(latest) {
        if (ref.current) {
          const formatted = isDecimal ? latest.toFixed(1) : Math.round(latest).toString();
          ref.current.textContent = `${prefix}${formatted}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [inView, value, duration]);

  return <span ref={ref}>{value}</span>;
}

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ─── Data ─── */
const whyChoose = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Eliminate Manual Processes",
    desc: "Most businesses lose time in places they do not see. We automate manual processes to save valuable time and eliminate human errors.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Connect Disconnected Tools",
    desc: "Stop jumping between tabs. We unify your disconnected tools into a single source of truth for your entire operations.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fix Workflows Under Pressure",
    desc: "Workflows that break under pressure become extremely expensive. We build systems that perform flawlessly at peak scales.",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Custom CMS Development",
    desc: "As a custom CMS development agency, we build structured systems that align with your exact workflows, not against them.",
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Custom E-commerce Systems",
    desc: "From advanced online storefronts to complex backend integrations, everything is designed for conversion and performance.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Scalable Infrastructure",
    desc: "We build systems designed to support how your business runs, scales, and adapts, eliminating your technical growth ceiling.",
  },
];

const services = [
  {
    icon: <Globe className="w-7 h-7" />,
    title: "Custom WordPress Development",
    desc: "Bespoke, highly customizable WordPress websites built from scratch, offering full control and scalability.",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
  },
  {
    icon: <ShoppingCart className="w-7 h-7" />,
    title: "WooCommerce & E-Commerce",
    desc: "High-converting online stores with secure payment gateways, inventory management, and seamless checkout flows.",
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
  },
  {
    icon: <LayoutTemplate className="w-7 h-7" />,
    title: "UI/UX & Landing Page Design",
    desc: "Data-driven, aesthetically pleasing landing pages designed specifically to maximize your conversion rates.",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Website Redesign",
    desc: "Transform your outdated website into a modern, fast, and lead-generating machine without losing SEO juice.",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
  },
  {
    icon: <Code2 className="w-7 h-7" />,
    title: "Custom Web Applications",
    desc: "Complex, scalable web apps built with modern frameworks (React, Next.js) for specialized business logic.",
    color: "from-indigo-500/20 to-violet-500/20",
    border: "border-indigo-500/30",
  },
  {
    icon: <Server className="w-7 h-7" />,
    title: "Maintenance & Security",
    desc: "Ongoing support, security monitoring, plugin updates, and performance tuning to keep your site running smoothly.",
    color: "from-rose-500/20 to-pink-500/20",
    border: "border-rose-500/30",
  },
];

const industries = [
  "Technology & SaaS",
  "E-Commerce & Retail",
  "Healthcare & Clinics",
  "Corporate & B2B",
  "Education & EdTech",
  "Real Estate",
  "Travel & Hospitality",
  "Agencies & Consultants",
  "Legal & Financial",
  "Food & Restaurants",
  "Automotive",
  "Non-Profit & NGO",
];

const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We analyze your business goals, target audience, and competitors to define the perfect technical stack and sitemap.",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/30",
  },
  {
    num: "02",
    title: "UI/UX Prototyping",
    desc: "We create wireframes and high-fidelity mockups, giving you a visual representation of the website before coding begins.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/30",
  },
  {
    num: "03",
    title: "Development & Coding",
    desc: "Our developers bring the designs to life using clean, semantic, and highly optimized code, ensuring cross-browser compatibility.",
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/30",
  },
  {
    num: "04",
    title: "Testing & QA",
    desc: "Rigorous testing across devices, speed optimization, security checks, and SEO audits are performed to ensure flawlessness.",
    color: "text-pink-400",
    bg: "bg-pink-400/10 border-pink-400/30",
  },
  {
    num: "05",
    title: "Launch & Training",
    desc: "We deploy the website to your live server, connect analytics, and provide training on how to manage your new content system.",
    color: "text-neon-green",
    bg: "bg-neon-green/10 border-neon-green/30",
  },
];

const portfolio = [
  {
    type: "E-Commerce Platform",
    client: "StyleHub BD",
    title: "High-Volume WooCommerce Store",
    preview:
      "A blazing fast custom WooCommerce build handling 10k+ daily visitors with a custom inventory sync and checkout flow.",
    tag: "Retail",
    color: "border-blue-500/30 bg-blue-500/5",
    tagColor: "bg-blue-500/20 text-blue-400",
  },
  {
    type: "Corporate Website",
    client: "NextGen Tech",
    title: "B2B SaaS Corporate Presence",
    preview:
      "A sleek, highly animated React/Next.js corporate site that increased lead generation by 65% through optimized funnels.",
    tag: "Technology",
    color: "border-purple-500/30 bg-purple-500/5",
    tagColor: "bg-purple-500/20 text-purple-400",
  },
  {
    type: "Web Application",
    client: "MedSync",
    title: "Patient Booking & Management Portal",
    preview:
      "A secure, HIPAA-compliant custom portal for booking appointments, managing records, and processing payments securely.",
    tag: "Healthcare",
    color: "border-emerald-500/30 bg-emerald-500/5",
    tagColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    type: "Website Redesign",
    client: "Elite Estates",
    title: "Real Estate Property Listing Site",
    preview:
      "Complete overhaul of an outdated property site into a modern, searchable platform with interactive maps and fast loading times.",
    tag: "Real Estate",
    color: "border-orange-500/30 bg-orange-500/5",
    tagColor: "bg-orange-500/20 text-orange-400",
  },
];

const metrics = [
  { icon: <Zap className="w-8 h-8" />, value: "<1.5s", label: "Average Page Load Time", color: "text-neon-green" },
  { icon: <ShieldCheck className="w-8 h-8" />, value: "99.9%", label: "Uptime Guarantee", color: "text-cyan-400" },
  { icon: <Globe className="w-8 h-8" />, value: "100+", label: "Websites Launched", color: "text-blue-400" },
  { icon: <TrendingUp className="w-8 h-8" />, value: "45%", label: "Average Conversion Increase", color: "text-purple-400" },
  { icon: <Award className="w-8 h-8" />, value: "100/100", label: "Google PageSpeed Scores", color: "text-pink-400" },
  { icon: <Users className="w-8 h-8" />, value: "50+", label: "Happy Enterprise Clients", color: "text-orange-400" },
];

const testimonials = [
  {
    quote:
      "WeBestOne didn't just build a website; they built a digital engine for our business. The new site is incredibly fast, looks stunning, and our online sales have doubled since the launch.",
    name: "Tariq Mahmud",
    role: "Founder, StyleHub BD",
    rating: 5,
  },
  {
    quote:
      "Their understanding of UI/UX and technical architecture is unmatched. They transformed our complex requirements into a seamless, user-friendly web application that our clients love.",
    name: "Sarah Ahmed",
    role: "Product Manager, NextGen Tech",
    rating: 5,
  },
  {
    quote:
      "We had an outdated site that was hurting our SEO. WeBestOne rebuilt it from scratch, keeping all our SEO juice intact while drastically improving the design and speed. Highly recommended.",
    name: "Kamrul Islam",
    role: "CEO, Elite Estates",
    rating: 5,
  },
];

const whatWeBuild = [
  {
    num: "01",
    title: "Crafting your unique platform",
    desc: "Your business is not standard. Your system should not be either. We build using HTML5, CSS3, JavaScript, and modern frameworks like React, Angular, and Vue.js to create scalable, structured platforms. This is where design meets functionality.",
  },
  {
    num: "02",
    title: "Connecting everything into one system",
    desc: "Disconnected tools slow everything down. We integrate custom APIs, CRMs, and payment gateways so your operations work as one system, not separate parts.",
  },
  {
    num: "03",
    title: "Building for scale from the start",
    desc: "Growth breaks weak systems. We develop using Node.js, PHP, Laravel, and MySQL, supported by Cloudflare, optimized hosting environments, and secure infrastructure with SSL certificates. This is built to handle growth before it happens.",
  },
];

const faqs = [
  {
    q: "How much do custom web development services cost?",
    a: "The cost depends on integrations, features, and system complexity. We provide a clear estimate based on your exact requirements.",
  },
  {
    q: "How long do custom web development services take?",
    a: "Most projects take between four to twelve weeks depending on scope and complexity.",
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Yes. We provide maintenance, updates, and continuous system improvements.",
  },
  {
    q: "What technologies do you use?",
    a: "We use HTML5, CSS3, JavaScript, React, Node.js, PHP, and MySQL, along with modern frameworks depending on project needs.",
  },
  {
    q: "Do you provide Shopify web development services and ecommerce platforms?",
    a: "Yes. We provide Shopify web development services along with custom ecommerce systems using WooCommerce and Magento, depending on your business model and scalability needs.",
  },
  {
    q: "Do you offer React web development services?",
    a: "Yes. We provide React web development services for scalable and high-performance applications.",
  },
  {
    q: "Can you rebuild an existing system?",
    a: "Yes. We restructure and rebuild systems that are limiting growth or performance.",
  },
];

/* ─── FAQ Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      onClick={() => setOpen((v) => !v)}
      className="border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-blue-500/30 transition-colors duration-300 bg-white/[0.02]"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-semibold text-white text-sm md:text-base">{q}</p>
        {open ? (
          <ChevronUp className="w-5 h-5 text-blue-400 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="mt-3 text-neutral-400 text-sm leading-relaxed overflow-hidden"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const customWebDevSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://webestone.com/services/web-development#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://webestone.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://webestone.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Custom Web Development",
          "item": "https://webestone.com/services/web-development"
        }
      ]
    },
    {
      "@type": "Service",
      "serviceType": "Custom Web Development Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "WeBestOne",
        "url": "https://webestone.com",
        "logo": "https://webestone.com/favicon.png"
      },
      "areaServed": "BD",
      "description": "High-performance custom web development services specializing in React, Node.js, PHP, Laravel, Shopify, and MySQL to scale digital presence."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much do custom web development services cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The cost depends on integrations, features, and system complexity. We provide a clear estimate based on your exact requirements."
          }
        },
        {
          "@type": "Question",
          "name": "How long do custom web development services take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most projects take between four to twelve weeks depending on scope and complexity."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide ongoing support after launch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide maintenance, updates, and continuous system improvements."
          }
        },
        {
          "@type": "Question",
          "name": "What technologies do you use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use HTML5, CSS3, JavaScript, React, Node.js, PHP, and MySQL, along with modern frameworks depending on project needs."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide Shopify web development services and ecommerce platforms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide Shopify web development services along with custom ecommerce systems using WooCommerce and Magento, depending on your business model and scalability needs."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer React web development services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide React web development services for scalable and high-performance applications."
          }
        },
        {
          "@type": "Question",
          "name": "Can you rebuild an existing system?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We restructure and rebuild systems that are limiting growth or performance."
          }
        }
      ]
    }
  ]
};

/* ─── Page ─── */
export default function WordpressDevelopmentPage() {
  return (
    <main className="relative min-h-screen text-white bg-black overflow-hidden">
      <SEO 
        title="Custom Web Development Services | Expert CMS Web Development" 
        description="Expert Custom web development services provide best Custom website solutions and specialize in Magento, Laravel, Shopify and React to scale your digital presence" 
        schemaMarkup={customWebDevSchema}
      />
      {/* Global background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
      </div>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="space-y-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 text-xs font-semibold tracking-wider uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              High-Performance Web Solutions
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-black leading-[1.15] tracking-tight"
            >
              <span className="text-blue-400 font-semibold text-sm md:text-base block mb-2 tracking-[0.15em] uppercase">
                Custom Web Development Services
              </span>
              Build Systems Your Business Can{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent block mt-1">
                Actually Scale On
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {/* Highlighted H2 Quote block */}
              <div className="relative pl-4 border-l-2 border-blue-500/80 py-1.5 my-3 bg-gradient-to-r from-blue-500/[0.03] to-transparent rounded-r-xl">
                <h2 className="text-base md:text-lg font-bold text-white/95 leading-relaxed">
                  "If your systems are slowing you down, it is not your effort. <span className="text-blue-400">It is your setup."</span>
                </h2>
              </div>

              {/* Lead Paragraph */}
              <p className="text-neutral-400 text-sm md:text-[0.95rem] leading-relaxed">
                Most businesses do not hit a growth ceiling because of marketing. 
                They hit it because <span className="text-white font-medium">their systems cannot keep up</span>. 
                That is where custom web development services change everything.
              </p>

              {/* High-End Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-blue-500/20 hover:bg-blue-500/[0.01] transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1.5 text-blue-400 font-bold text-xs uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                    Operational Systems
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed font-medium">
                    We do not build simple pages. We build operational systems that support how your business runs, scales, and adapts.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-cyan-500/20 hover:bg-cyan-500/[0.01] transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1.5 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                    Controlled Infrastructure
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed font-medium">
                    This is not a template. This is robust infrastructure designed to remove friction and create momentum.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-500 text-white font-bold rounded-full shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_40px_rgba(59,130,246,0.55)] hover:scale-105 transition-all duration-300 text-sm"
              >
                Discuss Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-neutral-300 font-medium hover:border-white/30 hover:text-white transition-all duration-300 text-sm"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-5 pt-1"
            >
              {["100+ Sites Launched", "React & WP Experts", "99.9% Uptime", "SEO-Ready"].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-neutral-500 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  {b}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Floating Cards & Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative h-[400px] lg:h-[500px] flex items-center justify-center w-full mt-10 lg:mt-0"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Main Center Image */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <img 
                src="/web_dev_hero.png" 
                alt="Web Development Mockup" 
                className="w-[90%] md:w-[80%] lg:w-full h-auto max-h-full object-contain mix-blend-lighten opacity-90 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-[pulse_6s_ease-in-out_infinite]" 
              />
            </div>

            {/* ── Card 1: Performance Score ── */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[5%] left-0 sm:-left-4 md:-left-8 w-[200px] sm:w-[240px] p-3 sm:p-4 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold">Performance Score</p>
                  <p className="text-green-400 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase">Lightning Fast</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-1 sm:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "99%" }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-neutral-500 text-[9px] sm:text-[10px]">Google PageSpeed</span>
                <span className="text-green-400 text-[9px] sm:text-[10px] font-mono">99/100</span>
              </div>
            </motion.div>

            {/* ── Card 2: Uptime Security ── */}
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[5%] right-0 sm:-right-4 md:-right-8 w-[200px] sm:w-[240px] p-3 sm:p-4 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold">Server Uptime</p>
                  <p className="text-blue-400 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase">Secure & Stable</p>
                </div>
              </div>
              <div className="h-1 sm:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "99.9%" }}
                  transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-neutral-500 text-[9px] sm:text-[10px]">Annual Uptime</span>
                <span className="text-blue-400 text-[9px] sm:text-[10px] font-mono">99.99%</span>
              </div>
            </motion.div>

            {/* ── Card 3: Conversion Rate (small) ── */}
            <motion.div
              animate={{ y: [-5, 10, -5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[40%] right-[-5%] md:-right-6 w-[160px] sm:w-[180px] p-3 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 hidden sm:block"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-purple-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Conversions</p>
                  <p className="text-purple-400 text-[8px] font-bold tracking-widest uppercase">Growing</p>
                </div>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-neutral-500 text-[9px]">Sales Lift</span>
                <span className="text-purple-400 text-[9px] font-mono">+45%</span>
              </div>
            </motion.div>

            {/* ── Floating icon badges ── */}
            <motion.div
              animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] right-[20%] w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)] z-10"
            >
              <Code2 className="w-5 h-5 text-cyan-400" />
            </motion.div>

            <motion.div
              animate={{ x: [0, -6, 0], y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[15%] left-[20%] w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center z-10"
            >
              <LayoutTemplate className="w-4 h-4 text-blue-500" />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. WHY CHOOSE WEBESTIONE
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-blue-500/60" />
              <span className="text-blue-500 font-mono text-xs tracking-[0.25em] uppercase">Why Choose Us</span>
              <span className="w-8 h-[1px] bg-blue-500/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Your business deserves{" "}
              <span className="text-blue-500">more than a basic setup</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-base leading-relaxed">
              Most businesses lose time in places they do not see: manual processes, disconnected tools, and workflows that break under pressure. Over time, that becomes expensive. Our website development services for businesses are designed to fix that at the root.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyChoose.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-blue-500/30 hover:bg-blue-500/[0.03] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3.5 WHAT WE ACTUALLY BUILD
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 bg-neutral-950/40 border-t border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-emerald-400/60" />
              <span className="text-emerald-400 font-mono text-xs tracking-[0.25em] uppercase">Architecture</span>
              <span className="w-8 h-[1px] bg-emerald-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              What we <span className="text-emerald-400">actually build</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatWeBuild.map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-emerald-500/20 hover:bg-emerald-500/[0.01] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg">
                    {item.num}
                  </div>
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. CORE SERVICES
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-cyan-400/60" />
              <span className="text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase">Our Capabilities</span>
              <span className="w-8 h-[1px] bg-cyan-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Comprehensive Web{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Development Solutions</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`p-6 rounded-2xl border ${s.border} bg-gradient-to-br ${s.color} hover:scale-[1.02] transition-all duration-300 group`}
              >
                <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. INDUSTRIES & SCALABILITY
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-6"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-purple-400/60" />
              <span className="text-purple-400 font-mono text-xs tracking-[0.25em] uppercase">Why Custom Changes Everything</span>
              <span className="w-8 h-[1px] bg-purple-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              There comes a point where your <br />
              <span className="text-purple-400">tools stop supporting your growth</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 text-neutral-300 text-sm md:text-base leading-relaxed mb-10">
              <p>
                That is not a signal to push harder. <span className="text-white font-semibold">That is a signal to rebuild properly.</span>
              </p>
              <p>
                With custom web development services, your business stops adjusting to software. 
                Your system starts working the way it should.
              </p>
              <p className="text-purple-400 font-medium">
                This is how businesses move from operational to scalable.
              </p>
            </div>
            <div className="w-full h-[1px] bg-white/5 my-8" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-8">
              Platforms Built For <span className="text-purple-400">Your Specific Market</span>
            </h3>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm">
              Our development team creates highly specialized technical solutions tailored to industry-specific demands.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center gap-2 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-purple-400/30 hover:bg-purple-400/[0.04] transition-all duration-300 group"
              >
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-neutral-300 text-sm font-medium">{ind}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. OUR PROCESS
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16 space-y-6"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-pink-400/60" />
              <span className="text-pink-400 font-mono text-xs tracking-[0.25em] uppercase">Agile Workflow</span>
              <span className="w-8 h-[1px] bg-pink-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              How we <span className="text-pink-400">build it</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto text-left mb-12">
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5">
                <h3 className="text-pink-400 font-bold text-base mb-2">01 Discovery and planning</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  We break down your workflows, identify bottlenecks, and define system architecture before anything is built.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5">
                <h3 className="text-pink-400 font-bold text-base mb-2">02 Design and development</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  We design using Figma and Adobe XD, then develop using scalable technologies. All builds are version controlled using Git and GitHub, tested using Google Lighthouse, and follow web accessibility standards.
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/5 my-8" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-4">
              Our <span className="text-pink-400">5-Step Development</span> Lifecycle
            </h3>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm">
              A transparent, agile process ensuring on-time delivery and pixel-perfect execution of your vision.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-400 via-cyan-400 via-purple-400 via-pink-400 to-neon-green opacity-30 hidden sm:block" />

            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Number bubble */}
                  <div className={`shrink-0 w-14 h-14 rounded-2xl border ${step.bg} flex items-center justify-center font-mono font-bold text-lg ${step.color} z-10 relative`}>
                    {step.num}
                  </div>
                  {/* Content */}
                  <div className={`flex-1 p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-colors duration-300 ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                    <h3 className={`text-white font-bold text-lg mb-2 ${step.color}`}>{step.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. CUSTOM SOLUTIONS BUILT FOR REAL USE
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-cyan-400/60" />
              <span className="text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase">Featured Work</span>
              <span className="w-8 h-[1px] bg-cyan-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Custom solutions <span className="text-cyan-400">built for real use</span>
            </h2>
            <div className="max-w-3xl mx-auto text-neutral-400 text-sm md:text-base leading-relaxed space-y-3">
              <p>
                At WebestOne, we work with businesses that have already outgrown basic solutions. We build what is missing. Everything is built for actual usage, not surface-level presentation.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono text-neutral-500">
                <span className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.01]">Custom ecommerce using WooCommerce, Shopify, Magento</span>
                <span className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.01]">SEO-ready using Analytics, Lighthouse & SEO Tools</span>
                <span className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.01]">Scalable architectures tested for real user behavior</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {portfolio.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`p-6 rounded-2xl border ${p.color} hover:scale-[1.01] transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.tagColor}`}>{p.type}</span>
                  <span className="text-xs text-neutral-500 border border-white/10 px-3 py-1 rounded-full">{p.tag}</span>
                </div>
                <p className="text-neutral-400 text-xs font-mono mb-2">CLIENT: {p.client}</p>
                <h3 className="text-white font-bold text-lg mb-3 leading-snug">{p.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{p.preview}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-cyan-400/40 text-cyan-400 font-semibold hover:bg-cyan-400/10 transition-all duration-300"
            >
              View Full Tech Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. RESULTS / METRICS
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-blue-500/60" />
              <span className="text-blue-500 font-mono text-xs tracking-[0.25em] uppercase">By The Numbers</span>
              <span className="w-8 h-[1px] bg-blue-500/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Metrics That <span className="text-blue-500">Matter</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl border border-white/5 bg-white/[0.01]"
              >
                <div className={`p-3 rounded-xl bg-white/5 ${m.color}`}>{m.icon}</div>
                <h4 className={`text-4xl font-black ${m.color}`}><AnimatedCounter value={m.value} /></h4>
                <p className="text-neutral-400 text-sm font-medium">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-purple-400/60" />
              <span className="text-purple-400 font-mono text-xs tracking-[0.25em] uppercase">Client Love</span>
              <span className="w-8 h-[1px] bg-purple-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              What Our Tech <span className="text-purple-400">Partners Say</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Card3D>
                  <div className="p-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 mb-6">
                        {[...Array(t.rating)].map((_, idx) => (
                          <Star key={idx} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <p className="text-neutral-300 leading-relaxed mb-8">"{t.quote}"</p>
                    </div>
                    <div>
                      <p className="text-white font-bold">{t.name}</p>
                      <p className="text-neutral-500 text-sm">{t.role}</p>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. FAQS & CTA
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-blue-500/60" />
              <span className="text-blue-500 font-mono text-xs tracking-[0.25em] uppercase">Got Questions?</span>
              <span className="w-8 h-[1px] bg-blue-500/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Frequently asked <span className="text-blue-500">questions</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-4 mb-24"
          >
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>

          {/* Final thought */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <h3 className="text-xl font-bold text-neutral-400 uppercase tracking-wider">Final thought</h3>
            <p className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
              Your business will keep growing. <br />
              <span className="text-blue-400">The real question is whether your system can keep up.</span>
            </p>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
              With custom web development services, you build a foundation that supports performance, scale, and long-term growth.
            </p>
          </motion.div>

          {/* CTA Box */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
            <div className="relative p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">We move with speed. Your business keeps up</h2>
              <p className="text-blue-100 max-w-2xl mx-auto text-base md:text-lg">
                Delays cost efficiency, visibility, and growth. Start with custom web development services designed around how your business actually works.
              </p>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
                >
                  👉 Book a strategy call <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
