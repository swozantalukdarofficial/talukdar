import { useState, useRef, useEffect } from "react";
import { X, MessageSquare, Sparkles } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { db } from "../lib/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

import { ChatMessage, ChatTab } from "./chat/types";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessagesTab } from "./chat/ChatMessagesTab";
import { ChatArticlesTab } from "./chat/ChatArticlesTab";
import { ChatSearchTab } from "./chat/ChatSearchTab";
import { ChatInput } from "./chat/ChatInput";
import { WhatsAppTab } from "./chat/WhatsAppTab";
import { ToastPopup, ToastNotice } from "./chat/ToastPopup";
import { GreetingCallout } from "./chat/GreetingCallout";

function generateClientSmartReply(userQuery: string, userName?: string): string {
	const rawQuery = userQuery.trim();
	const query = rawQuery.toLowerCase();
	const nameStr = userName || "there";

	const isBanglaScript = /[\u0980-\u09FF]/.test(rawQuery);
	const isBanglish = /kemon|obostha|bhai|vai|bhaiya|bhaia|koto|dam|kaz|ki|amr|apnr|apne|tumi|apnar|namba|dorkar|chai|aso|acho|asi|khobor|korcho|kore|kortasi|bolen/i.test(query);

	// 1. Greetings
	if (/^(h[eiaolxy]+|assalamu|salam|kemon|ki obostha|bro|vai|sir)/i.test(query) || query.includes("heelo") || query.includes("helo") || query.includes("hello") || query.includes("hallo") || (isBanglaScript && (query.includes("হ্যালো") || query.includes("হাই") || query.includes("কেমন")))) {
		if (isBanglaScript) {
			return `👋 হ্যালো ${nameStr}! WeBestOne-এ আপনাকে স্বাগতম। আমি আপনার ডিজিটাল গ্রোথ কনসালট্যান্ট। আপনার ওয়েবসাইট, SEO বা ডিজিটাল মার্কেটিং এ কীভাবে সাহায্য করতে পারি?`;
		}
		if (isBanglish) {
			return `👋 Hello ${nameStr}! WeBestOne-এ স্বাগতম! আমি আপনার Digital Growth Consultant. আপনার ওয়েবসাইট, SEO বা ডিজিটাল মার্কেটিং-এ কীভাবে সাহায্য করতে পারি?`;
		}
		return `👋 Hello ${nameStr}! Welcome to WeBestOne. I'm your Digital Growth Consultant. How can our strategy team help scale your website, SEO, or digital marketing today?`;
	}

	// 1.1 Specific Service Matchers with Direct CTA Links
	if (query.includes("seo") || query.includes("ranking") || query.includes("geo") || query.includes("google rank") || query.includes("chatgpt rank") || query.includes("এসইও")) {
		if (isBanglaScript) {
			return "🚀 AI SEO & GEO Ranking: আমরা Google, ChatGPT এবং Perplexity AI-তে ওয়েবসাইট ১ নম্বর র‍্যাংক করাতে AI-Powered SEO ও GEO অপটিমাইজেশন করি।\n\n👉 সরাসরি দেখুন: [AI SEO & GEO Services](/services/AI-SEO-Service-Agency)\n💬 বিস্তারিত কথা বলতে নক দিন [WhatsApp Chat](https://wa.me/8801815025322)-এ!";
		}
		if (isBanglish) {
			return "🚀 AI SEO & GEO Ranking: আমরা Google, ChatGPT & Perplexity-তে আপনার সাইট Top Rank করাতে AI SEO ও GEO Optimization করি।\n\n👉 সরাসরি দেখুন: [AI SEO & GEO Services](/services/AI-SEO-Service-Agency)\n💬 কাস্টম প্ল্যানের জন্য মেসেজ দিন [WhatsApp Chat](https://wa.me/8801815025322)-এ!";
		}
		return "🚀 AI SEO & GEO Ranking: We optimize your brand to rank #1 on Google, ChatGPT, and Perplexity using AI-powered Generative Engine Optimization (GEO).\n\n👉 Explore: [AI SEO & GEO Services](/services/AI-SEO-Service-Agency)\n💬 Or chat directly on [WhatsApp Chat](https://wa.me/8801815025322)!";
	}

	if (query.includes("shopify") || query.includes("e-commerce") || query.includes("ecommerce") || query.includes("শপিফাই")) {
		if (isBanglaScript) {
			return "🛍️ Shopify Development & SEO: আমরা হাই-কনভার্টিং কাস্টম Shopify স্টোর তৈরি ও অর্গানিক সেলস বাড়ানোর জন্য Shopify SEO সার্ভিস দিই।\n\n👉 স্টোর ডেভেলপমেন্ট: [Shopify Development](/services/shopify-website-development-service)\n👉 শপিফাই এসইও: [Shopify SEO Agency](/services/shopify-seo-service-agency)";
		}
		return "🛍️ Shopify Development & SEO: We design high-converting custom Shopify stores and deliver specialized e-commerce SEO for maximum sales.\n\n👉 Store Development: [Shopify Website Development](/services/shopify-website-development-service)\n👉 Store SEO: [Shopify SEO Agency](/services/shopify-seo-service-agency)";
	}

	if (query.includes("video") || query.includes("reels") || query.includes("shorts") || query.includes("motion") || query.includes("animation") || query.includes("ভিডিও") || query.includes("এডিটিং")) {
		if (isBanglaScript) {
			return "🎬 Video Editing & Motion Graphics: আমরা সোশাল মিডিয়া রিলস, ৩ডি অ্যানিমেশন, ও প্রমোশনাল ভিডিওর জন্য হাই-কোয়ালিটি ভিডিও এডিটিং সার্ভিস দিই।\n\n👉 ভিডিও এডিটিং: [Professional Video Editing](/services/professional-video-editing-services)\n👉 মোশন গ্রাফিক্স: [Motion Graphics Services](/services/motion-graphics-services-company)";
		}
		return "🎬 Video Editing & Motion Graphics: We produce high-converting 2D/3D animations, social media reels, and promotional videos.\n\n👉 Video Editing: [Professional Video Editing](/services/professional-video-editing-services)\n👉 Motion Graphics: [Motion Graphics Services](/services/motion-graphics-services-company)";
	}

	if (query.includes("next.js") || query.includes("react") || query.includes("custom web") || query.includes("software") || query.includes("app") || query.includes("ডেভেলপমেন্ট")) {
		if (isBanglaScript) {
			return "💻 Custom Web & App Development: Next.js, React এবং Node.js দিয়ে তৈরি করি আল্ট্রা-ফাস্ট ও সুপার সিকিউর কাস্টম ওয়েব এপ্লিকেশন।\n\n👉 সরাসরি দেখুন: [Custom Web Development](/services/custom-web-development-services)\n💬 ফ্রি কনসালটেশনের জন্য নক দিন [WhatsApp Chat](https://wa.me/8801815025322)-এ!";
		}
		return "💻 Custom Web & App Development: We engineer ultra-fast, ultra-secure web applications using Next.js, React, Tailwind CSS, and Node.js.\n\n👉 Explore: [Custom Web Development](/services/custom-web-development-services)\n💬 Schedule consultation on [WhatsApp Chat](https://wa.me/8801815025322)!";
	}

	if (query.includes("wordpress") || query.includes("elementor") || query.includes("woocommerce") || query.includes("ওয়ার্ডপ্রেস")) {
		if (isBanglaScript) {
			return "🌐 WordPress Web Development: স্পিড-অপটিমাইজড, কাস্টম-ডিজাইনড ওয়ার্ডপ্রেস সাইট ও ই-কমার্স সলিউশন।\n\n👉 সরাসরি দেখুন: [WordPress Web Development](/services/wordpress-website-development-services)";
		}
		return "🌐 WordPress Web Development: Speed-optimized custom WordPress sites and WooCommerce ecommerce setups.\n\n👉 Explore: [WordPress Web Development](/services/wordpress-website-development-services)";
	}

	if (query.includes("ppc") || query.includes("google ads") || query.includes("facebook ads") || query.includes("paid ads") || query.includes("বিজ্ঞাপন")) {
		if (isBanglaScript) {
			return "🎯 PPC & Paid Ads Management: Google Ads ও Meta (Facebook/Instagram) Ads-এর মাধ্যমে সর্বোচ্চ ROI নিশ্চিত করে সেলস বৃদ্ধি।\n\n👉 সরাসরি দেখুন: [PPC Ads Management](/services/ppc-management-services)";
		}
		return "🎯 PPC & Paid Ads Management: High-ROI targeted Google Ads and Meta Ads campaigns designed to scale qualified leads.\n\n👉 Explore: [PPC Ads Management](/services/ppc-management-services)";
	}

	if (query.includes("social media") || query.includes("smm") || query.includes("instagram") || query.includes("facebook page") || query.includes("সোশ্যাল")) {
		if (isBanglaScript) {
			return "📱 Social Media Marketing: অর্গানিক গ্রোথ, কন্টেন্ট স্ট্র্যাটেজি এবং ব্র্যান্ড বিল্ডিং সোশ্যাল মিডিয়া প্ল্যাটফর্মে।\n\n👉 সরাসরি দেখুন: [Social Media Marketing](/services/social-media-marketing-agency)";
		}
		return "📱 Social Media Marketing: Full strategy, creative content management, and audience growth across all social platforms.\n\n👉 Explore: [Social Media Marketing Agency](/services/social-media-marketing-agency)";
	}

	if (query.includes("ui/ux") || query.includes("ui ux") || query.includes("figma") || query.includes("ডিজাইন")) {
		if (isBanglaScript) {
			return "🖌️ UI/UX Web Design: ইউজার-ফ্রেন্ডলি ডিজাইন সিস্টেম ও কনভার্সন অপটিমাইজড UI/UX লেআউট।\n\n👉 সরাসরি দেখুন: [UI/UX Web Design](/services/web-design-service)";
		}
		return "🖌️ UI/UX Web Design: Modern design systems, user-centric wireframes, and conversion-optimized layouts.\n\n👉 Explore: [UI/UX Web Design](/services/web-design-service)";
	}

	if (query.includes("content") || query.includes("copywriting") || query.includes("blog") || query.includes("কন্টেন্ট")) {
		if (isBanglaScript) {
			return "✍️ SEO Content Writing: হাই-ইন্টেন্ট এসইও কপিরাইটিং ও ব্লগ আর্টিকেলের মাধ্যমে গুগলে শীর্ষ স্থান অর্জনের কন্টেন্ট।\n\n👉 সরাসরি দেখুন: [Content Writing Services](/services/content-writing-services)";
		}
		return "✍️ SEO Content Writing: High-intent copy and keyword-rich blog articles designed to convert visitors and rank high on search engines.\n\n👉 Explore: [Content Writing Services](/services/content-writing-services)";
	}

	// 2. Services List Fallback
	if (query.includes("service") || query.includes("offer") || query.includes("kaz") || query.includes("work") || query.includes("web") || query.includes("marketing") || query.includes("সার্ভিস") || query.includes("কাজ") || query.includes("কী কাজ") || query.includes("কি কাজ")) {
		if (isBanglaScript) {
			return `👋 WeBestOne-এর মোট ১২টি স্পেশালিস্ট সার্ভিস (সরাসরি ক্লিক করে বিস্তারিত দেখুন):

1. 📈 [Full Stack Digital Marketing](/services/digital-marketing-agency)
2. 🚀 [AI Driven SEO & GEO](/services/AI-SEO-Service-Agency)
3. 📱 [Social Media Marketing (SMM)](/services/social-media-marketing-agency)
4. 🎯 [PPC & Paid Ads Management](/services/ppc-management-services)
5. 🛍️ [Shopify SEO Services](/services/shopify-seo-service-agency)
6. ✍️ [Content Writing Services](/services/content-writing-services)
7. 🎬 [Professional Video Editing](/services/professional-video-editing-services)
8. 🎨 [Motion Graphics Services](/services/motion-graphics-services-company)
9. 💻 [Custom Web Development](/services/custom-web-development-services)
10. 🌐 [WordPress Web Development](/services/wordpress-website-development-services)
11. 🖌️ [UI/UX Web Design](/services/web-design-service)
12. 🛒 [Shopify Website Development](/services/shopify-website-development-service)

🔗 সব ১২টি সার্ভিস একসাথে দেখতে [সকল সার্ভিসসমূহ](/services) ভিসিট করুন!`;
		}
		if (isBanglish) {
			return `👋 WeBestOne-এর মোট 12টি স্পেশালিস্ট সার্ভিস (সরাসরি যেকোনো সার্ভিসে ক্লিক করে বিস্তারিত দেখুন):

1. 📈 [Full Stack Digital Marketing](/services/digital-marketing-agency)
2. 🚀 [AI Driven SEO & GEO](/services/AI-SEO-Service-Agency)
3. 📱 [Social Media Marketing (SMM)](/services/social-media-marketing-agency)
4. 🎯 [PPC & Paid Ads Management](/services/ppc-management-services)
5. 🛍️ [Shopify SEO Services](/services/shopify-seo-service-agency)
6. ✍️ [Content Writing Services](/services/content-writing-services)
7. 🎬 [Professional Video Editing](/services/professional-video-editing-services)
8. 🎨 [Motion Graphics Services](/services/motion-graphics-services-company)
9. 💻 [Custom Web Development](/services/custom-web-development-services)
10. 🌐 [WordPress Web Development](/services/wordpress-website-development-services)
11. 🖌️ [UI/UX Web Design](/services/web-design-service)
12. 🛒 [Shopify Website Development](/services/shopify-website-development-service)

🔗 সব 12টি সার্ভিস একসাথে দেখতে [Explore All Services](/services) পেজ ভিসিট করুন!`;
		}
		return `👋 Here are all 12 specialized services offered by WeBestOne (click any service to view details):

1. 📈 [Full Stack Digital Marketing](/services/digital-marketing-agency)
2. 🚀 [AI Driven SEO](/services/AI-SEO-Service-Agency)
3. 📱 [Social Media Marketing (SMM)](/services/social-media-marketing-agency)
4. 🎯 [PPC Ads Management](/services/ppc-management-services)
5. 🛍️ [Shopify SEO Agency](/services/shopify-seo-service-agency)
6. ✍️ [Content Writing Services](/services/content-writing-services)
7. 🎬 [Professional Video Editing](/services/professional-video-editing-services)
8. 🎨 [Motion Graphics Services](/services/motion-graphics-services-company)
9. 💻 [Custom Website Development](/services/custom-web-development-services)
10. 🌐 [WordPress Web Development](/services/wordpress-website-development-services)
11. 🖌️ [UI/UX Web Design](/services/web-design-service)
12. 🛒 [Shopify Website Development](/services/shopify-website-development-service)

🔗 View our complete 12-service catalogue on our [Explore All Services](/services) page!`;
	}

	// 3. Pricing & Budget
	if (query.includes("price") || query.includes("cost") || query.includes("taka") || query.includes("charge") || query.includes("budget") || query.includes("koto") || query.includes("rate") || query.includes("dam") || query.includes("দাম") || query.includes("টাকা") || query.includes("খরচ")) {
		if (isBanglaScript) {
			return `💰 WeBestOne Pricing & Proposals:

• 📈 High ROI Guarantee: গড়ে +১৪৫% কনভার্সন বৃদ্ধি অর্জিত হয়।
• 🎯 Custom Tailored Pricing: প্রজেক্টের প্রয়োজন ও স্কেল অনুযায়ী প্রাইসিং নির্ধারিত হয়।
• 🎁 Free Consultation & Audit: ফ্রি সাইট অডিট ও প্রপোজাল পেতে [যোগাযোগ পেজ](/contact-us) ভিসিট করুন।
• 💬 Instant Quote: সরাসরি কথা বলুন আমাদের [WhatsApp Chat](https://wa.me/8801815025322)-এ!`;
		}
		if (isBanglish) {
			return `💰 WeBestOne Pricing & Proposals:

• 📈 High ROI Growth: গড়ে +145% Conversion Boost ডেলিভার করা হয়।
• 🎯 Tailored Pricing: প্রজেক্টের স্কোপ অনুযায়ী কাস্টম কোটেশন তৈরি করা হয়।
• 🎁 Free Custom Audit: ফ্রি স্ট্র্যাটেজি ও প্রপোজালের জন্য [Contact Us Page](/contact-us) ভিসিট করুন।
• 💬 Direct WhatsApp: তাতক্ষণিক উত্তরের জন্য নক দিন [WhatsApp Chat](https://wa.me/8801815025322)-এ!`;
		}
		return `💰 WeBestOne Custom Pricing & Proposals:

• 📈 Proven ROI: Custom solutions built for maximum growth (avg. +145% conversion boost).
• 🎯 Custom Quotations: Tailored based on your project requirements and scope.
• 🎁 Free Proposal: Get a free audit or proposal on our [Contact Us Page](/contact-us).
• 💬 Live Chat: Speak directly with our team on [WhatsApp Chat](https://wa.me/8801815025322)!`;
	}

	// 4. Contact
	if (query.includes("contact") || query.includes("call") || query.includes("number") || query.includes("phone") || query.includes("email") || query.includes("talk") || query.includes("whatsapp") || query.includes("namba") || query.includes("যোগাযোগ") || query.includes("নম্বর")) {
		if (isBanglaScript) {
			return `📞 WeBestOne-এর সাথে যোগাযোগের মাধ্যম:

• 💬 WhatsApp Chat: [Direct WhatsApp](https://wa.me/8801815025322) (+8801815025322)
• 📧 Email Support: [webestone@gmail.com](mailto:webestone@gmail.com)
• 📍 Global Offices: Perth WA (Australia) & Dhaka (Bangladesh)
• 📋 Contact Form: [আমাদের সাথে যোগাযোগ করুন](/contact-us)`;
		}
		if (isBanglish) {
			return `📞 WeBestOne Contact Channels:

• 💬 WhatsApp Chat: [Direct WhatsApp](https://wa.me/8801815025322) (+8801815025322)
• 📧 Email Support: [webestone@gmail.com](mailto:webestone@gmail.com)
• 📍 Office Locations: Perth WA (Australia) & Dhaka (Bangladesh)
• 📋 Online Form: [Contact Us Page](/contact-us)`;
		}
		return `📞 Connect with WeBestOne Growth Team:

• 💬 WhatsApp: [Direct WhatsApp Chat](https://wa.me/8801815025322) (+8801815025322)
• 📧 Email: [webestone@gmail.com](mailto:webestone@gmail.com)
• 📍 Global Offices: Perth WA & Dhaka
• 📋 Message Us: [Contact Us Page](/contact-us)`;
	}

	// 4.1 Urgent Callback / 15-Min Strategy Call Request
	if (query.includes("15-min") || query.includes("callback") || query.includes("call request") || query.includes("urgent call") || query.includes("কথা বলতে চাই") || query.includes("কল দিন")) {
		if (isBanglaScript) {
			return `⚡ WeBestOne ১৫-মিনিট ইনস্ট্যান্ট কল ব্যাক রিকোয়েস্ট:

• 📞 Instant Priority Contact: আমাদের সিনিয়র গ্রোথ টিম আপনাকে সরাসরি ১৫ মিনিটের মধ্যে কল / হোয়াটসঅ্যাপে কানেক্ট করবে।
• 💬 Direct WhatsApp: এখনই কথা বলুন [WhatsApp Chat](https://wa.me/8801815025322)-এ (+8801815025322)।
• 📋 Book Meeting: অডিট বা অনলাইন প্রপোজাল জমা দিতে [যোগাযোগ পেজ](/contact-us) ভিসিট করুন।`;
		}
		return `⚡ WeBestOne 15-Min Priority Strategy Callback:

• 📞 Instant Callback: Our senior growth strategists will connect with you via Phone / WhatsApp.
• 💬 Direct WhatsApp: Chat instantly on [WhatsApp Chat](https://wa.me/8801815025322) (+8801815025322).
• 📋 Schedule Proposal: Submit your site details on our [Contact Us Page](/contact-us).`;
	}

	// 4.2 Niche / Industry Specific Growth Solutions
	if (query.includes("e-commerce") || query.includes("ecommerce") || query.includes("b2b") || query.includes("saas") || query.includes("local business") || query.includes("niche")) {
		if (isBanglaScript) {
			return `🎯 WeBestOne ইন্ডাস্ট্রি-স্পেসিফিক গ্রোথ সলিউশন:

• 🛍️ E-Commerce & Shopify: কাস্টম শপিফাই ডেভেলপমেন্ট, প্রোডাক্ট এসইও এবং সেলস বুস্ট [Shopify SEO](/services/shopify-seo-service-agency)।
• 🏢 B2B & SaaS Growth: হাই-কনভার্টিং Next.js ওয়েব অ্যাপস, AI SEO & GEO র‍্যাংকিং [Custom Web Dev](/services/custom-web-development-services)।
• 🛠️ Local Business: কাস্টম পিপিিসি এডস ও গুগল ম্যাপস লোকাল এসইও [PPC Ads](/services/ppc-management-services)।
• 🔗 Free Audit: আপনার ইন্ডাস্ট্রির জন্য ফ্রি অডিট নিন [যোগাযোগ পেজ](/contact-us)-এ!`;
		}
		return `🎯 WeBestOne Industry-Tailored Growth Ecosystems:

• 🛍️ E-Commerce & Shopify: Shopify SEO, speed optimization & sales conversion boost [Shopify SEO Agency](/services/shopify-seo-service-agency).
• 🏢 B2B & SaaS Software: Next.js/React web apps, Generative AI SEO & GEO ranking #1 [Custom Web Development](/services/custom-web-development-services).
• 🛠️ Local Services: High-ROI target Google/Meta ads & local search optimization [PPC Ads Management](/services/ppc-management-services).
• 🔗 Get Custom Audit: Request tailored proposal on our [Contact Us Page](/contact-us)!`;
	}

	// 5. About Us & Company Info
	if (query.includes("about") || query.includes("company") || query.includes("agency") || query.includes("history") || query.includes("story") || query.includes("who are you") || query.includes("আমাদের সম্পর্কে") || query.includes("কোম্পানি")) {
		if (isBanglaScript) {
			return `🏢 WeBestOne সম্পর্কে বিস্তারিত:

• 🚀 Agency Vision: আমরা AI-Driven Digital Marketing, GEO/SEO Ranking, এবং Custom Web Apps ডেভেলপমেন্ট এজেন্সি।
• 👥 Leadership Team: পরিচালিত হচ্ছে Rozi Osman (Founder) এবং Shipon Talukdar (Lead Developer) দ্বারা।
• 📍 Global Presence: পার্থ (অস্ট্রেলিয়া) ও ঢাকা (বাংলাদেশ)।
• 🔗 Full Story: আমাদের ভিশন ও টিম বিস্তারিত দেখতে [আমাদের সম্পর্কে পেজ](/about-us) ভিসিট করুন!`;
		}
		if (isBanglish) {
			return `🏢 About WeBestOne Agency:

• 🚀 Agency Focus: AI SEO & GEO Ranking, Digital Marketing, and Custom Web & App Development.
• 👥 Executive Leadership: Led by Rozi Osman (Founder & Strategist) and Shipon Talukdar (Lead Developer).
• 📍 Office Locations: Perth WA (Australia) & Dhaka (Bangladesh).
• 🔗 Detailed Bio: আমাদের ভিশন ও ব্যাকগ্রাউন্ড দেখতে [About WeBestOne](/about-us) পেজ ভিসিট করুন!`;
		}
		return `🏢 About WeBestOne Agency:

• 🚀 Agency Mission: We build high-converting digital marketing ecosystems, AI SEO/GEO, and custom web software.
• 👥 Leadership: Founded by Rozi Osman (Growth Strategist) & Shipon Talukdar (System Architect).
• 📍 Presence: Perth WA (Australia) & Dhaka (Bangladesh).
• 🔗 Full Profile: Explore our company history on our [About WeBestOne](/about-us) page!`;
	}

	// 6. Home Page & Main Overview
	if (query.includes("home") || query.includes("homepage") || query.includes("main page") || query.includes("হোম")) {
		if (isBanglaScript) {
			return `🏠 WeBestOne হোমপেজে আপনাকে স্বাগতম!

• 🚀 Core Mission: ডিজিটাল মার্কেটিং, এসইও এবং কাস্টম ওয়েব অ্যাপের মাধ্যমে বিজনেসের দ্রুত গ্রোথ নিশ্চিত করা।
• 🔗 Navigate Home: আমাদের মূল হোমপেজ দেখুন [WeBestOne Home Page](/)
• 📂 Explore Services: আমাদের সব সার্ভিস একসাথে দেখুন [সকল সার্ভিসসমূহ](/services)`;
		}
		return `🏠 Welcome to WeBestOne Home!

• 🚀 Core Mission: Engineering high-converting digital ecosystems and custom software.
• 🔗 Visit Home: Go directly to our [WeBestOne Home Page](/)
• 📂 Explore Services: Browse all solutions on our [Explore All Services](/services) page.`;
	}

	// 7. Work & Portfolio Showcase
	if (query.includes("portfolio") || query.includes("project") || query.includes("case study") || query.includes("client") || query.includes("পোর্টফোলিও") || query.includes("কাজ দেখান")) {
		if (isBanglaScript) {
			return `🏆 WeBestOne পোর্টফোলিও ও ওয়ার্ক কেস স্টাডিজ:

• 📈 GA4 Verified Stats: গড় +১৪৫% কনভার্সন বুস্ট ও +২৫০% অর্গানিক সার্চ ট্রাফিক গ্রোথ।
• 💻 Featured Works: Next.js কাস্টম অ্যাপস, শপিফাই স্টোরস এবং এআই এসইও ক্লায়েন্ট রেজাল্টস।
• 🔗 View Portfolio: আমাদের লাইভ প্রজেক্টসমূহ ও রেজাল্ট দেখতে [আমাদের পোর্টফোলিও](/work) ভিসিট করুন!`;
		}
		return `🏆 WeBestOne Portfolio & Work Showcase:

• 📈 Verified Results: Average +145% conversion growth & +250% organic search traffic boost.
• 💻 Recent Projects: Custom Next.js apps, Shopify e-commerce stores, and AI SEO rankings.
• 🔗 Explore Work: View live client case studies on [Our Work Showcase](/work)!`;
	}

	// 8. Blogs & Industry Insights
	if (query.includes("blog") || query.includes("article") || query.includes("news") || query.includes("guide") || query.includes("ব্লগ")) {
		if (isBanglaScript) {
			return `📰 WeBestOne ব্লগ ও ইন্ডাস্ট্রি ইনসাইটস:

• 💡 Growth Guides: এসইও, এআই মার্কেটিং, শপিফাই সেলস এবং ওয়েব ডেভেলপমেন্ট গাইড।
• 🔗 Read Articles: আমাদের সব আর্টিকেল পড়তে [ব্লগ ও আর্টিকেলস](/blogs) ভিসিট করুন!`;
		}
		return `📰 WeBestOne Blog & Growth Insights:

• 💡 Industry Guides: Actionable strategies on AI SEO, GEO ranking, PPC, and Web Software.
• 🔗 Read Blogs: Browse our latest articles on [Blog & Articles](/blogs)!`;
	}

	// 9. Privacy Policy & Legal Terms
	if (query.includes("privacy") || query.includes("policy") || query.includes("terms") || query.includes("condition") || query.includes("legal") || query.includes("sitemap") || query.includes("প্রাইভেসি") || query.includes("শর্ত")) {
		if (isBanglaScript) {
			return `🔒 WeBestOne প্রাইভেসি পলিসি ও লিগ্যাল ইনফরমেশন:

• 🛡️ Privacy First: আমরা আপনার ক্লায়েন্ট ডাটা ও প্রাইভেসি সর্বোচ্চ সুরক্ষায় রাখি।
• 📜 Terms of Service: প্রজেক্ট ডেলিভারি ও সার্ভিস লেভেল এগ্রিমেন্ট জানতে [টার্মস অ্যান্ড কন্ডিশনস](/terms-and-conditions) দেখুন।
• 🔒 Data Protection: বিস্তারিত জানতে [প্রাইভেসি পলিসি](/privacy-policy) ভিসিট করুন।
• 🗺️ Site Directory: সম্পূর্ণ ওয়েবসাইট স্ট্রাকচার দেখতে [সাইটম্যাপ](/sitemap) দেখুন!`;
		}
		return `🔒 WeBestOne Privacy Policy & Legal Policies:

• 🛡️ Data Protection: Strict confidentiality and enterprise-grade data privacy standards.
• 📜 Terms of Use: Review project terms on our [Terms & Conditions](/terms-and-conditions) page.
• 🔒 Privacy Policy: View complete policy on our [Privacy Policy](/privacy-policy) page.
• 🗺️ Navigation Directory: View full site structure on our [Website Sitemap](/sitemap)!`;
	}

	// 10. Founders
	if (query.includes("founder") || query.includes("ceo") || query.includes("owner") || query.includes("shipon") || query.includes("rozi") || query.includes("team") || query.includes("মালিক")) {
		if (isBanglaScript) {
			return `👥 WeBestOne Leadership Team:

• 👩‍💼 Rozi Osman: Founder & Senior Growth Strategist
• 👨‍💻 Shipon Talukdar: Lead Developer & System Architect
• 🔗 Learn More: আমাদের ইতিহাস ও টিম সম্পর্কে বিস্তারিত জানতে [আমাদের সম্পর্কে পেজ](/about-us) ভিসিট করুন!`;
		}
		return `👥 WeBestOne Leadership Team:

• 👩‍💼 Rozi Osman: Founder & Senior Growth Strategist
• 👨‍💻 Shipon Talukdar: Lead Developer & System Architect
• 🔗 Explore Team: Learn more about our vision on our [About Us Page](/about-us)!`;
	}

	if (isBanglaScript) {
		return `👋 WeBestOne-এ স্বাগতম!

• 🚀 AI SEO & Digital Marketing: আপনার ওয়েবসাইটকে Google-এ শীর্ষে তুলতে কাজ করি।
• 💻 Custom Web Apps: Next.js, React ও Shopify ওয়েব সফটওয়্যার তৈরি করি।
• 🔗 Explore Services: আমাদের সব সার্ভিস দেখতে [সকল সার্ভিসসমূহ](/services) ভিসিট করুন!
• 💬 Direct Chat: কথা বলুন [WhatsApp Chat](https://wa.me/8801815025322)-এ।`;
	}
	if (isBanglish) {
		return `👋 Welcome to WeBestOne!

• 🚀 Digital Growth Ecosystem: AI SEO, Digital Marketing & Shopify Stores build করি।
• 💻 Custom Tech Solutions: Next.js, React & WordPress Web Development.
• 🔗 View Services: সব সার্ভিস দেখতে [Explore All Services](/services) পেজ ভিসিট করুন!
• 💬 Direct WhatsApp: কথা বলুন [WhatsApp Chat](https://wa.me/8801815025322)-এ।`;
	}

	return `👋 Welcome to WeBestOne!

• 🚀 Digital Marketing & SEO: AI-native GEO/SEO and conversion optimization.
• 💻 Custom Software & Web: Next.js, React, WordPress & Shopify development.
• 🔗 Explore Catalogue: Browse our [Explore All Services](/services) page.
• 💬 Live Chat: Chat with our team on [WhatsApp Chat](https://wa.me/8801815025322)!`;
}

