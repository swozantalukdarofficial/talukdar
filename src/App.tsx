import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundEffects from "./components/BackgroundEffects";
import WhatsAppChat from "./components/WhatsAppChat";
import ScrollToTop from "./components/ScrollToTop";

// ── Eager load: only the homepage loads instantly
import HomePage from "./pages/HomePage";

// ── Lazy load: all other pages load only when navigated to
const WorkPage                  = lazy(() => import("./pages/WorkPage"));
const AboutPage                 = lazy(() => import("./pages/AboutPage"));
const ContactPage               = lazy(() => import("./pages/ContactPage"));
const BlogsPage                 = lazy(() => import("./pages/BlogsPage"));
const BlogDetailPage            = lazy(() => import("./pages/BlogDetailPage"));
const ServicesPage              = lazy(() => import("./pages/ServicesPage"));
const ServiceDetailPage         = lazy(() => import("./pages/ServiceDetailPage"));
const ContentWritingPage        = lazy(() => import("./pages/ContentWritingPage"));
const DigitalMarketingPage      = lazy(() => import("./pages/DigitalMarketingPage"));
const ShopifySeoPage            = lazy(() => import("./pages/ShopifySeoPage"));
const VideoEditingPage          = lazy(() => import("./pages/VideoEditingPage"));
const PPCPage                   = lazy(() => import("./pages/PPCPage"));
const SocialMediaMarketingPage  = lazy(() => import("./pages/SocialMediaMarketingPage"));
const AiSeoPage                 = lazy(() => import("./pages/AiSeoPage"));
const SeoPage                   = lazy(() => import("./pages/SeoPage"));
const WordpressDevelopmentPage  = lazy(() => import("./pages/CustomwebsiteDevelopmentPage"));
const WordpressServicePage      = lazy(() => import("./pages/WordpressServicePage"));
const NotFoundPage              = lazy(() => import("./pages/NotFoundPage"));
const TermsAndConditionsPage    = lazy(() => import("./pages/TermsAndConditionsPage"));
const PrivacyPolicyPage         = lazy(() => import("./pages/PrivacyPolicyPage"));
const MotionGraphicsPage        = lazy(() => import("./pages/MotionGraphicsPage"));
const UiUxDesignPage            = lazy(() => import("./pages/UiUxDesignPage"));
const ShopifyDevelopmentPage    = lazy(() => import("./pages/ShopifyDevelopmentPage"));
const SitemapPage               = lazy(() => import("./pages/SitemapPage"));

// ── Minimal fallback while page chunks load
function PageLoader() {
	return (
		<div className="min-h-screen bg-black flex items-center justify-center">
			<div className="w-8 h-8 border-2 border-neon-green/30 border-t-neon-green rounded-full animate-spin" />
		</div>
	);
}

export default function App() {
	return (
		<BrowserRouter>
      <ScrollToTop />
			<div className="relative min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
				<BackgroundEffects />
				<Header />
				<Suspense fallback={<PageLoader />}>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/work" element={<WorkPage />} />
						<Route path="/about-us" element={<AboutPage />} />
						<Route path="/contact-us" element={<ContactPage />} />
						<Route path="/blogs" element={<BlogsPage />} />
						<Route path="/blogs/:id" element={<BlogDetailPage />} />
						<Route path="/services" element={<ServicesPage />} />
						
						{/* Specific Service Pages */}
						<Route path="/services/digital-marketing-agency" element={<DigitalMarketingPage />} />
						<Route path="/services/AI-SEO-Service-Agency" element={<SeoPage />} />
						<Route path="/services/shopify-seo-service-agency" element={<ShopifySeoPage />} />
						<Route path="/services/professional-video-editing-services" element={<VideoEditingPage />} />
						<Route path="/services/ppc-management-services" element={<PPCPage />} />
						<Route path="/services/social-media-marketing-agency" element={<SocialMediaMarketingPage />} />
						<Route path="/services/shopify-website-development-service" element={<ShopifyDevelopmentPage />} />
						<Route path="/services/custom-web-development-services" element={<WordpressDevelopmentPage />} />
						<Route path="/services/wordpress-website-development-services" element={<WordpressServicePage />} />
						<Route path="/services/content-writing-services" element={<ContentWritingPage />} />
						<Route path="/services/motion-graphics-services-company" element={<MotionGraphicsPage />} />
						<Route path="/services/web-design-service" element={<UiUxDesignPage />} />
						<Route path="/services/ai-seo" element={<AiSeoPage />} />
						
						{/* Dynamic Service Detail Page (Catch-all for other services) */}
						<Route path="/services/:slug" element={<ServiceDetailPage />} />
						
						<Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
						<Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
						<Route path="/sitemap" element={<SitemapPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Suspense>
				<Footer />
				<WhatsAppChat />
			</div>
		</BrowserRouter>
	);
}
