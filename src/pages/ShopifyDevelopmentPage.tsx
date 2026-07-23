import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Zap, 
  Smartphone, 
  Globe, 
  BarChart3, 
  RefreshCcw, 
  CheckCircle2, 
  ArrowRight,
  ChevronDown,
  Figma,
  Code2,
  Rocket
} from "lucide-react";
import Awards from "../components/Awards";
import TestimonialSlider from "../components/TestimonialSlider";
import Counter from "../components/Counter";
import ShopifyPortfolio from "../components/ShopifyPortfolio";
import SEO from "../components/SEO";
import { useContent } from "../context/ContentContext";
import AdminServiceImageEditor from "../components/admin/AdminServiceImageEditor";

const shopifyDevSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://webestone.com/services/shopify-development#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://webestone.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://webestone.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Shopify Development", "item": "https://webestone.com/services/shopify-development" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://webestone.com/services/shopify-development#service",
      "serviceType": "Shopify Store Development",
      "name": "Shopify Website Development Services",
      "description": "Expert Shopify store development including custom Liquid themes, app integrations, conversion optimization, headless commerce setup, and Shopify Plus solutions.",
      "url": "https://webestone.com/services/shopify-development",
      "provider": {
        "@type": "LocalBusiness",
        "name": "WeBestOne",
        "url": "https://webestone.com",
        "logo": "https://webestone.com/favicon.png",
        "telephone": "+8801333600272",
        "email": "webestone@gmail.com",
        "address": { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressRegion": "Dhaka Division", "addressCountry": "BD" }
      },
      "areaServed": ["BD", "US", "GB", "AU", "CA"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Shopify Development Packages",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Shopify Theme Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shopify App Integration" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shopify Store Migration" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shopify Plus Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shopify Speed Optimization" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Headless Shopify Development" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Shopify development?",
          "acceptedAnswer": { "@type": "Answer", "text": "Shopify development involves building custom e-commerce stores on the Shopify platform. It includes custom Liquid theme development, app integrations, product catalog setup, payment gateway configuration, and conversion rate optimization." }
        },
        {
          "@type": "Question",
          "name": "Can you migrate my store to Shopify?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. We migrate stores from WooCommerce, Magento, BigCommerce, Wix, and other platforms to Shopify while preserving product data, customer records, order history, and SEO structure." }
        },
        {
          "@type": "Question",
          "name": "How long does a Shopify store take to build?",
          "acceptedAnswer": { "@type": "Answer", "text": "A standard Shopify store takes 2-4 weeks. A fully custom theme with advanced features typically requires 6-10 weeks. Timeline depends on product volume and customization requirements." }
        },
        {
          "@type": "Question",
          "name": "Do you work with Shopify Plus?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. We develop enterprise-grade solutions on Shopify Plus including custom checkout flows, B2B wholesale portals, multi-store setups, and advanced automation using Shopify Flow." }
        }
      ]
    }
  ]
};

const services = [
  {
    desc: "Enhance functionality without disrupting performance or user experience.",
    icon: <Zap className="w-6 h-6 text-[#87E65C]" />,
    span: "md:col-span-2 bg-gradient-to-r from-neutral-900 to-black border-white/10"
  },
  {
    title: "Catalog & Checkout Optimization",
    desc: "High-converting cart experiences from a Shopify development agency.",
    icon: <Zap className="w-6 h-6 text-[#00FF66]" />,
    span: "col-span-1 md:col-span-2 row-span-1 bg-neutral-900/30"
  },
  {
    title: "Platform Migration & Integrations",
    desc: "Seamless transfers handled by a Shopify development company.",
    icon: <RefreshCcw className="w-6 h-6 text-[#00FF66]" />,
    span: "col-span-1 md:col-span-1 row-span-1 bg-neutral-900/30"
  },
  {
    title: "Page Speed & Core Web Vitals",
    desc: "Optimized code for maximum performance.",
    icon: <Zap className="w-6 h-6 text-[#00FF66]" />,
    span: "col-span-1 md:col-span-1 row-span-1 bg-neutral-900/30"
  },
  {
    title: "CRO & Conversion Funnel Setup",
    desc: "Data-backed tweaks from a Shopify expert team.",
    icon: <CheckCircle2 className="w-6 h-6 text-[#00FF66]" />,
    span: "col-span-1 md:col-span-1 row-span-1 bg-neutral-900/30"
  },
  {
    title: "SEO & Content Architecture",
    desc: "Search-ready store structures.",
    icon: <Zap className="w-6 h-6 text-[#00FF66]" />,
    span: "col-span-1 md:col-span-1 row-span-1 bg-neutral-900/30"
  },
  {
    title: "Ongoing Maintenance & Scaling",
    desc: "Dedicated support from a Shopify website development agency.",
    icon: <BarChart3 className="w-6 h-6 text-[#00FF66]" />,
    span: "col-span-1 md:col-span-2 row-span-1 bg-neutral-900/30"
  }
];

