import { Link } from "react-router-dom";
import logo from "../assets/Webestone-Logo.webp";
import {
	Facebook,
	Instagram,
	Linkedin,
	Youtube,
	MessageCircle,
	Mail,
} from "lucide-react";
import { useContent } from "../context/ContentContext";

export default function Footer() {
	const { socials, contact, footer, site } = useContent();

	return (
		<footer className="relative bg-black/40 backdrop-blur-xl border-t border-white/5 pt-20 pb-10 overflow-hidden text-neutral-300">
			{/* Bottom Left Green Glow */}
			<div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neon-green/20 rounded-full blur-[120px] pointer-events-none"></div>

			{/* Top Right Blue Glow */}
			<div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

			<div className="relative z-10 max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
					{/* Column 1: Brand & Contact (4 cols) */}
					<div className="lg:col-span-4 space-y-8">
						<div className="space-y-6">
							<div className="h-12 flex items-center">
								<img
									src={site?.logoUrl || logo}
									alt={site?.logoText || "Webestone Logo"}
									className="h-full w-auto object-contain"
								/>
							</div>
							
							<div className="space-y-1">
								<p className="text-white font-medium text-sm">Drop us an email</p>
								<a
									href={`mailto:${socials?.email || ""}`}
									className="text-base sm:text-lg text-white font-bold hover:text-neon-green transition-colors block break-all"
								>
									{socials?.email || ""}
								</a>
							</div>
						</div>

						<div className="space-y-4">
							<div>
								<p className="text-white font-bold text-lg">Location</p>
								<p className="text-neutral-400">{contact?.address || ""}</p>
							</div>
							{/* Mini Map */}
							<div className="relative group/map overflow-hidden rounded-2xl h-40 w-full border border-white/5 bg-neutral-900 shadow-2xl">
								<div className="absolute inset-0 bg-black/60 group-hover/map:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
								<iframe
									src={contact?.mapUrl || ""}
									width="100%"
									height="100%"
									style={{
										border: 0,
										filter: "grayscale(100%) invert(90%) hue-rotate(180deg)",
									}}
									className="group-hover/map:filter-none transition-all duration-700 scale-110 group-hover/map:scale-100"
									loading="lazy"
									title="Google Maps Location"
								></iframe>
								<div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none z-20"></div>
							</div>
						</div>
					</div>

					{/* Column 2: Core Services (3 cols) */}
					<div className="lg:col-span-3 space-y-6">
						<p className="text-white font-bold text-lg">Core Services</p>
						<ul className="space-y-3">
							{(footer?.serviceLinks || []).map((service, index) => (
								<li key={index}>
									<Link
										to={service.href}
										className="hover:text-neon-green transition-colors text-sm"
									>
										{service.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Column 3: Our Work & About (2 cols) */}
					<div className="lg:col-span-2 space-y-10">
						<div className="space-y-6">
							<p className="text-white font-bold text-lg">Our Work</p>
							<ul className="space-y-3">
								<li>
									<Link
										to="#case-studies"
										className="hover:text-neon-green transition-colors text-sm"
									>
										Case studies
									</Link>
								</li>
								<li>
									<Link
										to="/blogs"
										className="hover:text-neon-green transition-colors text-sm"
									>
										Blogs
									</Link>
								</li>
							</ul>
						</div>

						<div className="space-y-6">
							<p className="text-white font-bold text-lg">About Us</p>
							<ul className="space-y-3">
								<li>
									<Link
										to="/about-us"
										className="hover:text-neon-green transition-colors text-sm"
									>
										Who are we
									</Link>
								</li>
							</ul>
						</div>

						<div className="space-y-6">
							<p className="text-white font-bold text-lg">Legal</p>
							<ul className="space-y-3">
								<li>
									<Link
										to="/terms-and-conditions"
										className="hover:text-neon-green transition-colors text-sm"
									>
										Terms &amp; Conditions
									</Link>
								</li>
								<li>
									<Link
										to="/privacy-policy"
										className="hover:text-neon-green transition-colors text-sm"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										to="/sitemap"
										className="hover:text-neon-green transition-colors text-sm"
									>
										Sitemap
									</Link>
								</li>
							</ul>
						</div>
					</div>

					{/* Column 4: Socials & Button (3 cols) */}
					<div className="lg:col-span-3 space-y-8 flex flex-col justify-between">
						<div className="space-y-6">
							<p className="text-white font-bold text-lg">Get in Touch</p>
							<div className="flex items-center gap-4">
								<a
									href={socials?.facebook || "#"}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Facebook"
									className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 hover:scale-110 transition-transform"
								>
									<Facebook className="w-5 h-5 fill-current" />
								</a>
								<a
									href={socials?.instagram || "#"}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Instagram"
									className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
								>
									<Instagram className="w-5 h-5" />
								</a>
								<a
									href={socials?.whatsapp ? `https://wa.me/${socials.whatsapp}` : "#"}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="WhatsApp"
									className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
								>
									<MessageCircle className="w-5 h-5 fill-current" />
								</a>
								<a
									href={socials?.linkedin || "#"}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="LinkedIn"
									className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
								>
									<Linkedin className="w-5 h-5 fill-current" />
								</a>
								<a
									href={socials?.youtube || "#"}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="YouTube"
									className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
								>
									<Youtube className="w-5 h-5 fill-current" />
								</a>
							</div>
						</div>

						{/* Email Button Widget */}
						<div className="self-start lg:self-end mt-8 lg:mt-auto">
							<a
								href={`mailto:${socials?.email || ""}`}
								className="inline-flex items-center gap-3 bg-[#87E65C] hover:bg-[#87E65C]/90 text-blue-900 px-6 py-3 rounded-lg font-bold transition-colors shadow-lg shadow-[#87E65C]/20"
							>
								<div className="p-1 bg-white/20 rounded">
									<Mail className="w-6 h-6" />
								</div>
								<div className="flex flex-col text-left leading-none">
									<span className="text-[10px] uppercase font-bold text-blue-950">
										Contact us on
									</span>
									<span className="text-xl">Email</span>
								</div>
							</a>
						</div>
					</div>
				</div>

				<div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-600 text-sm">
					<p>{footer?.copyright || `© ${new Date().getFullYear()} WeBestOne. All rights reserved.`}</p>
					<div className="flex items-center gap-4">
						<Link
							to="/terms-and-conditions"
							className="hover:text-neon-green transition-colors"
						>
							Terms &amp; Conditions
						</Link>
						<span>·</span>
						<Link
							to="/privacy-policy"
							className="hover:text-neon-green transition-colors"
						>
							Privacy Policy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
