export interface ChatMessage {
	id: string;
	sender: "user" | "assistant";
	text: string;
	timestamp: string;
}

export type ChatTab = "messages" | "articles" | "search" | "whatsapp";

export interface ArticleItem {
	id: string;
	title: string;
	excerpt: string;
	category: string;
	link: string;
	readTime: string;
}

export const HELP_ARTICLES: ArticleItem[] = [
	{
		id: "1",
		title: "Full-Stack Custom Web & Software Development",
		excerpt: "Build high-converting, blazing-fast web applications with Next.js, React, and Tailwind CSS.",
		category: "Development",
		link: "/services/custom-web-development-services",
		readTime: "2 min read",
	},
	{
		id: "2",
		title: "AI-Driven SEO & Organic Growth Strategy",
		excerpt: "Dominate search engine rankings using AI keyword strategies and authoritative backlinks.",
		category: "SEO",
		link: "/services/AI-SEO-Service-Agency",
		readTime: "3 min read",
	},
	{
		id: "3",
		title: "Shopify E-Commerce Store & SEO Optimization",
		excerpt: "Scale online sales with custom Shopify themes, app integrations, and technical SEO.",
		category: "E-Commerce",
		link: "/services/shopify-website-development-service",
		readTime: "2 min read",
	},
	{
		id: "4",
		title: "Book a Free 1-on-1 Growth Consultation",
		excerpt: "Schedule a discussion with founder Rozi Osman & lead developer Shipon Talukdar.",
		category: "Consulting",
		link: "/contact-us",
		readTime: "1 min read",
	},
];