const stats = [
  { value: 150, suffix: "+", label: "Stores Launched", sub: "Global E-commerce Success" },
  { value: 45, suffix: "%", label: "Avg. Conversion Boost", sub: "Through UX Optimization" },
  { value: 99.9, suffix: "%", label: "Uptime Guaranteed", sub: "Shopify Plus Infrastructure" },
  { value: 12, suffix: "M+", label: "GMV Handled", sub: "For Our Clients Annually" },
];

const features = [
  { title: "Unique Creativity", desc: "We create Shopify stores that balance structure, performance, and a clear user experience.", icon: <Figma className="w-6 h-6" /> },
  { title: "Experts Only", desc: "Our Shopify Experts bring focused experience, a strong track record, and deep expertise in store development.", icon: <Code2 className="w-6 h-6" /> },
  { title: "Globally Active", desc: "We support businesses across different markets, product catalog sizes, and growth stages.", icon: <Globe className="w-6 h-6" /> },
  { title: "Premier Shopify Development Partner", desc: "WebestOne operates as a premier partner delivering scalable ecommerce platform solutions and long-term growth systems.", icon: <CheckCircle2 className="w-6 h-6" /> },
];

const processSteps = [
  { step: "01", title: "Concept", desc: "We define your goals, store structure, product categories, and overall strategy services before development begins." },
  { step: "02", title: "Design", desc: "We create layouts focused on usability, clarity, and a consistent shopping experience." },
  { step: "03", title: "Development", desc: "We build your Shopify store with clean structure, strong functionality, and scalable architecture." },
  { step: "04", title: "Testing", desc: "We review performance, functionality, and user experience across devices and use cases." },
  { step: "05", title: "Deployment", desc: "We launch your Shopify store with stability, readiness, and full operational control." },
  { step: "06", title: "Maintenance", desc: "We provide ongoing support to improve performance, manage updates, and maintain long-term stability." },
];

