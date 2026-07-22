import {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	useRef,
	type ReactNode,
} from "react";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	setDoc,
	deleteDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

// ─── Default fallback data (current hardcoded content) ──────────────────────
import servicesJson from "../data/services.json";
import socialsJson from "../data/socials.json";
import videoJson from "../data/video.json";
import siteJson from "../data/site.json";
import { blogPosts } from "../data/blogData";

export interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	category: string;
	readTime: string;
	image: string;
	author?: string;
	authorRole?: string;
	featured?: boolean;
	seoTitle?: string;
	seoDescription?: string;
	schemaMarkup?: any;
	linkedServiceId?: string;
	videoUrl?: string;
}

export interface HeroContent {
	badge: string;
	heading: string;
	headingHighlight: string;
	description: string;
	ctaPrimary: string;
	ctaPrimaryUrl: string;
	ctaSecondary: string;
	ctaSecondaryUrl: string;
	videoUrl: string;
	thumbnailUrl: string;
	floatingCard1Label: string;
	floatingCard1Value: string;
	floatingCard2Label: string;
	floatingCard2Value: string;
	floatingCard3Label: string;
	floatingCard3Value: string;
}

export interface ContactContent {
	phone: string;
	email: string;
	address: string;
	mapUrl: string;
	formOptions: string[];
}

export interface SocialsContent {
	facebook: string;
	instagram: string;
	whatsapp: string;
	linkedin: string;
	youtube: string;
	email: string;
}

export interface ServiceItem {
	id: string;
	title: string;
	description: string;
	iconName: string;
	color: string;
	href: string;
}

export interface PortfolioItem {
	id: string;
	src: string;
	alt: string;
	order: number;
	client?: string;
	title?: string;
	tag?: string;
}

export interface FAQItem {
	id: string;
	question: string;
	answer: string;
	order: number;
}

export interface TestimonialItem {
	id: string;
	name: string;
	role: string;
	company: string;
	text: string;
	avatar: string;
	rating: number;
}

export interface TeamMember {
	id: string;
	name: string;
	role: string;       // podobi (Designation)
	profile: string;    // profile photo URL
	portfolio?: string; // portfolio URL
	contact?: string;   // contact URL / email / social link
	order: number;
}

export interface NavLink {
	name: string;
	href: string;
}

export interface HeaderContent {
	navLinks: NavLink[];
	ctaText: string;
	ctaUrl: string;
}

export interface FooterContent {
	serviceLinks: { name: string; href: string }[];
	copyright: string;
}

export interface VideoContent {
	youtubeUrl: string;
	headline: string;
	subheadline: string;
}

export interface SiteContent {
	logoUrl: string;
	siteName: string;
	logoText: string;
	fullStackProposalUrl?: string;
	generalProposalUrl?: string;
}

export interface SEOContent {
	[page: string]: {
		title: string;
		description: string;
	};
}

// ─── Defaults ───────────────────────────────────────────────────────────────
const defaultHero: HeroContent = {
	badge: "Attention is the new currency. We help you earn, hold, and convert it.",
	heading: "AI-Powered Solutions",
	headingHighlight: "That Convert Attention Into Revenue",
	description:
		"From AI driven SEO and conversion-focused web development to data-backed PPC, social media advertising services, and high-impact video marketing. We engineer the complete AI digital marketing ecosystem your brand needs to scale.",
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
	floatingCard3Value: "Data-Driven Growth",
};

const defaultContact: ContactContent = {
	phone: "+8801815025322",
	email: "webestone@gmail.com",
	address: "25 The Avenue, Crawley, Perth, WA",
	mapUrl: "https://maps.google.com/maps?q=25%20The%20Avenue,%20Crawley,%20Perth,%20WA,%20Australia&t=&z=15&ie=UTF8&iwloc=&output=embed",
	formOptions: [
		"Full Stack Digital Marketing",
		"AI Driven SEO",
		"Social Media Marketing (SMM)",
		"PPC & Paid Advertising",
		"Shopify SEO",
		"Custom Website Development",
		"WordPress Web Development",
		"Shopify Web Development",
		"UI/UX Web Design",
		"Content Writing",
		"Video Editing",
		"Motion Graphics"
	],
};

