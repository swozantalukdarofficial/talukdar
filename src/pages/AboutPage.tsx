import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import * as LucideIcons from "lucide-react";
import { 
  Users, 
  Target, 
  Lightbulb, 
  Heart, 
  Award, 
  Globe, 
  Cpu, 
  Rocket, 
  History, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  ChevronDown,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import Awards from "../components/Awards";
import Counter from "../components/Counter";
import FAQ from "../components/FAQ";
import servicesData from "../data/services.json";

// --- Sub-components for better modularity ---

const DynamicIcon = ({
	name,
	className,
}: {
	name: string;
	className?: string;
}) => {
	// @ts-ignore
	const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
	return <Icon className={className} />;
};

function StatItem({ value, label, suffix = "", icon: Icon }: { value: number; label: string; suffix?: string; icon: any }) {
  return (
    <div className="text-center p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-all group">
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-neon-green group-hover:border-neon-green transition-all">
         <Icon className="w-8 h-8 text-neon-green group-hover:text-black transition-all" />
      </div>
      <div className="text-4xl md:text-5xl font-black text-white mb-2">
        <Counter value={value} suffix={suffix} />
      </div>
      <div className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em]">{label}</div>
    </div>
  );
}

function SectionHeading({ badge, title, desc, center = false }: { badge: string; title: string; desc?: string; center?: boolean }) {
  return (
    <div className={`mb-16 ${center ? 'text-center mx-auto' : 'text-left'} max-w-3xl`}>
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="inline-block px-4 py-1 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-xs font-bold uppercase tracking-[0.2em] mb-6"
      >
        {badge}
      </motion.span>
      <h2 className="text-4xl md:text-7xl font-black mb-6 leading-tight tracking-tighter">{title}</h2>
      {desc && <p className="text-neutral-400 text-lg leading-relaxed">{desc}</p>}
    </div>
  );
}

// --- Main About Page ---

