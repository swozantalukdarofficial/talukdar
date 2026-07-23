import { useState } from "react";
import { useContent } from "../../context/ContentContext";
import {
	Briefcase,
	Image,
	HelpCircle,
	MessageSquare,
	Phone,
	Globe,
	TrendingUp,
	Activity,
	Database,
	Play,
	CheckCircle,
	FileText,
	Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import servicesData from "../../data/services.json";
import socialsData from "../../data/socials.json";
import videoData from "../../data/video.json";
import siteData from "../../data/site.json";
import { blogPosts } from "../../data/blogData";

const defaultHero = {
	badge: "Attention is the new currency. We help you earn, hold, and convert it.",
	heading: "AI-Powered Solutions",
	headingHighlight: "That Convert Attention Into Revenue",
	description: "From AI driven SEO and conversion-focused web development to data-backed PPC, social media advertising services, and high-impact video marketing. We engineer the complete AI digital marketing ecosystem your brand needs to scale.",
	ctaPrimary: "Get Your Free Consultation",
	ctaPrimaryUrl: "/contact-us",
	ctaSecondary: "See Our Success",
	ctaSecondaryUrl: "/work",
	videoUrl: "https://www.youtube.com/embed/MnLd2G198U8?autoplay=1&rel=0&modestbranding=1",
	thumbnailUrl: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660415/r8dks5yhmlilr5kp1juq.webp",
	floatingCard1Label: "Conversion Boost",
	floatingCard1Value: "+145%",
	floatingCard2Label: "Organic Traffic",
	floatingCard2Value: "+250%",
	floatingCard3Label: "GA4 Verified",
	floatingCard3Value: "Data-Driven Growth"
};

const defaultContact = {
	phone: "+8801815025322",
	email: "webestone@gmail.com",
	address: "25 The Avenue, Crawley, Perth, WA",
	mapUrl: "https://maps.google.com/maps?q=25%20The%20Avenue,%20Crawley,%20Perth,%20WA,%20Australia&t=&z=15&ie=UTF8&iwloc=&output=embed",
	formOptions: ["SEO", "Social Media Marketing", "Web Development", "Branding", "PPC Advertising", "Content Writing", "Video Editing"]
};

const defaultHeader = {
	navLinks: [
		{ label: "Home", href: "/" },
		{ label: "Work", href: "/work" },
		{ label: "Services", href: "/services" },
		{ label: "Blogs", href: "/blog" },
		{ label: "About us", href: "/about-us" }
	],
	ctaText: "Get a Proposal",
	ctaUrl: "/contact-us"
};

const defaultFooter = {
	description: "WeBestOne is a full-service AI digital agency dedicated to growing businesses with data-driven strategy and creative intelligence.",
	copyright: "© 2026 WeBestOne. All rights reserved."
};

const faqs = [
	{
		id: "faq1",
		question: "How long does it take to see results?",
		answer: "Paid campaigns on Google Ads and Meta Ads typically show measurable results in 4 to 6 weeks. Organic Search Engine Optimization and content marketing build compounding returns over 3 to 6 months. We share weekly performance updates from day one so you always know where you stand.",
		order: 0
	},
	{
		id: "faq2",
		question: "Do you offer custom AI marketing plans?",
		answer: "Yes. Every plan is built around your specific industry, audience, budget, and goals. No templates. No copy-paste strategies. Every campaign we run is tailored after a discovery audit.",
		order: 1
	},
	{
		id: "faq3",
		question: "What is a Free Marketing Audit?",
		answer: "A no-commitment review of your website performance, SEO health, social media engagement, and ad spend efficiency. You receive a clear report identifying exactly where you are losing revenue and what to fix first.",
		order: 2
	},
	{
		id: "faq4",
		question: "How do you track success?",
		answer: "Through real-time dashboards connected to Google Analytics, Google Search Console, Meta Ads Manager, and our internal AI reporting tools. You see every metric live, 24/7. No monthly PDF surprises.",
		order: 3
	},
	{
		id: "faq5",
		question: "Which industries do you specialize in?",
		answer: "E-Commerce, SaaS & Tech, and Ed-Tech are our strongest verticals with proven case studies. We also work with Real Estate, Energy, and NGO clients on a project basis.",
		order: 4
	}
];

const testimonials = [
	{
		id: "testimonial1",
		name: "Akramul Haque",
		role: "Founder",
		company: "Maisha Net",
		text: "Webestone transformed our online presence. Our organic traffic and leads grew by 300% within just six months of working with their AI-driven SEO and content team.",
		avatar: "https://i.pravatar.cc/150?u=akram",
		rating: 5,
		order: 0
	},
	{
		id: "testimonial2",
		name: "Sarah Ahmed",
		role: "CEO",
		company: "Arch Leather",
		text: "The best AI digital marketing agency, period. Their data-backed approach to social media advertising and Meta Ads gave us our best sales quarter ever.",
		avatar: "https://i.pravatar.cc/150?u=sarah",
		rating: 5,
		order: 1
	},
	{
		id: "testimonial3",
		name: "Rahat Kabir",
		role: "Director",
		company: "EduBD",
		text: "Professional, creative, and results-oriented. They built our Ed-Tech platform from scratch with clean responsive design and managed the entire launch campaign flawlessly.",
		avatar: "https://i.pravatar.cc/150?u=rahat",
		rating: 5,
		order: 2
	}
];

const portfolio = [
	{
		id: "port1",
		src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
		alt: "Full Stack Digital Marketing - Strategic Business Campaigns",
		order: 0
	},
	{
		id: "port2",
		src: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=800&auto=format&fit=crop",
		alt: "AI Driven SEO - High-Performance Ranking & Metrics",
		order: 1
	},
	{
		id: "port3",
		src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
		alt: "SMM (Social Media Marketing) - Brand Feed Engagement",
		order: 2
	},
	{
		id: "port4",
		src: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=800&auto=format&fit=crop",
		alt: "PPC Ads Management - Google & Facebook Funnels",
		order: 3
	},
	{
		id: "port5",
		src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
		alt: "Shopify SEO - Store Growth & Conversion Optimization",
		order: 4
	},
	{
		id: "port6",
		src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
		alt: "Content Writing - Persuasive SEO Copywriting & Articles",
		order: 5
	},
	{
		id: "port7",
		src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
		alt: "Cinematic Video Editing - Viral Short-form Content",
		order: 6
	},
	{
		id: "port8",
		src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
		alt: "Motion Graphics - Dynamic Creative Animations",
		order: 7
	},
	{
		id: "port9",
		src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
		alt: "Full-Stack Website Development - Scaleable Architectures",
		order: 8
	},
	{
		id: "port10",
		src: "https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=800&auto=format&fit=crop",
		alt: "Custom WordPress Web - High-Performance CMS Systems",
		order: 9
	},
	{
		id: "port11",
		src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop",
		alt: "Web Design (UI UX) - User-Focused Design Systems",
		order: 10
	},
	{
		id: "port12",
		src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
		alt: "Custom Shopify Development - Advanced E-commerce Solutions",
		order: 11
	}
];

const seo = {
	home: {
		title: "WeBestOne | AI-Powered Digital Marketing Agency",
		description: "WeBestOne is a full-service AI-driven digital marketing agency specializing in SEO, Web Development, Social Media, PPC, and Video Editing to grow brands.",
		keywords: "AI Marketing, SEO Agency, Web Development, SMM, PPC Advertising"
	},
	about: {
		title: "About Us | WeBestOne",
		description: "Learn about WeBestOne, our mission, vision, and how our team combines artificial intelligence and human creativity to scale brands.",
		keywords: "About WeBestOne, AI Digital Agency Perth, Marketing Team"
	},
	contact: {
		title: "Contact Us | WeBestOne",
		description: "Get in touch with WeBestOne to claim your free marketing audit and start your AI-powered digital growth journey.",
		keywords: "Contact WeBestOne, Free Marketing Audit, Digital Marketing Consultation"
	},
	services: {
		title: "Our Services | WeBestOne",
		description: "Explore WeBestOne's AI-driven growth services including SEO, conversion-focused custom web development, PPC ads, and video editing.",
		keywords: "Digital Marketing Services, SEO, Custom Web Development, PPC, Video Editing"
	},
	work: {
		title: "Our Work | WeBestOne",
		description: "Explore the projects and success stories built by WeBestOne for brands scaling worldwide.",
		keywords: "WeBestOne Portfolio, Case Studies, Client Success Stories"
	},
	blogs: {
		title: "Blog & Insights | WeBestOne",
		description: "Read the latest insights, tutorials, and strategy guides on AI marketing, SEO, web design, and growth optimization from WeBestOne.",
		keywords: "Marketing Blog, AI Insights, Web Development Guides"
	}
};

import { useModal } from "../../context/ModalContext";

export default function DashboardPage() {
	const { services, faq, testimonials, blogs, teamMembers, portfolio: contentPortfolio, contact, socials, updateDocument, addDocument } = useContent();
	const { showConfirm, showAlert } = useModal();
	const [migrating, setMigrating] = useState(false);
	const [migrated, setMigrated] = useState(false);

	const stats = [
		{ label: "Services", value: services.length, icon: Briefcase, color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
		{ label: "Portfolio Items", value: contentPortfolio.length, icon: Image, color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
		{ label: "Team Members", value: teamMembers ? teamMembers.length : 0, icon: Users, color: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
		{ label: "FAQs", value: faq.length, icon: HelpCircle, color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
		{ label: "Testimonials", value: testimonials.length, icon: MessageSquare, color: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
		{ label: "Blog Posts", value: blogs.length, icon: FileText, color: "bg-green-500/10 text-green-400 border-green-500/20" },
	];

	const handleMigrate = () => {
		showConfirm({
			title: "Seed / Migrate Database?",
			message: "Are you sure you want to seed the database with all default website data? This will overwrite or initialize your Firestore collection data.",
			confirmText: "Seed Database",
			type: "warning",
			onConfirm: async () => {
				setMigrating(true);
				try {
					console.log("Seeding 'content' collection...");
					await updateDocument("content", "hero", defaultHero);
					await updateDocument("content", "contact", defaultContact);
					await updateDocument("content", "socials", socialsData as any);
					await updateDocument("content", "video", videoData as any);
					await updateDocument("content", "site", siteData as any);
					await updateDocument("content", "header", defaultHeader);
					await updateDocument("content", "footer", defaultFooter);

					console.log("Seeding 'services' collection...");
					for (const service of servicesData) {
						await addDocument("services", service.id, service as any);
					}

					console.log("Seeding 'faq' collection...");
					for (const faqItem of faqs) {
						await addDocument("faq", faqItem.id, faqItem as any);
					}

					console.log("Seeding 'testimonials' collection...");
					for (const testimonialItem of testimonials) {
						await addDocument("testimonials", testimonialItem.id, testimonialItem as any);
					}

					console.log("Seeding 'portfolio' collection...");
					for (const portItem of portfolio) {
						await addDocument("portfolio", portItem.id, portItem as any);
					}

					console.log("Seeding 'blogs' collection...");
					for (const post of blogPosts) {
						await addDocument("blogs", post.id, post as any);
					}
					console.log("Seeding 'team' collection...");
					const teamMembersSeed = [
						{ id: "team1", name: "Rozi Osman", role: "Senior Growth Strategist", profile: "", portfolio: "https://webestone.com", contact: "mailto:contact@webestone.com", order: 1 },
						{ id: "team2", name: "Shipon Talukdar", role: "Lead Developer & Architect", profile: "", portfolio: "https://webestone.com", contact: "mailto:contact@webestone.com", order: 2 },
						{ id: "team3", name: "Sabikun Nahar Ishita", role: "Creative UI/UX Designer", profile: "", portfolio: "https://webestone.com", contact: "mailto:contact@webestone.com", order: 3 },
						{ id: "team4", name: "Mahmud Shohan", role: "Performance Marketing Specialist", profile: "", portfolio: "https://webestone.com", contact: "mailto:contact@webestone.com", order: 4 },
						{ id: "team5", name: "Sarah Mubasshera", role: "AI Operations Specialist", profile: "", portfolio: "https://webestone.com", contact: "mailto:contact@webestone.com", order: 5 },
						{ id: "team6", name: "Sadia Surove", role: "Content & Copy Lead", profile: "", portfolio: "https://webestone.com", contact: "mailto:contact@webestone.com", order: 6 },
						{ id: "team7", name: "Adiba Ahmed", role: "Digital Strategist", profile: "", portfolio: "https://webestone.com", contact: "mailto:contact@webestone.com", order: 7 },
					];
					for (const member of teamMembersSeed) {
						await addDocument("team", member.id, member as any);
					}

					console.log("Seeding 'seo' collection...");
					for (const [key, value] of Object.entries(seo)) {
						await updateDocument("seo", key, value as any);
					}

					setMigrated(true);
					setTimeout(() => setMigrated(false), 5000);
					showAlert({ title: "Success", message: "Database migration and seeding completed successfully!", type: "success" });
				} catch (err) {
					console.error("Migration failed:", err);
					showAlert({ title: "Error", message: "Migration failed. Please check browser console.", type: "warning" });
				} finally {
					setMigrating(false);
				}
			},
		});
	};

	return (
		<div className="space-y-8 max-w-6xl">
			{/* Page Header */}
			<div>
				<h1 className="text-2xl font-black text-white mb-1">Dashboard</h1>
				<p className="text-neutral-500 text-sm">Overview of your website content</p>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className={`rounded-2xl border p-5 ${stat.color} backdrop-blur-sm`}
					>
						<div className="flex items-center justify-between mb-3">
							<stat.icon className="w-5 h-5" />
							<Activity className="w-4 h-4 opacity-40" />
						</div>
						<p className="text-3xl font-black text-white">{stat.value}</p>
						<p className="text-xs font-medium opacity-70 mt-1">{stat.label}</p>
					</div>
				))}
			</div>

			{/* Quick Links */}
			<div>
				<h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{quickLinks.map((link) => (
						<Link
							key={link.href}
							to={link.href}
							className="group bg-neutral-900/50 border border-white/5 rounded-2xl p-5 hover:border-neon-green/20 hover:bg-neutral-900/80 transition-all"
						>
							<link.icon className={`w-6 h-6 ${link.color} mb-3 group-hover:scale-110 transition-transform`} />
							<p className="text-white font-bold text-sm">{link.name}</p>
							<p className="text-neutral-500 text-xs mt-1">Click to edit</p>
						</Link>
					))}
				</div>
			</div>

			{/* Current Info Summary & Data Migration */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6">
					<h3 className="text-white font-bold mb-4 flex items-center gap-2">
						<Phone className="w-4 h-4 text-neon-green" />
						Current Contact Info
					</h3>
					<div className="space-y-3 text-sm">
						<div className="flex justify-between">
							<span className="text-neutral-500">Phone</span>
							<span className="text-white font-medium">{contact.phone}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-neutral-500">Email</span>
							<span className="text-white font-medium">{contact.email}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-neutral-500">Address</span>
							<span className="text-white font-medium text-right max-w-[200px]">{contact.address}</span>
						</div>
					</div>
				</div>

				<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6">
					<h3 className="text-white font-bold mb-4 flex items-center gap-2">
						<Globe className="w-4 h-4 text-neon-green" />
						Social Links
					</h3>
					<div className="space-y-3 text-sm">
						{Object.entries(socials).map(([key, value]) => (
							<div key={key} className="flex justify-between">
								<span className="text-neutral-500 capitalize">{key}</span>
								<span className="text-white font-medium truncate max-w-[200px]">{value}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Database Seeding & Migration */}
			<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6">
				<h3 className="text-white font-bold mb-2 flex items-center gap-2">
					<Database className="w-4 h-4 text-neon-green" />
					Database Seeding & Migration
				</h3>
				<p className="text-neutral-400 text-xs mb-4 leading-relaxed">
					Seed your Firebase project's Firestore database with all default website data (Services, FAQs, Testimonials, Portfolio items, SEO metadata, Header & Footer settings, Hero settings, and Contact settings). This will populate your database with content instantly.
				</p>
				<button
					onClick={handleMigrate}
					disabled={migrating}
					className="flex items-center gap-2 px-5 py-2.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 transition-all text-xs disabled:opacity-50"
				>
					{migrating ? (
						<span>Migrating...</span>
					) : migrated ? (
						<>
							<CheckCircle className="w-4 h-4" />
							<span>Database Seeded Successfully!</span>
						</>
					) : (
						<>
							<Play className="w-3.5 h-3.5 fill-current" />
							<span>Run Database Migration</span>
						</>
					)}
				</button>
			</div>
		</div>
	);
}

const quickLinks = [
	{ name: "Edit Hero", href: "/admin/hero", icon: TrendingUp, color: "text-neon-green" },
	{ name: "Edit Services", href: "/admin/services", icon: Briefcase, color: "text-blue-400" },
	{ name: "Edit Contact", href: "/admin/contact", icon: Phone, color: "text-orange-400" },
	{ name: "Edit Portfolio", href: "/admin/portfolio", icon: Image, color: "text-purple-400" },
	{ name: "Edit Proposals", href: "/admin/proposals", icon: FileText, color: "text-green-400" },
];