const defaultSocials: SocialsContent = socialsJson as SocialsContent;
const defaultServices: ServiceItem[] = servicesJson as ServiceItem[];
const defaultVideo: VideoContent = videoJson as VideoContent;
const defaultSite: SiteContent = {
	logoUrl: "",
	siteName: "WeBestOne",
	logoText: "W",
	fullStackProposalUrl: "",
	generalProposalUrl: "",
	...(siteJson as any)
};


const defaultServiceImages: Record<string, string> = {
	"digital-marketing-agency": "https://img.youtube.com/vi/Zey6npEA0KA/maxresdefault.jpg",
	"digital-marketing-agency_video": "Zey6npEA0KA",
	"digital-marketing-agency_why_video": "MnLd2G198U8",
	"digital-marketing-agency_why_thumb": "https://img.youtube.com/vi/MnLd2G198U8/maxresdefault.jpg",
	"AI-SEO-Service-Agency": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660432/tum40e6jql4tprb1xdos.webp",
	"AI-SEO-Service-Agency_dashboard": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660435/m4qzfagrvow7equ3agaa.webp",
	"AI-SEO-Service-Agency_letters": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660432/yvtbqutlrcsnuwuhxpgj.webp",
	"AI-SEO-Service-Agency_circuit": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660434/jzwl2bbavjust01fgiko.webp",
	"AI-SEO-Service-Agency_brain": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660431/dlo7vfpwnefk9bmh5ayz.webp",
	"shopify-seo-service-agency": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660422/vxq8tpzrevtvi4lnaa7x.webp",
	"shopify-seo-service-agency_growth": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
	"shopify-seo-service-agency_masonry_1": "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
	"shopify-seo-service-agency_masonry_2": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
	"shopify-seo-service-agency_masonry_3": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
	"shopify-seo-service-agency_masonry_4": "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=600&auto=format&fit=crop",
	"professional-video-editing-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660425/s5cubflg8cnoc2cskgz4.webp",
	"professional-video-editing-services_slider_1": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660426/b76psj7bgwpk25uraitp.webp",
	"professional-video-editing-services_slider_2": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660424/ntu5bk2fhvc3adjp2usq.webp",
	"professional-video-editing-services_slider_3": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660427/je9htoxpbrghkik5chie.webp",
	"professional-video-editing-services_slider_4": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660423/jn0pdqeikyynwyogzto3.webp",
	"professional-video-editing-services_slider_5": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
	"professional-video-editing-services_slider_6": "https://images.unsplash.com/photo-1579165466511-7f00cd047c6a?q=80&w=600&auto=format&fit=crop",
	"ppc-management-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660419/wcj5iuidup9zucqbjzzo.webp",
	"ppc-management-services_video": "MnLd2G198U8",
	"ppc-management-services_cta_img": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660419/wcj5iuidup9zucqbjzzo.webp",
	"social-media-marketing-agency": "https://img.youtube.com/vi/MnLd2G198U8/maxresdefault.jpg",
	"social-media-marketing-agency_video": "MnLd2G198U8",
	"shopify-website-development-service": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660422/vxq8tpzrevtvi4lnaa7x.webp",
	"custom-web-development-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660428/abejavjxa67nfy6xmz2m.webp",
	"wordpress-website-development-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660429/i0kviv1aoomxodxum4sx.webp",
	"content-writing-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660437/dmddcxgzfu5imfn7iebu.webp",
	"motion-graphics-services-company": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660417/jmh8msnlrxi3n6gatpz2.webp",
	"web-design-service": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660413/fgnpdrgye9vwwbiv7tsd.webp",
	"ai-seo": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660432/tum40e6jql4tprb1xdos.webp"
};