export default function AboutPage() {
  const containerRef = useRef(null);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#050505] text-white pt-20 overflow-x-hidden selection:bg-neon-green/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Parallax Text */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 0.05, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        >
          <h1 className="text-[20vw] md:text-[25vw] font-black text-white leading-none tracking-tighter opacity-100">
            WE<span className="text-transparent border-t-2 border-b-2 border-white/20">BEST</span>ONE
          </h1>
        </motion.div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-green/30 bg-neon-green/10 text-neon-green text-sm font-bold backdrop-blur-md"
            >
              <Award className="w-4 h-4" />
              Award Winning Digital Agency
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-9xl font-black leading-[0.9] tracking-tighter"
            >
              WE ARE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-teal-400 to-blue-500">
                OUTLIERS.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-lg md:text-2xl text-neutral-400 max-w-xl leading-relaxed"
            >
              Obsessed with perfection, fueled by innovation. We don't just follow digital trends—we create them.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <Link to="/contact" className="px-10 py-5 bg-neon-green text-black font-black rounded-full hover:scale-105 transition-all shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                Start Your Legacy
              </Link>
              <button className="px-10 py-5 border border-white/20 text-white font-black rounded-full hover:bg-white/5 transition-all backdrop-blur-sm">
                Watch Reel
              </button>
            </motion.div>
          </div>

          {/* Right Side: Floating Interactive Cards */}
          <div className="relative h-[500px] hidden lg:block">
             <motion.div 
               animate={{ y: [-20, 20, -20] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 right-0 w-80 p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl z-20"
             >
                <div className="w-12 h-12 rounded-2xl bg-neon-green flex items-center justify-center mb-6">
                   <Target className="w-6 h-6 text-black" />
                </div>
                <h4 className="text-xl font-bold mb-2">99% Success</h4>
                <p className="text-neutral-500 text-sm">Our metrics don't lie. We deliver growth that matters.</p>
             </motion.div>

             <motion.div 
               animate={{ y: [20, -20, 20] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-0 left-0 w-80 p-8 rounded-[2.5rem] bg-neon-green text-black shadow-2xl z-20"
             >
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mb-6">
                   <Zap className="w-6 h-6 text-neon-green" />
                </div>
                <h4 className="text-xl font-bold mb-2">Hyper Growth</h4>
                <p className="text-black/70 text-sm">Scaling businesses at the speed of thought.</p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* 2. STATS OVERVIEW */}
      <section className="py-24 px-6 relative z-10 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatItem value={50} suffix="+" label="Global Clients" icon={Globe} />
          <StatItem value={120} suffix="+" label="Projects Done" icon={CheckCircle2} />
          <StatItem value={15} suffix="+" label="Team Experts" icon={Users} />
          <StatItem value={10} suffix="+" label="Industry Awards" icon={Award} />
        </div>
      </section>

      {/* 3. GENESIS (OUR STORY) */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 group">
             <div className="absolute inset-0 bg-gradient-to-br from-neon-green/20 to-transparent z-10" />
             <img 
               src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
               alt="Team Collaboration" 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
             />
             <div className="absolute bottom-10 left-10 p-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl z-20">
                <div className="text-4xl font-black text-white">Est. 2019</div>
                <div className="text-neutral-400 text-sm">Founded in Dhaka, Scaling Globally.</div>
             </div>
          </div>
          <div className="space-y-8">
            <SectionHeading badge="The Genesis" title="From a Bedroom to a Global Force." />
            <p className="text-neutral-400 text-xl leading-relaxed">
              WeBestOne started with a simple observation: most digital agencies were stuck in the past. We saw an opportunity to fuse high-end design with cutting-edge AI and engineering to create something truly unique.
            </p>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Today, we serve clients from New York to Dubai, helping them navigate the complex digital landscape with precision and creativity.
            </p>
            <div className="flex items-center gap-6 pt-6">
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-neutral-800 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Founder" />
                    </div>
                  ))}
               </div>
               <div className="text-sm font-bold text-white">Founded by Industry Veterans</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION */}
      <section className="py-16 px-6 relative z-10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 rounded-[3rem] bg-gradient-to-br from-neon-green/10 to-transparent border border-neon-green/20"
          >
            <Target className="w-16 h-16 text-neon-green mb-8" />
            <h3 className="text-4xl font-bold mb-6">Our Mission</h3>
            <p className="text-neutral-400 text-lg leading-relaxed">
              To empower the world's most ambitious brands by building digital products that are not only beautiful but also functionally superior and commercially dominant.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 rounded-[3rem] bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20"
          >
            <Lightbulb className="w-16 h-16 text-blue-400 mb-8" />
            <h3 className="text-4xl font-bold mb-6">Our Vision</h3>
            <p className="text-neutral-400 text-lg leading-relaxed">
              To become the global gold standard for digital innovation, where every project we touch sets a new benchmark for what's possible in the digital realm.
            </p>
          </motion.div>
        </div>
      </section>


      {/* 6. SERVICE ECOSYSTEM (MARQUEE) */}
      <section className="py-20 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-6"
             >
                <div className="text-neon-green font-mono text-sm font-bold tracking-[0.4em] uppercase">Service Ecosystem</div>
                <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">Our <span className="text-neon-green">Expertise.</span></h2>
                <p className="text-neutral-400 text-xl leading-relaxed">
                  At WeBestOne, we provide complete digital marketing and creative solutions under one unified strategy. Our core services are engineered for maximum impact and consistent growth.
                </p>
             </motion.div>
          </div>

          <div className="relative mt-8 overflow-hidden py-10 group">
             <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
             <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

             <motion.div
               animate={{ x: ["0%", "-50%"] }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="flex gap-6 w-max"
             >
                {[...Array(2)].map((_, listIndex) => (
                  <div key={listIndex} className="flex gap-6">
                    {servicesData.map((service, i) => (
                      <Link
                        to={service.href}
                        key={i}
                        className="group w-80 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-neon-green/30 transition-all text-center relative overflow-hidden"
                      >
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-neon-green transition-all">
                           <DynamicIcon name={service.iconName} className="w-8 h-8 text-neon-green group-hover:text-black transition-all" />
                        </div>
                        <h4 className="text-2xl font-bold mb-3">{service.title}</h4>
                        <p className="text-neutral-500 text-sm mb-6">{service.description}</p>
                        <div className="inline-flex items-center gap-2 text-neon-green text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                           Explore Service <ArrowRight className="w-3 h-3" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
             </motion.div>
          </div>
        </div>
      </section>

      {/* 7. INNOVATION LAB */}
      <section className="py-20 px-6 relative z-10 overflow-hidden bg-[#050505]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative z-10">
            <SectionHeading badge="Innovation Lab" title="The Arsenal Behind the Art." />
            <p className="text-neutral-400 text-lg mb-10 leading-relaxed max-w-xl">
              At WeBestOne, we blend cutting-edge technology with creative strategy to deliver digital solutions that don't just exist—they dominate. Our arsenal is engineered to turn your brand into a market leader.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { title: "AI SEO Mastery", desc: "Dominating search rankings with intelligence." },
                 { title: "Shopify Excellence", desc: "High-conversion stores built for global scale." },
                 { title: "Premium UI/UX", desc: "Immersive designs that wow your customers." },
                 { title: "Scalable Tech", desc: "Future-proof architectures for peak performance." }
               ].map((tech, i) => (
                 <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-neon-green/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-neon-green transition-all">
                       <CheckCircle2 className="w-5 h-5 text-neon-green group-hover:text-black" />
                    </div>
                    <div>
                       <div className="text-white font-bold mb-1">{tech.title}</div>
                       <div className="text-neutral-500 text-xs">{tech.desc}</div>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="relative h-[600px] flex items-center justify-center">
             <motion.div 
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="w-32 h-32 rounded-full bg-neon-green/20 border border-neon-green/50 flex items-center justify-center relative z-20"
             >
                <div className="w-16 h-16 rounded-full bg-neon-green flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                   <Cpu className="w-8 h-8 text-black" />
                </div>
                <div className="absolute inset-[-40px] border border-white/5 rounded-full animate-spin-slow" />
                <div className="absolute inset-[-80px] border border-white/5 rounded-full animate-spin-reverse" />
             </motion.div>

             {[
               { icon: Rocket, delay: 0, x: -150, y: -150 },
               { icon: Zap, delay: 1, x: 150, y: -100 },
               { icon: ShieldCheck, delay: 2, x: -120, y: 150 },
               { icon: Globe, delay: 3, x: 180, y: 120 },
               { icon: Lightbulb, delay: 1.5, x: 0, y: -220 },
               { icon: Target, delay: 2.5, x: 0, y: 220 }
             ].map((item, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 animate={{ 
                   y: [item.y, item.y - 20, item.y],
                   x: [item.x, item.x + 10, item.x]
                 }}
                 transition={{ duration: 5, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
                 className="absolute w-20 h-20 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center group hover:border-neon-green transition-all z-30"
               >
                  <item.icon className="w-8 h-8 text-neutral-500 group-hover:text-neon-green group-hover:scale-110 transition-all" />
                  <div className="absolute w-[100px] h-px bg-gradient-to-r from-neon-green/0 to-neon-green/20 -z-10 origin-left" 
                    style={{ 
                      transform: `rotate(${Math.atan2(-item.y, -item.x) * 180 / Math.PI}deg)`,
                      width: Math.sqrt(item.x*item.x + item.y*item.y) - 60
                    }} 
                  />
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE US */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="The Outliers" title="Why Choose WeBestOne." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               { icon: Users, title: "One Stop Partner", desc: "Every essential digital service coordinated under one roof for seamless execution." },
               { icon: Zap, title: "AI-Driven Innovation", desc: "Predicting trends and optimizing campaigns in real time with advanced AI models." },
               { icon: Star, title: "Creativity with Impact", desc: "Designs that evoke emotion, strengthen engagement, and drive conversions." },
               { icon: Target, title: "Growth Focused", desc: "Every campaign is aligned with clear performance goals and measurable ROI." }
             ].map((item, i) => (
               <div key={i} className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-neon-green/20 transition-all group flex gap-8 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-neon-green transition-all">
                     <item.icon className="w-6 h-6 text-neutral-400 group-hover:text-black" />
                  </div>
                  <div className="space-y-4">
                     <h3 className="text-2xl font-bold group-hover:text-neon-green transition-colors">{item.title}</h3>
                     <p className="text-neutral-500 leading-relaxed text-sm">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 9. OUR PROMISE */}
      <section className="py-20 px-6 relative z-10 bg-white/[0.01]">
         <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-10">
               <Heart className="w-10 h-10 text-blue-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8">Our Promise</h2>
            <div className="space-y-4 text-left max-w-2xl mx-auto mb-20">
               {[
                 "To create innovative solutions that deliver real results.",
                 "To stay committed to transparency, quality, and measurable growth.",
                 "To continuously evolve our strategies through AI and creative excellence."
               ].map((p, i) => (
                 <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 hover:border-neon-green/30 transition-all">
                    <CheckCircle2 className="w-6 h-6 text-neon-green shrink-0" />
                    <span className="text-neutral-300 font-bold">{p}</span>
                 </div>
               ))}
            </div>
            <div className="p-12 rounded-[3rem] bg-gradient-to-br from-neutral-900 to-black border border-white/5 relative overflow-hidden group">
               <p className="text-2xl md:text-3xl font-medium italic text-neutral-300 leading-relaxed relative z-10">
                  "Your growth is our goal, and every project we undertake is guided by this belief."
               </p>
            </div>
         </div>
      </section>

      {/* 10. TIMELINE */}
      <section className="py-32 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="The Journey" title="Our Growth Timeline." center />
          <div className="relative mt-24">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
            <motion.div 
              style={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-neon-green shadow-[0_0_20px_rgba(16,185,129,0.8)] hidden md:block" 
            />
            <div className="space-y-24">
              {[
                { year: "2019", title: "The Inception", event: "Foundation laid in a small studio with 3 dreamers. We started with a vision to disrupt the digital status quo.", align: "left" },
                { year: "2021", title: "Global Expansion", event: "Scaled to 20+ experts and hit 100+ global clients. Established our presence in London and New York.", align: "right" },
                { year: "2023", title: "South Asia's Best", event: "Recognized as 'Agency of the Year' in South Asia. Our work set new benchmarks for innovation and design.", align: "left" },
                { year: "2024", title: "The AI Era", event: "Launched our dedicated AI & R&D Innovation Lab to pioneer next-gen digital solutions.", align: "right" }
              ].map((m, i) => (
                <div key={i} className={`relative flex items-center justify-center md:justify-between w-full ${m.align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                   <div className="hidden md:block w-[45%] text-right px-12">
                      {m.align === 'right' && <div className="text-8xl font-black text-white/5 select-none">{m.year}</div>}
                   </div>
                   <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-neon-green shadow-[0_0_15px_rgba(16,185,129,1)] z-20 hidden md:block" />
                   <motion.div 
                     initial={{ opacity: 0, x: m.align === 'left' ? -50 : 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     className={`w-full md:w-[45%] p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-neon-green/30 transition-all group relative overflow-hidden`}
                   >
                      <div className="absolute top-[-20%] right-[-10%] text-9xl font-black text-white/[0.02] group-hover:text-neon-green/[0.05] transition-all select-none">{m.year}</div>
                      <h3 className="text-3xl font-black mb-4">{m.title}</h3>
                      <p className="text-neutral-400 leading-relaxed text-lg">{m.event}</p>
                   </motion.div>
                   <div className="hidden md:block w-[45%] text-left px-12">
                      {m.align === 'left' && <div className="text-8xl font-black text-white/5 select-none">{m.year}</div>}
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. GLOBAL FOOTPRINT */}
      <section className="py-32 px-6 relative z-10 overflow-hidden bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
           <SectionHeading badge="Global Footprint" title="Scaling Across Borders." center />
           <div className="relative h-[650px] md:h-[700px] w-full bg-neutral-900/10 rounded-[3rem] md:rounded-[4rem] border border-white/5 overflow-hidden">
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                 <motion.path
                   d="M 220 180 Q 450 100 720 220"
                   stroke="url(#grad1)" strokeWidth="1" fill="transparent"
                   initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 3, repeat: Infinity }}
                 />
                 <defs>
                   <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="transparent" /><stop offset="50%" stopColor="#10b981" /><stop offset="100%" stopColor="transparent" />
                   </linearGradient>
                 </defs>
              </svg>
              {[
                { city: "New York", top: "35%", left: "15%" },
                { city: "London", top: "25%", left: "40%" },
                { city: "Dubai", top: "45%", left: "60%" },
                { city: "Dhaka", top: "52%", left: "75%" }
              ].map((loc, i) => (
                <div key={i} className="absolute" style={{ top: loc.top, left: loc.left }}>
                   <div className="relative">
                      <div className="absolute inset-0 w-3 h-3 bg-neon-green rounded-full animate-ping opacity-75" />
                      <div className="relative w-3 h-3 bg-neon-green rounded-full shadow-[0_0_20px_rgba(16,185,129,1)]" />
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg z-30"
                      >
                         <div className="text-[10px] md:text-xs font-black text-white tracking-widest uppercase">{loc.city}</div>
                      </motion.div>
                   </div>
                </div>
              ))}
              <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                 {[
                   { city: "New York", time: "EST", status: "Active" },
                   { city: "London", time: "GMT", status: "Active" },
                   { city: "Dubai", time: "GST", status: "Active" },
                   { city: "Dhaka", time: "BST", status: "Headquarters" }
                 ].map((card, i) => (
                   <div key={i} className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-black/60 backdrop-blur-xl border border-white/5 hover:border-neon-green/30 transition-all group">
                      <div className="text-neutral-500 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-1">{card.time}</div>
                      <div className="text-sm md:text-xl font-black text-white group-hover:text-neon-green transition-colors truncate">{card.city}</div>
                      <div className="flex items-center gap-1.5 md:gap-2 mt-2 md:mt-3">
                         <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-neon-green animate-pulse" />
                         <span className="text-[8px] md:text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">{card.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 12. REVIEWS (MARQUEE) */}
      <section className="py-32 px-6 relative z-10 overflow-hidden">
        <SectionHeading badge="Wall of Love" title="What Our Clients Say." center />
        <div className="relative group mt-20">
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 w-max py-10"
          >
            {[...Array(2)].map((_, listIndex) => (
              <div key={listIndex} className="flex gap-8">
                {[
                  { name: "James Wilson", role: "CEO, TechFlow", text: "WeBestOne transformed our Shopify store into a high-converting machine.", img: "1" },
                  { name: "Elena Rodriguez", role: "Director, LuxeStyle", text: "The UI/UX design they delivered was beyond our expectations.", img: "2" },
                  { name: "Sarah Jenkins", role: "Founder, GreenPulse", text: "Professional, innovative, and results-driven. They provide a roadmap to success.", img: "3" },
                  { name: "Michael Chen", role: "Ops Lead, Global Log", text: "Their development team built a custom dashboard that saved us hundreds of hours.", img: "4" }
                ].map((review, i) => (
                  <div key={i} className="w-[450px] p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-neon-green/30 transition-all flex flex-col justify-between group cursor-grab">
                    <div>
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-neon-green text-neon-green" />)}
                      </div>
                      <p className="text-neutral-300 leading-relaxed mb-8 italic text-lg">"{review.text}"</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10">
                        <img src={`https://i.pravatar.cc/100?img=${review.img}`} alt={review.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div>
                        <h5 className="font-bold text-white">{review.name}</h5>
                        <p className="text-neutral-500 text-xs uppercase tracking-widest">{review.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 13. TEAM (MARQUEE) */}
      <section className="py-20 px-6 relative z-10 overflow-hidden">
        <SectionHeading badge="The Collective" title="The Minds Behind the Magic." center />
        <div className="relative group/marquee mt-10">
          <div className="absolute inset-y-0 left-0 w-12 md:w-40 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-40 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 w-max py-10"
          >
            {[...Array(2)].map((_, listIndex) => (
              <div key={listIndex} className="flex gap-12">
                {[
                  { name: "Rozi Osman", color: "from-neon-green/20 to-teal-500/20" },
                  { name: "Shipon Talukdar", color: "from-blue-500/20 to-cyan-500/20" },
                  { name: "Sabikun Nahar Ishita", color: "from-purple-500/20 to-pink-500/20" },
                  { name: "Mahmud Shohan", color: "from-orange-500/20 to-red-500/20" },
                  { name: "Sarah Mubasshera", color: "from-teal-500/20 to-neon-green/20" },
                  { name: "Sadia Surove", color: "from-blue-600/20 to-indigo-600/20" },
                  { name: "Adiba Ahmed", color: "from-pink-500/20 to-rose-500/20" }
                ].map((m, i) => (
                  <div key={i} className="group w-72 cursor-pointer flex flex-col items-center">
                    <div className={`w-64 h-64 rounded-[3.5rem] bg-gradient-to-br ${m.color} border border-white/10 flex items-center justify-center mb-6 relative group-hover:border-neon-green/50 transition-all duration-500 overflow-hidden shadow-2xl`}>
                      <div className="text-7xl font-black text-white/20 group-hover:text-neon-green group-hover:scale-110 transition-all duration-500">
                        {m.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-neon-green transition-colors">{m.name}</h4>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 14. AWARDS */}
      <section className="py-20 relative z-10 bg-white/[0.02]">
        <Awards />
      </section>

      {/* 15. FAQ */}
      <FAQ />

      {/* 16. FINAL CTA */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="p-20 rounded-[4rem] bg-gradient-to-br from-neon-green to-teal-600 text-black relative overflow-hidden"
           >
              <div className="relative z-10">
                 <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">Ready to become <br /> an Outlier?</h2>
                 <p className="text-black/70 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium">
                    Stop following the crowd. Let's build a digital presence that sets the trend.
                 </p>
                 <Link to="/contact" className="px-12 py-6 bg-black text-white font-black rounded-full hover:scale-110 transition-all inline-flex items-center gap-3 text-lg">
                    Start Your Project <ArrowRight className="w-5 h-5" />
                 </Link>
              </div>
              <div className="absolute top-0 right-0 p-10 opacity-10">
                 <Rocket className="w-64 h-64 -rotate-12" />
              </div>
           </motion.div>
        </div>
      </section>

    </main>
  );
}
