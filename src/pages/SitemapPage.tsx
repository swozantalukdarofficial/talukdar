import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Home, 
  Info, 
  Briefcase, 
  Mail, 
  FileText, 
  Shield, 
  CheckCircle,
  Globe,
  Search,
  Share2,
  MousePointerClick,
  MonitorPlay,
  Mountain,
  Layout,
  ShoppingBag,
  PenTool,
  Megaphone,
  Zap
} from "lucide-react";

const links = [
  {
    title: "Main Pages",
    items: [
      { name: "Home", href: "/", icon: Home },
      { name: "About Us", href: "/about", icon: Info },
      { name: "Services", href: "/services", icon: Briefcase },
      { name: "Contact", href: "/contact", icon: Mail },
      { name: "Blogs", href: "/blogs", icon: FileText },
    ]
  },
  {
    title: "Digital Marketing Services",
    items: [
      { name: "Digital Marketing", href: "/services/digital-marketing", icon: Megaphone },
      { name: "AI Driven SEO", href: "/services/seo", icon: Search },
      { name: "SMM (Social Media)", href: "/services/social-media-marketing", icon: Share2 },
      { name: "PPC (Ads)", href: "/services/ppc", icon: MousePointerClick },
      { name: "Shopify SEO", href: "/services/shopify-seo", icon: Globe },
      { name: "Content Writing", href: "/services/content-writing", icon: FileText },
    ]
  },
  {
    title: "Creative & Development",
    items: [
      { name: "Video Editing", href: "/services/video-editing", icon: MonitorPlay },
      { name: "Motion Graphics", href: "/services/motion-graphics", icon: Mountain },
      { name: "Website Development", href: "/services/web-development", icon: Zap },
      { name: "WordPress Web", href: "/services/wordpress-development", icon: Layout },
      { name: "Web Design (UI UX)", href: "/services/ui-ux-design", icon: PenTool },
      { name: "Shopify Development", href: "/services/shopify-development", icon: ShoppingBag },
    ]
  },
  {
    title: "Legal",
    items: [
      { name: "Privacy Policy", href: "/privacy-policy", icon: Shield },
      { name: "Terms & Conditions", href: "/terms-and-conditions", icon: CheckCircle },
    ]
  }
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-xs font-bold uppercase tracking-[0.2em] mb-6">
            Navigation Map
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            HTML <span className="text-neon-green">Sitemap.</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            A comprehensive guide to every page on our website. Find exactly what you're looking for with ease.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {links.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold border-b border-white/10 pb-4 text-neutral-300">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {section.items.map((link, i) => (
                  <Link 
                    key={i} 
                    to={link.href}
                    className="flex items-center gap-4 group p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-neon-green/10 hover:border-neon-green/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-neon-green transition-all">
                       <link.icon className="w-5 h-5 text-neutral-400 group-hover:text-black" />
                    </div>
                    <span className="text-lg font-bold text-neutral-400 group-hover:text-white transition-colors">
                      {link.name}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