const defaultHeader: HeaderContent = {
	navLinks: [
		{ name: "Home", href: "/" },
		{ name: "Work", href: "/work" },
		{ name: "Services", href: "/services" },
		{ name: "Blogs", href: "/blogs" },
		{ name: "Contact", href: "/contact-us" },
		{ name: "About us", href: "/about-us" },
	],
	ctaText: "Get a Proposal",
	ctaUrl: "/contact-us",
};

const defaultFooter: FooterContent = {
	serviceLinks: [
		{ name: "Full Stack Digital Marketing", href: "/services/digital-marketing-agency" },
		{ name: "AI SEO Services", href: "/services/AI-SEO-Service-Agency" },
		{ name: "Social Media Management", href: "/services/social-media-marketing-agency" },
		{ name: "PPC Advertising", href: "/services/ppc-management-services" },
		{ name: "Web Development", href: "/services/custom-web-development-services" },
		{ name: "UI/UX Design", href: "/services/web-design-service" },
		{ name: "Video Editing", href: "/services/professional-video-editing-services" },
		{ name: "Motion Graphics", href: "/services/motion-graphics-services-company" },
		{ name: "Shopify Development", href: "/services/shopify-website-development-service" },
	],
	copyright: `© ${new Date().getFullYear()} WeBestOne. All rights reserved.`,
};

const defaultSEO: SEOContent = {
	home: {
		title: "AI-Powered Solutions & Digital Marketing Agency | WeBestOne",
		description: "Advanced AI powered solutions by an expert AI agency delivering full digital marketing, web development, uiux design and tech solutions for better Google rankings and growth.",
	},
	about: {
		title: "About Us | WeBestOne - AI-Powered Digital Agency",
		description: "Learn about WeBestOne, a full-service AI-powered digital agency helping businesses grow smarter, faster, and stronger.",
	},
	contact: {
		title: "Contact Us | WeBestOne",
		description: "Get in touch with WeBestOne for AI-powered digital marketing, web development, and growth solutions.",
	},
	work: {
		title: "Our Work & Case Studies - WeBestOne",
		description: "Explore our portfolio of successful projects, including web development, AI SEO campaigns, and branding that drive revenue.",
	},
	services: {
		title: "Our Services | WeBestOne",
		description: "Explore WeBestOne's AI-driven growth services including SEO, conversion-focused custom web development, PPC ads, and video editing.",
	},
	blogs: {
		title: "Blog & Insights | WeBestOne",
		description: "Read the latest insights, tutorials, and strategy guides on AI marketing, SEO, web design, and growth optimization from WeBestOne.",
	},
	"digital-marketing-agency": {
		title: "Digital Marketing Agency | Expert Digital Marketing Solutions",
		description: "Leading Digital Marketing Agency offering AI powered digital marketing services specializing in AI SEO, Google Ads, content strategy and conversion focused campaigns.",
	},
	"AI-SEO-Service-Agency": {
		title: "AI SEO Service Agency | Advanced AI Driven SEO Solutions",
		description: "Leading AI SEO Service Agency helping brands grow visibility in AI search through LLM optimization, AI SEO, semantic search and high-impact content strategies.",
	},
	"shopify-seo-service-agency": {
		title: "Shopify SEO Service Agency | Shopify store Optimization services",
		description: "Shopify SEO Service Agency driving growth through AI-driven Shopify SEO expert team, keyword research and high-performing Shopify store Optimization services.",
	},
	"professional-video-editing-services": {
		title: "Professional video editing services | Production Experts",
		description: "Professional video editing services help to build your brand with a video production agency that uses AI-driven strategies to deliver high-performing video content.",
	},
	"ppc-management-services": {
		title: "PPC Management Services | Expert Paid Advertising Agency",
		description: "Advanced PPC Management Services scaling brands with AI-driven strategies, audience targeting, expert keyword bidding and high performing paid search advertising.",
	},
	"social-media-marketing-agency": {
		title: "Social Media Marketing Agency | Social Media Advertising Experts",
		description: "Trusted Social Media Marketing Agency driving growth through AI-driven strategies, Meta Business Suite, LinkedIn Campaign Manager and high-performing paid campaigns.",
	},
	"shopify-website-development-service": {
		title: "Shopify website Development Service | Shopify Store Development Experts",
		description: "Shopify website Development Service focusing on custom features, product catalog, Shopify store development and scaling brands via strategies from Shopify Experts.",
	},
	"custom-web-development-services": {
		title: "Custom Web Development Services | Expert CMS Web Development",
		description: "Expert Custom web development services provide best Custom website solutions and specialize in Magento, Laravel, Shopify and React to scale your digital presence",
	},
	"wordpress-website-development-services": {
		title: "WordPress website development services | AI powered Agency",
		description: "Advanced WordPress website development services featuring custom WordPress themes, security plugins and growth-focused WordPress web development agency strategies.",
	},
	"content-writing-services": {
		title: "Content Writing Services | Creative Content Writing Agency",
		description: "Expert Content Writing Services are designed to scale your brand with SEO optimized blogs, authority-building articles and a creative content writing team.",
	},
	"motion-graphics-services-company": {
		title: "Motion Graphics Services Company | 3D Animation services",
		description: "Advanced Motion Graphics Services Company specializes in Explainer Videos, 3D Motion Graphics, visual Storytelling and Animated Transitions that scale your brand.",
	},
	"web-design-service": {
		title: "Web Design Service | Custom UI UX Design service Agency",
		description: "Expert Web Design Service offering Custom UI UX Solutions, UX Strategy and Usability Testing to ensure high-performing results from our Web Design Agency.",
	},
	"ai-seo": {
		title: "Generative Engine Optimization (GEO) & AI SEO - WeBestOne",
		description: "Dominate next-gen AI search platforms (Google SGE, Perplexity, Gemini) with modern generative engine optimization.",
	},
};