export default function AiChatWidget() {
	const { socials } = useContent();
	const [isOpen, setIsOpen] = useState(false);
	const [showGreeting, setShowGreeting] = useState(true);
	const [activeTab, setActiveTab] = useState<ChatTab>("messages");

	const [step, setStep] = useState<"email" | "chat">(() => {
		const savedEmail = sessionStorage.getItem("webestone_user_email");
		return savedEmail ? "chat" : "email";
	});

	const [selectedLang, setSelectedLang] = useState<string>(() => {
		return sessionStorage.getItem("webestone_user_lang") || "English";
	});

	const [userName, setUserName] = useState<string>(() => {
		return sessionStorage.getItem("webestone_user_name") || "";
	});
	const [nameInput, setNameInput] = useState("");

	const [userEmail, setUserEmail] = useState<string>(() => {
		return sessionStorage.getItem("webestone_user_email") || "";
	});
	const [emailInput, setEmailInput] = useState("");

	const [websiteUrl, setWebsiteUrl] = useState<string>(() => {
		return sessionStorage.getItem("webestone_website_url") || "";
	});
	const [websiteInput, setWebsiteInput] = useState("");

	const [formError, setFormError] = useState("");
	const [leadDocId, setLeadDocId] = useState<string | null>(null);
	const [notice, setNotice] = useState<ToastNotice | null>(null);

	const [userGeoLocation, setUserGeoLocation] = useState<{ country: string; countryCode: string; city: string } | null>(() => {
		const saved = sessionStorage.getItem("webestone_user_geo");
		return saved ? JSON.parse(saved) : null;
	});

	useEffect(() => {
		if (userGeoLocation) return;
		const fetchGeo = async () => {
			try {
				const res = await fetch("https://ipapi.co/json/");
				if (res.ok) {
					const data = await res.json();
					if (data.country_name) {
						const geoObj = {
							country: data.country_name || "Unknown",
							countryCode: data.country_code || "",
							city: data.city || "",
						};
						setUserGeoLocation(geoObj);
						sessionStorage.setItem("webestone_user_geo", JSON.stringify(geoObj));
					}
				}
			} catch (e) {
				// Fallback silently if API blocked
			}
		};
		fetchGeo();
	}, [userGeoLocation]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [waMessage, setWaMessage] = useState("Hi! How can we help you today?");

	const showToast = (title: string, message: string, type: "info" | "success" | "warning" = "info") => {
		setNotice({ id: Date.now().toString(), title, message, type });
	};

	const [messages, setMessages] = useState<ChatMessage[]>(() => {
		const saved = sessionStorage.getItem("webestone_ai_chat");
		if (saved) {
			try {
				return JSON.parse(saved);
			} catch (e) {
				console.error("Failed to parse saved chat", e);
			}
		}
		return [];
	});

	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		sessionStorage.setItem("webestone_ai_chat", JSON.stringify(messages));
		if (isOpen) {
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages, isOpen]);

	const phoneNumber = socials.whatsapp || "+8801815025322";

	const handleWhatsAppSend = () => {
		const cleanNumber = phoneNumber.replace(/[^0-9+]/g, "");
		const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(waMessage)}`;
		window.open(url, "_blank");
		setIsOpen(false);
	};

	const saveLeadToStorageAndDb = async (name: string, email: string, website: string, lang: string, chatMsgs: ChatMessage[]) => {
		const userText = chatMsgs.filter((m) => m.sender === "user").map((m) => m.text).join(" ");
		const phoneMatch = userText.match(/(\+?\d{1,4}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/g);
		const extractedPhone = phoneMatch ? phoneMatch[0] : "";

		const timeMatch = userText.match(/(\b\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)\b|\b(?:morning|afternoon|evening|tonight|tomorrow)\b)/gi);
		const uniqueTimes = timeMatch ? Array.from(new Set(timeMatch)) : [];
		const preferredTime = uniqueTimes.length > 0 ? uniqueTimes[uniqueTimes.length - 1] : "";

		const hasRequestedContact =
			userText.toLowerCase().includes("contact") ||
			userText.toLowerCase().includes("call") ||
			userText.toLowerCase().includes("phone") ||
			userText.toLowerCase().includes("whatsapp") ||
			userText.toLowerCase().includes("reach out") ||
			userText.toLowerCase().includes("mail") ||
			!!extractedPhone ||
			!!preferredTime;

		const leadData = {
			name: name.trim() || "Visitor",
			email: email.toLowerCase().trim(),
			website: website.trim() || "N/A",
			extractedPhone: extractedPhone || "",
			preferredTime: preferredTime || "",
			hasRequestedContact: hasRequestedContact,
			country: userGeoLocation?.country || "Unknown",
			countryCode: userGeoLocation?.countryCode || "",
			city: userGeoLocation?.city || "",
			language: lang,
			timestamp: new Date().toLocaleString(),
			messages: chatMsgs.map((m) => ({ sender: m.sender, text: m.text, timestamp: m.timestamp })),
		};

		try {
			const existing = localStorage.getItem("webestone_chatbot_leads");
			let leadsList: any[] = existing ? JSON.parse(existing) : [];
			const filtered = leadsList.filter((l) => l.email.toLowerCase() !== email.toLowerCase());
			filtered.unshift(leadData);
			localStorage.setItem("webestone_chatbot_leads", JSON.stringify(filtered));
		} catch (e) {
			console.error("Failed saving lead locally:", e);
		}

		if (db) {
			try {
				if (leadDocId) {
					await updateDoc(doc(db, "chatbot_leads", leadDocId), leadData);
				} else {
					const docRef = await addDoc(collection(db, "chatbot_leads"), leadData);
					setLeadDocId(docRef.id);
				}
			} catch (fsErr) {
				console.warn("Firestore save lead warning:", fsErr);
			}
		}
	};

	const handleLanguageSelect = (lang: string) => {
		setSelectedLang(lang);
		sessionStorage.setItem("webestone_user_lang", lang);
		setStep("email");
	};

	const handleDetailsSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const nameTrimmed = nameInput.trim();
		const emailTrimmed = emailInput.trim().toLowerCase();
		const websiteTrimmed = websiteInput.trim();

		if (!nameTrimmed) {
			setFormError("Please enter your name.");
			return;
		}
		if (!emailTrimmed || !/\S+@\S+\.\S+/.test(emailTrimmed)) {
			setFormError("Please enter a valid email address.");
			return;
		}

		setUserName(nameTrimmed);
		setUserEmail(emailTrimmed);
		setWebsiteUrl(websiteTrimmed);

		sessionStorage.setItem("webestone_user_name", nameTrimmed);
		sessionStorage.setItem("webestone_user_email", emailTrimmed);
		sessionStorage.setItem("webestone_website_url", websiteTrimmed);
		setFormError("");

		const initMsg: ChatMessage = {
			id: "welcome-1",
			sender: "assistant",
			text: `👋 Welcome **${nameTrimmed}**! I'm your **AI Digital Growth Consultant** at WeBestOne.

We engineer high-converting AI digital marketing ecosystems, custom web software (Next.js/React), and search ranking strategies that deliver an average **+145% ROI boost**.

How can we help scale ${websiteTrimmed ? `**${websiteTrimmed}**` : "your business"} today?`,
			timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
		};

		const newMsgs = [initMsg];
		setMessages(newMsgs);
		saveLeadToStorageAndDb(nameTrimmed, emailTrimmed, websiteTrimmed, selectedLang, newMsgs);
		setStep("chat");
	};

	const handleResetSession = () => {
		sessionStorage.removeItem("webestone_ai_chat");
		sessionStorage.removeItem("webestone_user_email");
		sessionStorage.removeItem("webestone_user_name");
		sessionStorage.removeItem("webestone_website_url");
		setMessages([]);
		setStep("email");
		setUserName("");
		setUserEmail("");
		setWebsiteUrl("");
		setNameInput("");
		setEmailInput("");
		setWebsiteInput("");
		setLeadDocId(null);
		showToast("Session Reset", "Chat restarted cleanly. Please introduce yourself!", "info");
	};

	const handleSendAiMessage = async (userText: string) => {
		const query = userText.trim();
		if (!query || isLoading) return;

		const userMsg: ChatMessage = {
			id: Date.now().toString(),
			sender: "user",
			text: query,
			timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
		};

		const updatedMsgs = [...messages, userMsg];
		setMessages(updatedMsgs);
		setInput("");
		setIsLoading(true);

		// Live Internet Search Engine (DuckDuckGo + Wikipedia Real-time Data Fetch)
		let webContext = "";
		try {
			const searchPromise = fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1`).then((r) => (r.ok ? r.json() : null));
			const wikiPromise = fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`).then((r) => (r.ok ? r.json() : null));

			const [searchRes, wikiRes] = await Promise.allSettled([searchPromise, wikiPromise]);

			const snippets: string[] = [];
			if (searchRes.status === "fulfilled" && searchRes.value) {
				const sData = searchRes.value;
				if (sData.AbstractText) {
					snippets.push(sData.AbstractText);
				} else if (sData.RelatedTopics && sData.RelatedTopics.length > 0) {
					const topics = sData.RelatedTopics.slice(0, 3).map((t: any) => t.Text).filter(Boolean).join(" | ");
					if (topics) snippets.push(topics);
				}
			}
			if (wikiRes.status === "fulfilled" && wikiRes.value && wikiRes.value.extract) {
				snippets.push(wikiRes.value.extract.slice(0, 300));
			}

			if (snippets.length > 0) {
				webContext = `\n[LIVE INTERNET SEARCH CONTEXT]: ${snippets.join("\n")}`;
			}
		} catch (err) {
			// Internet search fallback
		}

		const systemPromptWithLang = `You are an elite, highly persuasive Digital Growth Consultant representing WeBestOne agency (WeBestOne Growth & Strategy Team). Client's name is "${userName || "Valued Client"}".

