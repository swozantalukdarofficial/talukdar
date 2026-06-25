import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import TrustedPlatforms from "../components/TrustedPlatforms";
import ServiceGrid from "../components/ServiceGrid";
import WhyChooseUs from "../components/WhyChooseUs";
import LatestInsights from "../components/LatestInsights";
import MarketAnalysis from "../components/MarketAnalysis";
import AuditCTA from "../components/AuditCTA";
import IndustryExpertise from "../components/IndustryExpertise";
import SuccessStories from "../components/SuccessStories";
import Testimonials from "../components/Testimonials";
import WorkingProcess from "../components/WorkingProcess";
import FAQ from "../components/FAQ";
import ToolsLogoBar from "../components/ToolsLogoBar";
import Comparison from "../components/Comparison";

import NewsletterCTA from "../components/NewsletterCTA";
import SEO from "../components/SEO";
import servicesData from "../data/services.json";
import { blogPosts } from "../data/blogData";

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://webestone.com/#organization",
      "name": "WeBestOne",
      "url": "https://webestone.com",
      "logo": "https://webestone.com/favicon.png",
      "image": "https://webestone.com/uploads/1770469463115-Webestone-icon.png",
      "description": "WeBestOne is a premium AI-powered digital marketing and web development agency in Bangladesh specializing in SEO, PPC, and Custom Web Applications.",
      "telephone": "+8801333600272",
      "email": "webestone@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Mirpur, Dhaka",
        "addressLocality": "Dhaka",
        "addressRegion": "Dhaka Division",
        "postalCode": "1216",
        "addressCountry": "BD"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "23.8018",
        "longitude": "90.3572"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61586166715142",
        "https://www.instagram.com/webest_one/",
        "https://www.linkedin.com/company/webestone",
        "https://www.youtube.com/@webestone"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://webestone.com/#website",
      "url": "https://webestone.com",
      "name": "WeBestOne",
      "description": "Premium Digital Marketing & Development Agency in Bangladesh",
      "publisher": {
        "@id": "https://webestone.com/#organization"
      }
    }
  ]
};

export default function HomePage() {
  const services = servicesData.filter((s) => s.description); 
  const posts = blogPosts.slice(0, 3);

  return (
    <main>
      <SEO 
        title="AI-Powered Solutions & Digital Marketing Agency | WeBestOne" 
        description="Advanced AI powered solutions by an expert AI agency delivering full digital marketing, web development, uiux design and tech solutions for better Google rankings and growth." 
        schemaMarkup={homeSchema}
      />
      <Hero />
      <TrustedPlatforms />
      <MarketAnalysis />
      <ToolsLogoBar />
      <ServiceGrid initialServices={services} />
      <Comparison />
      <AuditCTA />
      <WhyChooseUs />
      <IndustryExpertise />
      <SuccessStories />
      <Testimonials />
      <WorkingProcess />
      <AboutUs />
      <FAQ />
      <NewsletterCTA />
      <LatestInsights initialPosts={posts} />
    </main>
  );
}