const defaultTeam: TeamMember[] = [
	{
		id: "team1",
		name: "Rozi Osman",
		role: "Senior Growth Strategist",
		profile: "",
		portfolio: "https://webestone.com",
		contact: "mailto:contact@webestone.com",
		order: 1,
	},
	{
		id: "team2",
		name: "Shipon Talukdar",
		role: "Lead Developer & Architect",
		profile: "",
		portfolio: "https://webestone.com",
		contact: "mailto:contact@webestone.com",
		order: 2,
	},
	{
		id: "team3",
		name: "Sabikun Nahar Ishita",
		role: "Creative UI/UX Designer",
		profile: "",
		portfolio: "https://webestone.com",
		contact: "mailto:contact@webestone.com",
		order: 3,
	},
	{
		id: "team4",
		name: "Mahmud Shohan",
		role: "Performance Marketing Specialist",
		profile: "",
		portfolio: "https://webestone.com",
		contact: "mailto:contact@webestone.com",
		order: 4,
	},
	{
		id: "team5",
		name: "Sarah Mubasshera",
		role: "AI Operations Specialist",
		profile: "",
		portfolio: "https://webestone.com",
		contact: "mailto:contact@webestone.com",
		order: 5,
	},
	{
		id: "team6",
		name: "Sadia Surove",
		role: "Content & Copy Lead",
		profile: "",
		portfolio: "https://webestone.com",
		contact: "mailto:contact@webestone.com",
		order: 6,
	},
	{
		id: "team7",
		name: "Adiba Ahmed",
		role: "Digital Strategist",
		profile: "",
		portfolio: "https://webestone.com",
		contact: "mailto:contact@webestone.com",
		order: 7,
	},
];

// ─── Context Shape ──────────────────────────────────────────────────────────
interface ContentContextType {
	hero: HeroContent;
	contact: ContactContent;
	socials: SocialsContent;
	services: ServiceItem[];
	portfolio: PortfolioItem[];
	faq: FAQItem[];
	testimonials: TestimonialItem[];
	teamMembers: TeamMember[];
	header: HeaderContent;
	footer: FooterContent;
	video: VideoContent;
	site: SiteContent;
	seo: SEOContent;
	serviceImages: Record<string, string>;
	blogs: BlogPost[];
	isLoading: boolean;

