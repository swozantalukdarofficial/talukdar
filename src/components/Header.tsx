import { Link, useLocation } from "react-router-dom";
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
	ChevronDown,
	FileText,
	TrendingUp,
	Sun,
	Moon,
} from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";

import { useContent } from "../context/ContentContext";
import { useTheme } from "../context/ThemeContext";
import ProposalModal from "./ProposalModal";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
	const { pathname } = useLocation();
	const [isServicesHovered, setIsServicesHovered] = useState(false);
	const { site } = useContent();
	const { theme, toggleTheme } = useTheme();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isProposalOpen, setIsProposalOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (isOpen || isProposalOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			if (!isOpen && !isProposalOpen) {
				document.body.style.overflow = "";
			}
		};
	}, [isOpen, isProposalOpen]);

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

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

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "Work", href: "/work" },
		{ name: "Services", href: "/services" },
		{ name: "Blogs", href: "/blogs" },
		{ name: "Contact", href: "/contact-us" },
		{ name: "About us", href: "/about-us" },
	];

	return (
		<header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80' : 'bg-white/80 backdrop-blur-sm'}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
				{/* Logo */}
				<Link to="/" className="flex items-center gap-2 group shrink-0">
					<div className="h-8 sm:h-10 max-w-[160px] sm:max-w-[220px] flex items-center justify-center font-bold text-xl overflow-hidden relative">
						<img
							src={site.logoUrl || logo}
							alt={site.siteName || "logo"}
							className="h-full w-auto max-h-8 sm:max-h-10 object-contain"
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
										"text-emerald-600 font-extrabold"
									:	"text-slate-700 hover:text-emerald-600"
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
							<div
								className={`absolute top-full left-1/2 -translate-x-1/2 w-[900px] p-8 bg-white/98 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl grid grid-cols-3 gap-x-8 gap-y-4 z-50 mt-2 transition-all duration-200 origin-top transform ${
									link.name === "Services" && isServicesHovered
										? "opacity-100 scale-100 translate-y-0"
										: "opacity-0 scale-95 -translate-y-2 pointer-events-none"
								}`}
							>
								{/* Decorative Glow */}
								<div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

								{servicesList.map((service, index) => (
									<Link
										key={index}
										to={service.href}
										className="group/item flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200/60"
									>
										<div
											className={`w-10 h-10 shrink-0 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all duration-300`}
										>
											<service.icon className="w-5 h-5" />
										</div>
										<div>
											<p className="text-slate-900 font-bold text-sm mb-0.5 group-hover/item:text-emerald-600 transition-colors">
												{service.title}
											</p>
											<p className="text-[10px] text-slate-500 line-clamp-1 group-hover/item:text-slate-700 transition-colors">
												{service.description}
											</p>
										</div>
									</Link>
								))}

								<div className="col-span-3 pt-6 mt-2 border-t border-slate-100 flex justify-between items-center px-4">
									<span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-mono font-bold">
										Explore all our capabilities
									</span>
									<Link
										to="/services"
										className="text-sm font-bold text-emerald-600 hover:underline flex items-center gap-2 group/link"
									>
										View All Services
										<ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
									</Link>
								</div>
							</div>
						</div>
					))}
				</nav>

				{/* Theme Toggle & CTA Button */}
				<div className="flex items-center gap-3">
					<button
						onClick={toggleTheme}
						className="p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
						aria-label="Toggle Light/Dark Theme"
						title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
					>
						{theme === "dark" ? (
							<Sun className="w-4 h-4 text-amber-400" />
						) : (
							<Moon className="w-4 h-4 text-blue-600" />
						)}
					</button>

					<div className="hidden lg:block relative">
						<MagneticButton 
							onClick={(e) => {
								e.stopPropagation();
								setIsProposalOpen(true);
							}}
							className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-full hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/25"
						>
							<span>Get a Proposal</span>
							<ArrowRight className="w-4 h-4" />
						</MagneticButton>
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
			</div>

			{/* Mobile Nav */}
			<div
				className={`md:hidden absolute top-20 left-0 right-0 w-full h-[calc(100vh-5rem)] bg-white/98 backdrop-blur-2xl border-b border-slate-200 shadow-2xl overflow-y-auto transition-all duration-300 origin-top z-[100] ${
					isOpen
						? "opacity-100 visible translate-y-0 pointer-events-auto"
						: "opacity-0 invisible -translate-y-2 pointer-events-none"
				}`}
			>
				<nav className="flex flex-col p-6 pb-28 gap-4">
					{navLinks.map((link) => {
						if (link.name === "Services") {
							return (
								<div key={link.name} className="flex flex-col gap-2">
									<div className="flex items-center justify-between">
										<Link
											to={link.href}
											className={`text-xl font-bold transition-colors ${
												pathname.startsWith("/services") ? "text-neon-green" : "text-neutral-300 hover:text-neon-green"
											}`}
											onClick={() => setIsOpen(false)}
										>
											{link.name}
										</Link>
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation();
												setIsMobileServicesOpen(!isMobileServicesOpen);
											}}
											className="p-2 text-neutral-400 hover:text-neon-green"
											aria-label="Toggle services menu"
										>
											<ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180 text-neon-green" : ""}`} />
										</button>
									</div>

									{/* Mobile sub-services */}
									{isMobileServicesOpen && (
										<div className="grid grid-cols-1 gap-2 pl-4 py-2 border-l border-white/10 my-1">
											{servicesList.map((service, idx) => (
												<Link
													key={idx}
													to={service.href}
													className="flex items-center gap-3 py-2 text-sm text-neutral-400 hover:text-neon-green transition-colors"
													onClick={() => setIsOpen(false)}
												>
													<service.icon className="w-4 h-4 text-neon-green shrink-0" />
													<span className="font-medium">{service.title}</span>
												</Link>
											))}
										</div>
									)}
								</div>
							);
						}

						return (
							<Link
								key={link.name}
								to={link.href}
								className={`text-xl font-bold transition-colors py-1 ${
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
						);
					})}
					<button 
						onClick={() => {
							setIsOpen(false);
							setIsProposalOpen(true);
						}}
						className="w-full mt-2 py-4 bg-neon-green text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
					>
						<span>Get a Proposal</span>
						<ArrowRight className="w-5 h-5" />
					</button>
				</nav>
			</div>
			{/* Proposal Modal — renders for both desktop and mobile */}
			<ProposalModal isOpen={isProposalOpen} onClose={() => setIsProposalOpen(false)} />
		</header>
	);
}
