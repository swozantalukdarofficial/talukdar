import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundEffects from "./components/BackgroundEffects";
import WhatsAppChat from "./components/WhatsAppChat";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ContentWritingPage from "./pages/ContentWritingPage";
import DigitalMarketingPage from "./pages/DigitalMarketingPage";
import ShopifySeoPage from "./pages/ShopifySeoPage";
import VideoEditingPage from "./pages/VideoEditingPage";
import PPCPage from "./pages/PPCPage";
import SocialMediaMarketingPage from "./pages/SocialMediaMarketingPage";
import AiSeoPage from "./pages/AiSeoPage";
import SeoPage from "./pages/SeoPage";
import WordpressDevelopmentPage from "./pages/CustomwebsiteDevelopmentPage";
import WordpressServicePage from "./pages/WordpressServicePage";
import NotFoundPage from "./pages/NotFoundPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import MotionGraphicsPage from "./pages/MotionGraphicsPage";
import UiUxDesignPage from "./pages/UiUxDesignPage";
import ShopifyDevelopmentPage from "./pages/ShopifyDevelopmentPage";
import SitemapPage from "./pages/SitemapPage";

export default function App() {
	return (
		<BrowserRouter>
      <ScrollToTop />
			<div className="relative min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
				<BackgroundEffects />
				<Header />
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
					
					{/* Dynamic Service Detail Page (Catch-all for other services) */}
					<Route path="/services/:slug" element={<ServiceDetailPage />} />
					
					<Route
						path="/terms-and-conditions"
						element={<TermsAndConditionsPage />}
					/>
					<Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
					<Route path="/sitemap" element={<SitemapPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
				<Footer />
				<WhatsAppChat />
			</div>
		</BrowserRouter>
	);
}