	// Admin CRUD helpers
	updateDocument: (collectionName: string, docId: string, data: Record<string, unknown>) => Promise<void>;
	addDocument: (collectionName: string, docId: string, data: Record<string, unknown>) => Promise<void>;
	removeDocument: (collectionName: string, docId: string) => Promise<void>;
	refreshCollection: (collectionName: string) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | null>(null);

// Helper to recursively remove undefined properties for Firestore safety
function sanitizeData(data: any): any {
	if (data === undefined) return null;
	if (data === null) return null;
	if (Array.isArray(data)) {
		return data.map(sanitizeData);
	}
	if (typeof data === "object") {
		const clean: any = {};
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				const val = data[key];
				if (val !== undefined) {
					clean[key] = sanitizeData(val);
				}
			}
		}
		return clean;
	}
	return data;
}

// ─── Provider ───────────────────────────────────────────────────────────────
export function ContentProvider({ children }: { children: ReactNode }) {
	const [hero, setHero] = useState<HeroContent>(defaultHero);
	const [contact, setContact] = useState<ContactContent>(defaultContact);
	const [socials, setSocials] = useState<SocialsContent>(defaultSocials);
	const [services, setServices] = useState<ServiceItem[]>(defaultServices);
	const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
	const [faq, setFaq] = useState<FAQItem[]>([]);
	const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
	const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultTeam);
	const [header, setHeader] = useState<HeaderContent>(defaultHeader);
	const [footer, setFooter] = useState<FooterContent>(defaultFooter);
	const [video, setVideo] = useState<VideoContent>(defaultVideo);
	const [site, setSite] = useState<SiteContent>(defaultSite);
	const [seo, setSeo] = useState<SEOContent>(defaultSEO);
	const [serviceImages, setServiceImages] = useState<Record<string, string>>(defaultServiceImages);
	const [blogs, setBlogs] = useState<BlogPost[]>(blogPosts);
	const [isLoading, setIsLoading] = useState(true);
	const [isDbInitialized, setIsDbInitialized] = useState(false);
	const isDbInitializedRef = useRef(false);

	useEffect(() => {
		isDbInitializedRef.current = isDbInitialized;
	}, [isDbInitialized]);

	// Check if Firebase is configured
	const isFirebaseConfigured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY);

	useEffect(() => {
		if (!isFirebaseConfigured) {
			setIsLoading(false);
			return;
		}

		// Listen to single-doc collections
		const unsubs: (() => void)[] = [];

		const listenDoc = <T,>(path: string, docId: string, setter: (val: T) => void, fallback: T) => {
			try {
				const unsub = onSnapshot(
					doc(db, path, docId),
					(snap) => {
						if (snap.exists()) {
							setter({ ...fallback, ...snap.data() } as T);
							if (path === "content" && docId === "site") {
								setIsDbInitialized(true);
							}
						}
					},
					(error) => {
						console.warn(`Firestore listen error for ${path}/${docId}:`, error);
						setter(fallback);
					}
				);
				unsubs.push(unsub);
			} catch {
				setter(fallback);
			}
		};

		const listenCollection = <T extends { id: string },>(
			path: string,
			setter: (val: T[]) => void,
			fallback: T[]
		) => {
			try {
				const unsub = onSnapshot(
					collection(db, path),
					(snap) => {
						if (!snap.empty) {
							const items = snap.docs.map((d) => ({ ...d.data(), id: d.id } as T));
							setter(items);
						} else {
							if (isDbInitializedRef.current) {
								setter([]);
							} else {
								setter(fallback);
							}
						}
					},
					(error) => {
						console.warn(`Firestore listen error for ${path}:`, error);
						setter(fallback);
					}
				);
				unsubs.push(unsub);
			} catch {
				setter(fallback);
			}
		};

		// Single docs
		listenDoc<HeroContent>("content", "hero", setHero, defaultHero);
		listenDoc<ContactContent>("content", "contact", setContact, defaultContact);
		listenDoc<SocialsContent>("content", "socials", setSocials, defaultSocials);
		listenDoc<HeaderContent>("content", "header", setHeader, defaultHeader);
		listenDoc<FooterContent>("content", "footer", setFooter, defaultFooter);
		listenDoc<VideoContent>("content", "video", setVideo, defaultVideo);
		listenDoc<SiteContent>("content", "site", setSite, defaultSite);
		listenDoc<Record<string, string>>("content", "service_images", setServiceImages, defaultServiceImages);

		// Collections
		listenCollection<ServiceItem>("services", setServices, defaultServices);
		listenCollection<PortfolioItem>("portfolio", setPortfolio, []);
		listenCollection<FAQItem>("faq", setFaq, []);
		listenCollection<TestimonialItem>("testimonials", setTestimonials, []);
		listenCollection<TeamMember>("team", setTeamMembers, defaultTeam);
		listenCollection<BlogPost>("blogs", setBlogs, blogPosts);

		// SEO — read all docs in seo collection
		try {
			const unsub = onSnapshot(
				collection(db, "seo"),
				(snap) => {
					if (!snap.empty) {
						const seoData: SEOContent = {};
						snap.docs.forEach((d) => {
							seoData[d.id] = d.data() as { title: string; description: string };
						});
						setSeo((prev) => ({ ...prev, ...seoData }));
					}
				},
				() => {
					// Keep defaults
				}
			);
			unsubs.push(unsub);
		} catch {
			// Keep defaults
		}

		// Small delay to let first snapshots arrive
		const timer = setTimeout(() => setIsLoading(false), 800);

		return () => {
			unsubs.forEach((u) => u());
			clearTimeout(timer);
		};
	}, [isFirebaseConfigured, isDbInitialized]);

	// ─── CRUD helpers for admin panel ─────────────────────────────────────
	const updateDocument = useCallback(
		async (collectionName: string, docId: string, data: Record<string, unknown>) => {
			const cleanData = sanitizeData(data);
			const ref = doc(db, collectionName, docId);
			const snap = await getDoc(ref);
			if (snap.exists()) {
				await updateDoc(ref, cleanData);
			} else {
				await setDoc(ref, cleanData);
			}
		},
		[]
	);

	const addDocument = useCallback(
		async (collectionName: string, docId: string, data: Record<string, unknown>) => {
			const cleanData = sanitizeData(data);
			await setDoc(doc(db, collectionName, docId), cleanData);
		},
		[]
	);

	const removeDocument = useCallback(
		async (collectionName: string, docId: string) => {
			await deleteDoc(doc(db, collectionName, docId));
		},
		[]
	);

	const refreshCollection = useCallback(
		async (collectionName: string) => {
			const snap = await getDocs(collection(db, collectionName));
			const items = snap.docs.map((d) => ({ ...d.data(), id: d.id }));

			switch (collectionName) {
				case "services":
					setServices(items as ServiceItem[]);
					break;
				case "portfolio":
					setPortfolio(items as PortfolioItem[]);
					break;
				case "faq":
					setFaq(items as FAQItem[]);
					break;
				case "testimonials":
					setTestimonials(items as TestimonialItem[]);
					break;
				case "team":
					setTeamMembers(items as TeamMember[]);
					break;
				case "blogs":
					setBlogs(items as BlogPost[]);
					break;
			}
		},
		[]
	);

	return (
		<ContentContext.Provider
			value={{
				hero,
				contact,
				socials,
				services,
				portfolio,
				faq,
				testimonials,
				teamMembers,
				header,
				footer,
				video,
				site,
				seo,
				serviceImages,
				blogs,
				isLoading,
				updateDocument,
				addDocument,
				removeDocument,
				refreshCollection,
			}}
		>
			{children}
		</ContentContext.Provider>
	);
}

// ─── Hook ───────────────────────────────────────────────────────────────────
export function useContent() {
	const ctx = useContext(ContentContext);
	if (!ctx) {
		throw new Error("useContent must be used within <ContentProvider>");
	}
	return ctx;
}
