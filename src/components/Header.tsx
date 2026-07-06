import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/Webestone-Logo.webp";
import {
	Menu,
	X,
	ArrowRight,
	Search,
	Share2,
	MousePointerClick,
	MonitorPlay,
	Mountain,
	PenTool,
	Zap,
	Home,
	Globe,
	Edit3,
	Gamepad2,
	Bot,
	Megaphone,
	Facebook,
	Instagram,
	Phone,
	Layout,
	ShoppingBag,
} from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";

const defaultSite = {
	logoUrl: logo,
	siteName: "Webestone",
};

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const { pathname } = useLocation();
	const [isServicesHovered, setIsServicesHovered] = useState(false);
	const [site] = useState(defaultSite);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const servicesList = [
		{
			title: "Full Stack Digital Marketing",
			description: "Full-Service Strategy",
			icon: Megaphone,
			href: "/services/digital-marketing-agency",
		},
		{
			title: "AI Driven SEO",
			description: "Search Engine Optimization",
			icon: Search,
			href: "/services/AI-SEO-Service-Agency",
		},
		{
			title: "SMM (Social Media)",
			description: "Marketing Campaigns",
			icon: Share2,
			href: "/services/social-media-marketing-agency",
		},
		{
			title: "PPC (Ads)",
			description: "Paid Advertising",
			icon: MousePointerClick,
			href: "/services/ppc-management-services",
		},
		{
			title: "Shopify SEO",
			description: "Store Optimization",
			icon: Globe,
			href: "/services/shopify-seo-service-agency",
		},
		{
			title: "Content Writing",
			description: "Persuasive Copy",
			icon: Edit3,
			href: "/services/content-writing-services",
		},
		{
			title: "Video Editing",
			description: "Cinematic Content",
			icon: MonitorPlay,
			href: "/services/professional-video-editing-services",
		},
		{
			title: "Motion Graphics",
			description: "Modern Animations",
			icon: Mountain,
			href: "/services/motion-graphics-services-company",
		},
		{
			title: "Website Development",
			description: "Responsive Websites",
			icon: Zap,
			href: "/services/custom-web-development-services",
		},
		{
			title: "WordPress Web",
			description: "CMS Solutions",
			icon: Layout, 
			href: "/services/wordpress-website-development-services",
		},
		{
			title: "Web Design (UI UX)",
			description: "User-Focused Design",
			icon: PenTool,
			href: "/services/web-design-service",
		},
		{
			title: "Shopify Development",
			description: "E-commerce Solutions",
			icon: ShoppingBag,
			href: "/services/shopify-website-development-service",
		},
	];

  // Need to import Layout and ShoppingBag
	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "Work", href: "/work" },
		{ name: "Services", href: "/services" },
		{ name: "Blogs", href: "/blogs" },
		{ name: "Contact", href: "/contact-us" },
		{ name: "About us", href: "/about-us" },
	];

	return (
		<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
			<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
				{/* Logo */}
				<Link to="/" className="flex items-center gap-2 group shrink-0">
					<div className="h-10 flex items-center justify-center font-bold text-xl overflow-hidden relative">
						<img
							src={logo}
							alt={"logo"}
							className="h-full w-auto object-contain"
						/>
					</div>
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<div
							key={link.name}
							className="relative group"
							onMouseEnter={() =>
								link.name === "Services" ? setIsServicesHovered(true) : null
							}
							onMouseLeave={() =>
								link.name === "Services" ? setIsServicesHovered(false) : null
							}
						>
							<Link
								to={link.href}
								className={`text-sm font-bold transition-colors relative py-4 ${
									(
										link.href === "/" ?
											pathname === "/"
										:	pathname.startsWith(link.href)
									) ?
										"text-neon-green"
									:	"text-neutral-300 hover:text-neon-green"
								}`}
							>
								{link.name}
								<span
									className={`absolute bottom-2 left-0 h-0.5 bg-neon-green transition-all duration-300 ${
										(
											link.href === "/" ?
												pathname === "/"
											:	pathname.startsWith(link.href)
										) ?
											"w-full"
										:	"w-0 group-hover:w-full"
									}`}
								></span>
							</Link>

							{/* Mega Menu for Services */}
							<AnimatePresence>
								{link.name === "Services" && isServicesHovered && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										transition={{ duration: 0.2 }}
										className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] p-8 bg-neutral-900/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl grid grid-cols-3 gap-x-8 gap-y-4 z-50 mt-2"
									>
										{/* Decorative Glow */}
										<div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-neon-green/10 rounded-full blur-[80px] pointer-events-none"></div>

										{servicesList.map((service, index) => (
											<Link
												key={index}
												to={service.href}
												className="group/item flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
											>
												<div
													className={`w-10 h-10 shrink-0 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-neutral-400 group-hover/item:bg-neon-green group-hover/item:text-black transition-all duration-300`}
												>
													<service.icon className="w-5 h-5" />
												</div>
												<div>
													<p className="text-white font-bold text-sm mb-0.5 group-hover/item:text-neon-green transition-colors">
														{service.title}
													</p>
                          <p className="text-[10px] text-neutral-500 line-clamp-1 group-hover/item:text-neutral-400 transition-colors">
                            {service.description}
                          </p>
												</div>
											</Link>
										))}

										<div className="col-span-3 pt-6 mt-2 border-t border-white/5 flex justify-between items-center px-4">
											<span className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-mono font-bold">
												Explore all our capabilities
											</span>
											<Link
												to="/services"
												className="text-sm font-bold text-neon-green hover:underline flex items-center gap-2 group/link"
											>
												View All Services
												<ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
											</Link>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					))}
				</nav>

				{/* CTA Button */}
				<div className="hidden lg:flex items-center gap-4">
					<Link to="/contact-us">
						<MagneticButton className="px-6 py-2.5 bg-[#87E65C] text-black font-bold text-sm rounded-full hover:bg-[#87E65C]/90 transition-all flex items-center gap-2">
							<span>Get a Proposal</span>
							<ArrowRight className="w-4 h-4" />
						</MagneticButton>
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden text-neutral-300 hover:text-white p-2"
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Toggle menu"
				>
					{isOpen ?
						<X className="w-6 h-6" />
					:	<Menu className="w-6 h-6" />}
				</button>
			</div>

			{/* Mobile Nav */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden absolute top-20 left-0 right-0 bg-neutral-950 border-b border-white/10 overflow-hidden"
					>
						<nav className="flex flex-col p-6 gap-6">
							{navLinks.map((link) => (
								<Link
									key={link.name}
									to={link.href}
									className={`text-xl font-bold transition-colors ${
										(
											link.href === "/" ?
												pathname === "/"
											:	pathname.startsWith(link.href)
										) ?
											"text-neon-green"
										:	"text-neutral-300 hover:text-neon-green"
									}`}
									onClick={() => setIsOpen(false)}
								>
									{link.name}
								</Link>
							))}
							<Link to="/contact-us" onClick={() => setIsOpen(false)}>
								<button className="w-full py-4 bg-neon-green text-black font-bold rounded-xl flex items-center justify-center gap-2">
									<span>Get a Proposal</span>
									<ArrowRight className="w-5 h-5" />
								</button>
							</Link>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