const faqs = [
  { q: "What does Shopify website development service include?", a: "It includes custom Shopify development, store setup, integrations, optimization, and ongoing support tailored to your business needs." },
  { q: "What kind of post-launch support do you offer?", a: "We provide expert assistance for updates, performance improvements, and ongoing online store management." },
  { q: "Can you assist with migrating my existing online store to Shopify?", a: "Yes. We handle migration from platforms such as WooCommerce with full data protection and minimal disruption." },
  { q: "What is the typical cost of developing a Shopify store?", a: "The cost depends on your store requirements, functionality, product catalog size, and level of customization." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout onClick={() => setOpen(!open)} className="border-b border-white/10 py-5 cursor-pointer group">
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-lg font-medium text-white group-hover:text-[#87E65C] transition-colors">{q}</h4>
        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all ${open ? 'bg-[#87E65C] border-[#87E65C] text-black rotate-180' : 'text-neutral-400'}`}>
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

export default function ShopifyDevelopmentPage() {
  const { serviceImages } = useContent();
  const containerRef = useRef(null);
  
  return (
    <main ref={containerRef} className="relative min-h-screen bg-slate-50 text-white overflow-x-hidden selection:bg-emerald-500/30">
      <AdminServiceImageEditor serviceId="shopify-website-development-service" />
      <SEO 
        pageKey="shopify-website-development-service"
        title="Shopify website Development Service | Shopify Store Development Experts" 
        description="Shopify website Development Service focusing on custom features, product catalog, Shopify store development and scaling brands via strategies from Shopify Experts." 
        schemaMarkup={shopifyDevSchema}
      />
      
      {/* 1. HERO SECTION (UPGRADED) */}
      <section className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center pt-32 md:pt-36 lg:pt-40 pb-16 px-6 overflow-hidden">
        {/* Animated Mesh Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-neon-green/10 blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-teal-500/10 blur-[120px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center relative z-10">
          {/* Left Side: Content */}
          <div className="text-left space-y-4 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#87E65C]/30 bg-[#87E65C]/10 text-neon-green text-xs font-semibold backdrop-blur-md"
            >
              <ShoppingBag className="w-3 h-3 text-neon-green" />
              Built to Scale and Grow
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-black leading-tight tracking-tight"
            >
              Shopify website development service built for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-teal-300 to-white">
                performance, scalability, and growth.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="space-y-3 text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed"
            >
              <p className="text-white font-bold border-l-2 border-[#87E65C]/40 pl-3">
                 At WebestOne, we deliver a Shopify website development service designed to build stores that perform, handle growth, and support real business demand.
              </p>
              <p>
                 Our team focuses on custom Shopify development and Shopify ecommerce solutions, creating stores that are structured, fast, and built to scale. From setup to full Shopify store development, every detail is planned to help you launch with clarity, manage your Shopify store efficiently, and grow without unnecessary limitations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <Link to="/contact-us" className="px-6 py-3 bg-[#87E65C] text-black font-bold rounded-full hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_50px_rgba(135,230,92,0.25)] text-sm">
                Get a quote <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Interactive 3D Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[350px] sm:h-[450px] lg:h-[600px] block order-1 lg:order-2"
          >
            {serviceImages["shopify-website-development-service"] ? (
              <img
                src={serviceImages["shopify-website-development-service"]}
                alt="Shopify Development Services"
                className="w-full h-full object-cover rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(135,230,92,0.15)]"
              />
            ) : (
              <>
                {/* Main Store Mockup */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-[0_0_100px_rgba(135,230,92,0.1)] p-8 overflow-hidden"
                >
                   {/* Browser UI */}
                   <div className="flex gap-2 mb-8">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-neon-green" />
                   </div>
                   
                   {/* Dashboard Content */}
                   <div className="space-y-6">
                      <div className="h-40 w-full bg-neon-green/10 rounded-2xl border border-neon-green/20 p-6 flex flex-col justify-end">
                         <div className="h-2 w-1/3 bg-neon-green/40 rounded mb-2" />
                         <div className="h-8 w-1/2 bg-white/20 rounded" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="h-32 bg-white/5 rounded-2xl border border-white/10" />
                         <div className="h-32 bg-white/5 rounded-2xl border border-white/10" />
                      </div>
                      <div className="h-12 w-full bg-[#87E65C] rounded-full" />
                   </div>
                </motion.div>

                {/* Floating Revenue Card */}
                <motion.div 
                  animate={{ y: [-10, 10, -10], x: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-10 p-6 bg-black/80 backdrop-blur-xl border border-[#87E65C]/30 rounded-3xl shadow-2xl z-20"
                >
                   <div className="text-neon-green text-xs font-bold mb-1 uppercase tracking-tighter">Total Revenue</div>
                   <div className="text-3xl font-black text-white">$124,580.00</div>
                   <div className="mt-2 flex items-center gap-2 text-neon-green text-sm font-bold">
                      <span className="flex items-center justify-center w-4 h-4 bg-neon-green/20 rounded-full text-[10px]">↑</span>
                      +24.5%
                   </div>
                </motion.div>

                {/* Floating Order Bubble */}
                <motion.div 
                  animate={{ y: [20, -20, 20], x: [-10, 0, -10] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 -left-10 p-4 bg-black/80 backdrop-blur-xl border border-[#87E65C]/30 rounded-2xl shadow-2xl z-20 flex items-center gap-4"
                >
                   <div className="w-10 h-10 bg-[#87E65C] text-black rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6" />
                   </div>
                   <div>
                      <div className="text-white text-xs font-bold">New Order!</div>
                      <div className="text-neutral-400 text-[10px]">Just now • $450.00</div>
                   </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* 2. TRUSTED BY SECTION */}
      <Awards />

      {/* 3. SERVICES BENTO SECTION (UPGRADED) */}
      <section className="py-12 md:py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-neon-green font-mono text-sm font-bold tracking-[0.3em] uppercase mb-4"
              >
                Services
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter">How can we help you with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-teal-300">Shopify business?</span></h2>
            </div>
            <div className="text-neutral-400 text-base md:text-lg max-w-md pb-4 space-y-3">
              <p className="text-white font-bold">Most Shopify stores are built to look good. Very few are built to work well.</p>
              <p>
                As a trusted Shopify development agency, WebestOne provides Shopify store development service solutions that improve functionality, enhance the shopping experience, and support long-term performance.
              </p>
              <p>
                We also deliver scalable systems through an AI-driven Shopify website approach, supporting businesses with larger product catalogs, higher volumes, and evolving ecommerce demands.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {services.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-10 rounded-[2.5rem] border border-white/10 overflow-hidden group transition-all duration-500 hover:border-[#87E65C]/50 hover:shadow-[0_0_80px_rgba(135,230,92,0.15)] ${item.span}`}
              >
                {/* Background Decor */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Abstract Visuals based on index */}
                {i === 0 && (
                   <div className="absolute top-12 right-12 w-64 h-64 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                      <div className="font-mono text-[10px] text-neon-green space-y-1">
                         <div>&lt;section class="hero"&gt;</div>
                         <div className="pl-4">{"{{ section.settings.title }}"}</div>
                         <div className="pl-4">&lt;div class="product-grid"&gt;</div>
                         <div className="pl-8">{"{% for product in collection.products %}"}</div>
                         <div className="pl-12">&lt;img src="{"{{ product.image | img_url }}"}" /&gt;</div>
                         <div className="pl-8">{"{% endfor %}"}</div>
                         <div>&lt;/section&gt;</div>
                      </div>
                   </div>
                )}
                {i === 3 && (
                   <div className="absolute -bottom-10 -right-10 w-80 h-80 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none">
                      <div className="grid grid-cols-4 gap-4">
                         {[...Array(16)].map((_, j) => (
                           <div key={j} className="aspect-square border border-[#87E65C]/40 rounded-lg flex items-center justify-center">
                              <Zap className="w-4 h-4 text-neon-green" />
                           </div>
                         ))}
                      </div>
                   </div>
                )}

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <motion.div 
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#87E65C] group-hover:text-black transition-all duration-500 shadow-xl"
                    >
                      {item.icon}
                    </motion.div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-white group-hover:text-neon-green transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-sm group-hover:text-neutral-300 transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-neon-green text-sm font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATS COUNTER SECTION */}
      <section className="py-24 px-6 relative z-10 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-6xl font-black text-neon-green mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-lg font-bold mb-1">{stat.label}</div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY SHOPIFY? SECTION */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Why <br /><span className="text-neon-green">Choose Us</span></h2>
            <div className="space-y-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-[#87E65C]/10 border border-[#87E65C]/20 flex items-center justify-center shrink-0 group-hover:bg-[#87E65C] group-hover:text-black transition-all">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square bg-neutral-900 rounded-3xl border border-white/5 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[#87E65C]/20 to-transparent" />
             <div className="p-12 h-full flex flex-col justify-center text-center">
                <ShoppingBag className="w-24 h-24 text-neon-green mx-auto mb-8 animate-bounce" />
                <h4 className="text-3xl font-bold mb-4">Shopify Plus Partner</h4>
                <p className="text-neutral-400 italic">"Empowering brands to scale without friction."</p>
             </div>
          </div>
        </div>
      </section>

      {/* 6. OUR PROCESS SECTION (UPGRADED) */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-neon-green font-mono text-sm font-bold tracking-[0.4em] uppercase mb-4"
            >
              Process
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">Our Shopify <br /><span className="text-neon-green">Development Process.</span></h2>
            <div className="text-neutral-400 max-w-2xl mx-auto text-base md:text-lg space-y-4">
              <p>At WebestOne, our Shopify website development service follows a structured process designed to keep everything clear, efficient, and focused on results.</p>
              <p>We build Shopify stores that integrate with CRM systems, support inventory management, and handle growing product catalogs without performance loss.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10 rounded-[3rem] overflow-hidden bg-white/[0.02]">
            {processSteps.map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-12 border-b border-r border-white/10 hover:bg-[#87E65C]/[0.02] transition-all duration-500"
              >
                {/* Large Background Number */}
                <div className="absolute top-8 right-8 text-8xl font-black text-white/[0.03] group-hover:text-[#87E65C]/10 transition-colors pointer-events-none select-none">
                   {step.step}
                </div>

                <div className="relative z-10 space-y-6">
                   <div className="w-12 h-12 rounded-full bg-[#87E65C]/10 border border-[#87E65C]/30 flex items-center justify-center text-neon-green font-bold group-hover:bg-[#87E65C] group-hover:text-black transition-all">
                      {step.step}
                   </div>
                   
                   <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-white group-hover:text-neon-green transition-colors">{step.title}</h3>
                      <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                         {step.desc}
                      </p>
                   </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#87E65C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
             <div className="inline-flex items-center gap-4 p-2 pl-6 pr-2 rounded-full bg-white/5 border border-white/10">
                <span className="text-sm text-neutral-400">Want to see our full detailed checklist?</span>
                <button className="px-6 py-2 bg-[#87E65C] text-black font-bold rounded-full text-xs hover:bg-[#87E65C]/90 transition-all">
                   Get PDF Roadmap
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO MARQUEE SECTION */}
      <ShopifyPortfolio />

      {/* 8. APP INTEGRATIONS SECTION (UPGRADED) */}
      <section className="py-24 px-6 relative z-10 overflow-hidden bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#87E65C]/10 border border-[#87E65C]/20 text-neon-green text-xs font-bold mb-6"
             >
               <Zap className="w-3 h-3 text-neon-green" /> Tech Stack Connectivity
             </motion.div>
             <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Built for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-teal-300">Seamless Integrations</span></h2>
             <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
               Your store is only as good as the tools it talks to. We build a unified commerce ecosystem that synchronizes your marketing, shipping, and customer support.
             </p>
             <div className="flex flex-wrap gap-3">
                {["Klaviyo", "Gorgias", "Yotpo", "Recharge", "Nosto", "ShipStation", "Zendesk"].map((app, i) => (
                  <motion.span 
                    key={i} 
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-neutral-300 transition-all cursor-default"
                  >
                    {app}
                  </motion.span>
                ))}
             </div>
          </div>

          {/* Integration Hub Visual */}
          <div className="relative h-[400px] flex items-center justify-center order-1 lg:order-2 w-full mt-10 lg:mt-0">
             <div className="absolute inset-0 bg-[#87E65C]/5 blur-[100px] rounded-full" />
             
             {/* Center Shopify Logo */}
             <motion.div 
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="w-24 h-24 rounded-3xl bg-[#87E65C] flex items-center justify-center shadow-[0_0_50px_rgba(135,230,92,0.4)] text-black z-10"
             >
                <ShoppingBag className="w-12 h-12" />
             </motion.div>

             {/* Orbiting Apps */}
             {[0, 60, 120, 180, 240, 300].map((angle, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0 }}
                 animate={{ 
                    opacity: 1,
                    x: Math.cos(angle * Math.PI / 180) * 140,
                    y: Math.sin(angle * Math.PI / 180) * 140,
                 }}
                 transition={{ delay: i * 0.1, duration: 0.5 }}
                 className="absolute w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md"
               >
                  <Code2 className="w-5 h-5 text-neutral-500" />
                  {/* Connection Line */}
                  <div 
                    className="absolute h-[1px] bg-gradient-to-r from-[#87E65C]/50 to-transparent origin-left"
                    style={{ 
                      width: '140px', 
                      transform: `rotate(${angle + 180}deg)`,
                      left: '50%',
                      top: '50%',
                      zIndex: -1
                    }}
                  />
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 9. MIGRATION EXPERTS SECTION (UPGRADED) */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-br from-neutral-900 to-black border border-white/5 overflow-hidden">
           <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-20 space-y-8">
                 <div className="w-16 h-16 rounded-2xl bg-[#87E65C]/10 border border-[#87E65C]/20 flex items-center justify-center">
                    <RefreshCcw className="w-8 h-8 text-neon-green" />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black tracking-tight">Zero-Friction <br /><span className="text-neon-green">Migration.</span></h2>
                 <p className="text-neutral-400 text-lg leading-relaxed">
                   Outgrowing your current platform? We specialize in complex migrations with 100% data integrity and zero SEO loss. 
                 </p>
                 <ul className="space-y-4">
                    {[
                      "Magento to Shopify Plus",
                      "WooCommerce to Shopify",
                      "BigCommerce & Custom Platforms",
                      "Full SEO Equity Protection"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white font-bold">
                        <CheckCircle2 className="w-5 h-5 text-neon-green" /> {item}
                      </li>
                    ))}
                 </ul>
              </div>

              <div className="relative bg-[#87E65C]/5 p-12 flex flex-col justify-center border-l border-white/5">
                 <div className="space-y-6 relative">
                    <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#87E65C] to-transparent opacity-20" />
                    
                    {[
                      { step: "Data Audit", desc: "Mapping products, orders & customers." },
                      { step: "SEO Mapping", desc: "Redirecting 100% of your current URLs." },
                      { step: "Launch Day", desc: "Seamless transition with no downtime." }
                    ].map((s, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="relative pl-12"
                      >
                         <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-[#87E65C] border-4 border-black z-10" />
                         <h4 className="text-xl font-bold text-white mb-1">{s.step}</h4>
                         <p className="text-neutral-500 text-sm">{s.desc}</p>
                      </motion.div>
                    ))}
                 </div>

                 <div className="mt-12 p-6 rounded-2xl bg-black border border-white/10 flex items-center justify-between">
                    <div>
                       <div className="text-xs text-neutral-500 uppercase font-bold tracking-widest">Success Rate</div>
                       <div className="text-2xl font-black text-white">100.0%</div>
                    </div>
                    <div className="h-10 w-32 bg-[#87E65C]/20 rounded-full flex items-center justify-center text-neon-green text-xs font-bold border border-[#87E65C]/30">
                       Verified Expert
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS SECTION */}
      <TestimonialSlider />

      {/* 11. FAQ SECTION */}
      <section className="py-24 px-6 relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Expert <span className="text-neutral-500">Shopify FAQs</span></h2>
        <div className="border-t border-white/10">
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* 12. FINAL CTA SECTION */}
      <section className="pb-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden bg-white border border-slate-200 shadow-2xl py-24 px-12 text-center relative">
          <div className="absolute inset-0 bg-[#87E65C]/5 blur-[100px] -z-10" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">Ready to build a Shopify store that <br /><span className="text-neon-green">actually performs?</span></h2>
          <div className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto mb-12 space-y-4">
            <p className="text-neutral-200 font-bold text-lg">If your current store is slow, hard to manage, or not converting, the issue is not your product. It is how your store is built.</p>
            <p>WebestOne delivers a Shopify website development service designed to build, optimize, and scale your Shopify store with confidence.</p>
          </div>
          <Link to="/contact-us" className="inline-flex items-center gap-2 px-10 py-5 bg-[#87E65C] text-black font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_50px_rgba(135,230,92,0.3)]">
            Get Started Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </main>
  );
}