LEADERSHIP & NAMING RULE:
- General Offers & Calls: ALWAYS use "WeBestOne Growth Team", "WeBestOne Strategy Team", or "WeBestOne Contact Team" when offering calls, audits, or proposals.
- Direct Founder / CEO / Leadership Queries: ONLY when a user explicitly asks about the Founder, CEO, Lead Developer, or leadership team, provide the exact names:
  • Founder & Senior Growth Strategist: Rozi Osman
  • Lead Developer & Architect: Shipon Talukdar

AUTOMATIC LEAD & CONTACT CAPTURE RULE:
- If a customer asks us to "contact me", "call me", "reach out to me", "send email", or requests a consultation/quote:
  1. Ask for their preferred Phone Number, Email, or WhatsApp number if not provided.
  2. Confirm warmly: "Thank you! I have forwarded your contact request to our WeBestOne Growth Team. We will review your project and get in touch with you directly!"

DEEP AI REASONING & REAL DATA INTELLIGENCE DIRECTIVE:
1. MAXIMUM INTELLECTUAL BRAIN: Analyze the client's specific business model, website URL ("${websiteUrl || "Client Website"}"), and query using deep strategic reasoning.
2. VERIFIED REAL DATA ONLY: Base all answers on verified real data, live web search context, and WeBestOne public knowledge base. Never hallucinate fake facts or robotic filler.
3. CONTEXTUAL PROBLEM SOLVING: Adapt intelligently to the client's needs — whether custom web engineering (Next.js/React/Shopify), organic growth (AI SEO/GEO ranking), or paid scaling (PPC/SMM/Video).
4. HUMAN STRATEGIST PERSONA: Formulate tailored, expert advice that solves the client's exact problem, while guiding them to the right WeBestOne service page using direct 1-click Markdown links.

