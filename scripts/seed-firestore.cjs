const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection } = require('firebase/firestore');

// 1. Parse .env file
const envPath = path.join(__dirname, '../.env');
if (!fs.existsSync(envPath)) {
	console.error("Error: .env file not found at " + envPath);
	process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
	const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
	if (match) {
		let key = match[1];
		let value = match[2] || '';
		if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
		if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
		env[key] = value.trim();
	}
});

const firebaseConfig = {
	apiKey: env.VITE_FIREBASE_API_KEY,
	authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: env.VITE_FIREBASE_APP_ID
};

if (!firebaseConfig.apiKey) {
	console.error("Error: VITE_FIREBASE_API_KEY is not defined in .env file");
	process.exit(1);
}

console.log("Initializing Firebase with project ID:", firebaseConfig.projectId);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load JSON data helpers
const loadJson = (filename) => {
	const filePath = path.join(__dirname, '../src/data', filename);
	return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const loadBlogsFromTs = () => {
	const tsPath = path.join(__dirname, '../src/data/blogData.ts');
	let content = fs.readFileSync(tsPath, 'utf8');
	content = content.replace(/export const/g, 'const');
	content += '\nmodule.exports = { categories, blogPosts };';
	const tempPath = path.join(__dirname, 'temp-blogData.cjs');
	fs.writeFileSync(tempPath, content);
	const data = require(tempPath);
	fs.unlinkSync(tempPath);
	return data.blogPosts;
};

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
	thumbnailUrl: "/hero-thumbnail.webp",
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

const services = loadJson('services.json');
const socials = loadJson('socials.json');
const video = loadJson('video.json');
const site = loadJson('site.json');

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
	blog: {
		title: "Blog & Insights | WeBestOne",
		description: "Read the latest insights, tutorials, and strategy guides on AI marketing, SEO, web design, and growth optimization from WeBestOne.",
		keywords: "Marketing Blog, AI Insights, Web Development Guides"
	}
};

async function seed() {
	try {
		console.log("Seeding 'content' collection...");
		await setDoc(doc(db, "content", "hero"), defaultHero);
		await setDoc(doc(db, "content", "contact"), defaultContact);
		await setDoc(doc(db, "content", "socials"), socials);
		await setDoc(doc(db, "content", "video"), video);
		await setDoc(doc(db, "content", "site"), site);
		await setDoc(doc(db, "content", "header"), defaultHeader);
		await setDoc(doc(db, "content", "footer"), defaultFooter);
		console.log("'content' collection seeded successfully!");

		console.log("Seeding 'services' collection...");
		for (const service of services) {
			await setDoc(doc(db, "services", service.id), service);
		}
		console.log("'services' collection seeded successfully!");

		console.log("Seeding 'faq' collection...");
		for (const faqItem of faqs) {
			await setDoc(doc(db, "faq", faqItem.id), faqItem);
		}
		console.log("'faq' collection seeded successfully!");

		console.log("Seeding 'testimonials' collection...");
		for (const testimonialItem of testimonials) {
			await setDoc(doc(db, "testimonials", testimonialItem.id), testimonialItem);
		}
		console.log("'testimonials' collection seeded successfully!");

		console.log("Seeding 'portfolio' collection...");
		for (const portItem of portfolio) {
			await setDoc(doc(db, "portfolio", portItem.id), portItem);
		}
		console.log("'portfolio' collection seeded successfully!");

		console.log("Seeding 'seo' collection...");
		for (const key of Object.keys(seo)) {
			await setDoc(doc(db, "seo", key), seo[key]);
		}
		console.log("'seo' collection seeded successfully!");

		console.log("Seeding 'blogs' collection...");
		const blogs = loadBlogsFromTs();
		for (const blog of blogs) {
			await setDoc(doc(db, "blogs", blog.id), blog);
		}
		console.log("'blogs' collection seeded successfully!");

		console.log("Migration and seeding completed successfully! 🎉");
		process.exit(0);
	} catch (err) {
		console.error("Migration failed with error:", err);
		process.exit(1);
	}
}

seed();
