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
} from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";

import { useContent } from "../context/ContentContext";
import ProposalModal from "./ProposalModal";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const { pathname } = useLocation();
	const [isServicesHovered, setIsServicesHovered] = useState(false);
	const { site } = useContent();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isProposalOpen, setIsProposalOpen] = useState(false);

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
							src={site.logoUrl || logo}
							alt={site.siteName || "logo"}
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
							<div
								className={`absolute top-full left-1/2 -translate-x-1/2 w-[900px] p-8 bg-neutral-900/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl grid grid-cols-3 gap-x-8 gap-y-4 z-50 mt-2 transition-all duration-200 origin-top transform ${
									link.name === "Services" && isServicesHovered
										? "opacity-100 scale-100 translate-y-0"
										: "opacity-0 scale-95 -translate-y-2 pointer-events-none"
								}`}
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
							</div>
						</div>
					))}
				</nav>

				{/* CTA Button */}
				<div className="hidden lg:block relative">
					<MagneticButton 
						onClick={(e) => {
							e.stopPropagation();
							setIsProposalOpen(!isProposalOpen);
						}}
						className="px-6 py-2.5 bg-[#87E65C] text-black font-bold text-sm rounded-full hover:bg-[#87E65C]/90 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(135,230,92,0.15)]"
					>
						<span>Get a Proposal</span>
						<ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProposalOpen ? 'rotate-180' : ''}`} />
					</MagneticButton>

					{/* Dropdown Menu */}
					{isProposalOpen && (
						<>
							{/* Invisible overlay to close dropdown on click outside */}
							<div className="fixed inset-0 z-40" onClick={() => setIsProposalOpen(false)} />
							
							<div className="absolute right-0 mt-3 w-80 bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 animate-in fade-in slide-in-from-top-2 duration-300 overflow-hidden">
								{/* Decorative subtle light */}
								<div className="absolute -top-12 -right-12 w-24 h-24 bg-[#87E65C]/10 rounded-full blur-xl pointer-events-none" />
								
								<button 
									onClick={() => {
										setIsProposalOpen(false);
										if (site.fullStackProposalUrl) {
											window.open(site.fullStackProposalUrl, "_blank", "noopener,noreferrer");
										} else {
											alert("Proposal document not uploaded yet.");
										}
									}}
									className="w-full group flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/5 transition-all text-left relative z-10"
								>
									<div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-neutral-400 group-hover:bg-[#87E65C] group-hover:text-black group-hover:scale-105 transition-all duration-300 shrink-0">
										<TrendingUp className="w-4 h-4" />
									</div>
									<div className="flex-1 min-w-0">
										<span className="block text-white font-extrabold text-xs group-hover:text-[#87E65C] transition-colors">
											Full Stack Digital Marketing
										</span>
										<span className="block text-[10px] text-neutral-500 mt-0.5 leading-normal">
											Roadmap & strategy document
										</span>
									</div>
									<ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#87E65C] group-hover:translate-x-1 transition-all shrink-0" />
								</button>

								<div className="h-px bg-white/5 my-1.5" />

								<button 
									onClick={() => {
										setIsProposalOpen(false);
										if (site.generalProposalUrl) {
											window.open(site.generalProposalUrl, "_blank", "noopener,noreferrer");
										} else {
											alert("Proposal document not uploaded yet.");
										}
									}}
									className="w-full group flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/5 transition-all text-left relative z-10"
								>
									<div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-neutral-400 group-hover:bg-[#87E65C] group-hover:text-black group-hover:scale-105 transition-all duration-300 shrink-0">
										<FileText className="w-4 h-4" />
									</div>
									<div className="flex-1 min-w-0">
										<span className="block text-white font-extrabold text-xs group-hover:text-[#87E65C] transition-colors">
											General Proposal
										</span>
										<span className="block text-[10px] text-neutral-500 mt-0.5 leading-normal">
											Standard services & pricing overview
										</span>
									</div>
									<ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#87E65C] group-hover:translate-x-1 transition-all shrink-0" />
								</button>
							</div>
						</>
					)}
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
			<div
				className={`md:hidden absolute top-20 left-0 right-0 bg-neutral-950 border-b border-white/10 overflow-y-auto transition-all duration-300 origin-top transform ${
					isOpen
						? "max-h-[calc(100vh-5rem)] opacity-100 visible"
						: "max-h-0 opacity-0 invisible pointer-events-none"
				}`}
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
					<div className="flex flex-col gap-2">
						<button 
							onClick={() => setIsProposalOpen(!isProposalOpen)}
							className="w-full py-4 bg-neon-green text-black font-bold rounded-xl flex items-center justify-center gap-2"
						>
							<span>Get a Proposal</span>
							<ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isProposalOpen ? 'rotate-180' : ''}`} />
						</button>
						{isProposalOpen && (
							<div className="flex flex-col gap-2 mt-2 bg-neutral-900 border border-white/10 rounded-xl p-2 animate-in fade-in slide-in-from-top-1 duration-200">
								<button 
									onClick={() => {
										setIsProposalOpen(false);
										setIsOpen(false);
										if (site.fullStackProposalUrl) {
											window.open(site.fullStackProposalUrl, "_blank", "noopener,noreferrer");
										} else {
											alert("Proposal not uploaded yet.");
										}
									}}
									className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all text-left w-full"
								>
									<div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400 shrink-0">
										<TrendingUp className="w-4 h-4" />
									</div>
									<div className="flex-1 min-w-0">
										<span className="block text-white font-extrabold text-sm">Full Stack Digital Marketing</span>
										<span className="block text-[10px] text-neutral-500 mt-0.5">Roadmap & strategy document</span>
									</div>
								</button>
								<div className="h-px bg-white/5 my-0.5" />
								<button 
									onClick={() => {
										setIsProposalOpen(false);
										setIsOpen(false);
										if (site.generalProposalUrl) {
											window.open(site.generalProposalUrl, "_blank", "noopener,noreferrer");
										} else {
											alert("Proposal not uploaded yet.");
										}
									}}
									className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all text-left w-full"
								>
									<div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400 shrink-0">
										<FileText className="w-4 h-4" />
									</div>
									<div className="flex-1 min-w-0">
										<span className="block text-white font-extrabold text-sm">General Proposal</span>
										<span className="block text-[10px] text-neutral-500 mt-0.5">Standard services & pricing overview</span>
									</div>
								</button>
							</div>
						)}
					</div>
				</nav>
			</div>
		</header>
	);
}