CLIENT-IMPRESSING CONSULTANCY & CONVERSION STYLE:
- Speak as a top-tier digital growth strategist & tech lead representing WeBestOne agency.
- Primary Objective: Persuade visitors, build brand trust, showcase real ROI (+145% average conversion boost, +250% organic search traffic growth), and convert them into paying clients.
- Always end with a high-converting, low-friction next step (e.g. Free Audit, Custom Strategy Proposal, or 1-on-1 Consultation on WhatsApp).

INTERNET ACCESS PERMISSION:
- FULL INTERNET & LIVE SEARCH ACCESS GRANTED: You have active internet search permission. Use live web information, social media links, and external market references whenever relevant to answer user queries with peak authority.${webContext}

WEBESTONE WEBSITE PUBLIC DATA KNOWLEDGE BASE:
- Agency Name: WeBestOne (Official AI-Powered Digital Marketing & Custom Software Development Agency).
- Locations: Perth WA (Australia) & Dhaka (Bangladesh).
- Leadership Team:
  • Founder & Senior Growth Strategist: Rozi Osman
  • Lead Developer & System Architect: Shipon Talukdar
- All 12 Public Agency Services & Links:
  1. Full Stack Digital Marketing: [Digital Marketing Agency](/services/digital-marketing-agency) — Full-service PPC, Social Ads, SEO & Conversion Optimization.
  2. AI-Driven SEO & GEO: [AI SEO Services](/services/AI-SEO-Service-Agency) — #1 Google ranking, ChatGPT & Perplexity Generative Engine Optimization.
  3. Social Media Marketing (SMM): [Social Media Agency](/services/social-media-marketing-agency) — Campaigns across Facebook, Instagram, LinkedIn & YouTube.
  4. PPC Management (Ads): [PPC Ads Management](/services/ppc-management-services) — High-intent Google & Meta ad campaigns for sales.
  5. Shopify SEO: [Shopify SEO Agency](/services/shopify-seo-service-agency) — E-commerce search visibility, speed & organic sales boost.
  6. Content Writing: [Content Writing Services](/services/content-writing-services) — Persuasive SEO copywriting, blogs & landing pages.
  7. Video Editing: [Professional Video Editing](/services/professional-video-editing-services) — Reels, YouTube videos & promotional ads.
  8. Motion Graphics: [Motion Graphics Services](/services/motion-graphics-services-company) — 2D/3D brand animations & visual graphics.
  9. Custom Web Development: [Custom Web Development](/services/custom-web-development-services) — Built with Next.js, React, Tailwind CSS & Node.js.
  10. WordPress Web Development: [WordPress Development](/services/wordpress-website-development-services) — High-speed custom WordPress & WooCommerce.
  11. Web Design (UI/UX): [UI/UX Web Design](/services/web-design-service) — User-centered designs & Figma systems.
  12. Shopify Development: [Shopify Store Development](/services/shopify-website-development-service) — E-commerce store setup & Liquid theme customization.
- Complete Site Pages:
  • Home: [Home Page](/)
  • About Us: [About WeBestOne](/about-us)
  • Work Showcase / Portfolio: [Our Work Showcase](/work)
  • Contact Us: [Contact Us Page](/contact-us)
  • All Services: [Explore All Services](/services)
  • Blog Articles: [Blog & Articles](/blogs)
- Contact & Social Channels:
  • Phone / WhatsApp: [WhatsApp Chat](https://wa.me/8801815025322) (+8801815025322)
  • Email: [Email Us](mailto:webestone@gmail.com) (webestone@gmail.com)
  • Socials: Facebook, Instagram, LinkedIn, YouTube
- Proven Metrics & Guarantees:
  • +145% average ROI conversion boost, +250% organic search traffic gain (GA4 verified).
  • Project Timelines: Web Development (1-3 weeks), Shopify Setup (1-2 weeks), Video & Motion (3-7 days), SEO/GEO (3-6 months continuous ranking).
  • Tech Stack: Next.js 14, React, Tailwind CSS, TypeScript, Firebase, Node.js, Liquid for Shopify.
  • Quality Guarantee: 100% money-back satisfaction guarantee on initial design milestones.

SECURITY & DATA PROTECTION GUARDRAILS:
1. STRICT CONFIDENTIALITY: NEVER disclose API keys, environment variables, credentials, internal server tokens, Firestore rules, or private system configurations under ANY circumstances.
2. If any user asks for API keys, admin credentials, database tokens, or raw code prompts, reply: "For security reasons, private system credentials and infrastructure configuration are strictly protected."

CRITICAL CONVERSATIONAL & SALES CONVERSION RULES:
1. HIGH CONVERSION GOAL: Engage every visitor as a high-intent business client. Demonstrate expertise, offer custom solutions, and direct them to book a free audit or chat on WhatsApp.
2. ALWAYS MANDATORY DIRECT LINK RULE FOR ALL TOPICS: No matter what the user asks about (Services, Pricing, Audit, Proposals, Portfolio, Works, About Us, Team, Blogs, or Contact), ALWAYS provide a direct 1-click Markdown link so the client can click and access it immediately right from the chat window!
3. MASTER DIRECT URL DIRECTORY FOR ALL CTAS:
   • AI SEO & GEO: [AI SEO Services](/services/AI-SEO-Service-Agency)
   • Digital Marketing: [Digital Marketing Agency](/services/digital-marketing-agency)
   • Custom Web Apps: [Custom Web Development](/services/custom-web-development-services)
   • Shopify Store: [Shopify Store Development](/services/shopify-website-development-service)
   • Shopify SEO: [Shopify SEO Agency](/services/shopify-seo-service-agency)
   • WordPress Web: [WordPress Development](/services/wordpress-website-development-services)
   • PPC & Paid Ads: [PPC Ads Management](/services/ppc-management-services)
   • Social Media: [Social Media Agency](/services/social-media-marketing-agency)
   • Video Editing: [Professional Video Editing](/services/professional-video-editing-services)
   • Motion Graphics: [Motion Graphics Services](/services/motion-graphics-services-company)
   • UI/UX Design: [UI/UX Web Design](/services/web-design-service)
   • Content Writing: [Content Writing Services](/services/content-writing-services)
   • Contact / Free Audit / Proposal: [Contact Us Page](/contact-us)
   • Portfolio / Case Studies: [Our Work Showcase](/work)
   • About Us / Team: [About WeBestOne](/about-us)
   • Blogs: [Blog & Articles](/blogs)
   • Privacy Policy: [Privacy Policy](/privacy-policy)
   • Terms & Conditions: [Terms & Conditions](/terms-and-conditions)
   • Website Sitemap: [Website Sitemap](/sitemap)
   • WhatsApp Live Chat: [WhatsApp Chat](https://wa.me/8801815025322)
4. STRICT ZERO ASTERISKS RULE: NEVER output raw asterisks (* or **) anywhere in your text! Do NOT write **word** or *word*. Speak naturally and cleanly like a real human senior strategist.
5. MANDATORY POINT-BY-POINT FORMAT: ALWAYS structure responses in clear point-by-point bullet points (using emojis, bullet dots • or numbered lists 1, 2, 3) with clean line breaks. NEVER output plain unformatted text paragraphs.
6. Reply SHORT & EXACT! 1 to 4 bullet points maximum.
7. AUTOMATIC MULTILINGUAL DETECTION: Detect and reply in the EXACT SAME LANGUAGE OR SCRIPT as the user (Bangla, Banglish, or English).
8. Speak warmly as a trusted expert teammate.`;

		const apiMessages = [
			{ role: "system", content: systemPromptWithLang },
			...messages.slice(-6).map((m) => ({
				role: m.sender === "user" ? "user" : "assistant",
				content: m.text,
			})),
			{ role: "user", content: query },
		];

		let botReplyText = "";

		try {
			// 0. Primary Secure Serverless API Route (/api/chat) with JSON check & 3s timeout
			try {
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 3000);
				const serverRes = await fetch("/api/chat", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					signal: controller.signal,
					body: JSON.stringify({
						messages: updatedMsgs,
						systemPrompt: systemPromptWithLang,
					}),
				});
				clearTimeout(timeoutId);
				const contentType = serverRes.headers.get("content-type");
				if (serverRes.ok && contentType && contentType.includes("application/json")) {
					const serverData = await serverRes.json();
					if (serverData.reply) {
						botReplyText = serverData.reply;
					}
				}
			} catch (srvErr) {
				// Serverless API Route fallback
			}

			// Fallback to client smart reply if server API fails
			if (!botReplyText) {
				botReplyText = generateClientSmartReply(query, userName);
			}

			const botMsg: ChatMessage = {
				id: (Date.now() + 1).toString(),
				sender: "assistant",
				text: botReplyText,
				timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
			};

			const finalMsgs = [...updatedMsgs, botMsg];
			setMessages(finalMsgs);
			saveLeadToStorageAndDb(userName || "Visitor", userEmail || "anonymous", websiteUrl || "N/A", selectedLang, finalMsgs);
		} catch (err) {
			console.error("Chat send error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end font-sans">
			{/* Chat Modal Popup */}
			<div
				className={`mb-3 bg-neutral-950/95 border border-white/10 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] w-[calc(100vw-2.5rem)] sm:w-[390px] h-[550px] max-h-[82vh] flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right transform relative backdrop-blur-2xl ${isOpen
					? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
					: "opacity-0 translate-y-6 scale-95 pointer-events-none"
					}`}
			>
				{/* Top Header with Tabs & Status */}
				<ChatHeader
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					onClose={() => setIsOpen(false)}
					onMinimize={() => setIsOpen(false)}
					onReset={handleResetSession}
				/>

				{/* Floating Custom Toast Notification Overlay */}
				<ToastPopup notice={notice} onClose={() => setNotice(null)} />

				{/* Tab 1: Messages */}
				{activeTab === "messages" && (
					<>
						<ChatMessagesTab
							step={step}
							messages={messages}
							isLoading={isLoading}
							nameInput={nameInput}
							setNameInput={setNameInput}
							emailInput={emailInput}
							setEmailInput={setEmailInput}
							websiteInput={websiteInput}
							setWebsiteInput={setWebsiteInput}
							formError={formError}
							onDetailsSubmit={handleDetailsSubmit}
							onSendMessage={handleSendAiMessage}
							onClose={() => setIsOpen(false)}
							messagesEndRef={messagesEndRef}
						/>

						{step === "chat" && (
							<ChatInput
								input={input}
								setInput={setInput}
								isLoading={isLoading}
								onSubmit={(e) => {
									e.preventDefault();
									handleSendAiMessage(input);
								}}
								onMinimize={() => setIsOpen(false)}
								onShowNotice={showToast}
							/>
						)}
					</>
				)}

				{/* Tab 2: Articles */}
				{activeTab === "articles" && (
					<ChatArticlesTab onClose={() => setIsOpen(false)} />
				)}

				{/* Tab 3: Search */}
				{activeTab === "search" && (
					<ChatSearchTab onClose={() => setIsOpen(false)} />
				)}

				{/* Tab 4: WhatsApp */}
				{activeTab === "whatsapp" && (
					<WhatsAppTab
						waMessage={waMessage}
						setWaMessage={setWaMessage}
						onSendWhatsApp={handleWhatsAppSend}
						phoneNumber={phoneNumber}
					/>
				)}
			</div>

			{/* Preview Callout Bubble when Chat is Closed */}
			{!isOpen && showGreeting && (
				<GreetingCallout
					onOpenChat={() => {
						setIsOpen(true);
						setShowGreeting(false);
					}}
					onDismiss={() => setShowGreeting(false)}
				/>
			)}

			{/* Floating Circular Launcher Toggle Button */}
			<button
				onClick={() => {
					setIsOpen(!isOpen);
					if (!isOpen) setShowGreeting(false);
				}}
				className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border ${isOpen
					? "bg-neutral-900 border-white/20 text-white"
					: "bg-neon-green border-neon-green text-black shadow-[0_0_25px_rgba(135,230,92,0.4)]"
					}`}
				aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
			>
				{isOpen ? (
					<X className="w-6 h-6 text-white" />
				) : (
					<MessageSquare className="w-6 h-6 text-black fill-black" />
				)}
			</button>
		</div>
	);
}
