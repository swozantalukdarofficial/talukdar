import { lazy, Suspense } from "react";
import Hero from "../components/Hero";
import TrustedPlatforms from "../components/TrustedPlatforms";

// Lazy load offscreen components to shrink initial bundle size
const MarketAnalysis = lazy(() => import("../components/MarketAnalysis"));
const ToolsLogoBar = lazy(() => import("../components/ToolsLogoBar"));
const ServiceGrid = lazy(() => import("../components/ServiceGrid"));
const Comparison = lazy(() => import("../components/Comparison"));
const AuditCTA = lazy(() => import("../components/AuditCTA"));
const WhyChooseUs = lazy(() => import("../components/WhyChooseUs"));
const IndustryExpertise = lazy(() => import("../components/IndustryExpertise"));
const SuccessStories = lazy(() => import("../components/SuccessStories"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const WorkingProcess = lazy(() => import("../components/WorkingProcess"));
const AboutUs = lazy(() => import("../components/AboutUs"));
const FAQ = lazy(() => import("../components/FAQ"));
const NewsletterCTA = lazy(() => import("../components/NewsletterCTA"));
const LatestInsights = lazy(() => import("../components/LatestInsights"));

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
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does it take to see results?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Paid campaigns on Google Ads and Meta Ads typically show measurable results in 4 to 6 weeks. Organic Search Engine Optimization and content marketing build compounding returns over 3 to 6 months. We share weekly performance updates from day one so you always know where you stand."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer custom AI marketing plans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every plan is built around your specific industry, audience, budget, and goals. No templates. No copy-paste strategies. Every campaign we run is tailored after a discovery audit."
          }
        },
        {
          "@type": "Question",
          "name": "What is a Free Marketing Audit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A no-commitment review of your website performance, SEO health, social media engagement, and ad spend efficiency. You receive a clear report identifying exactly where you are losing revenue and what to fix first."
          }
        },
        {
          "@type": "Question",
          "name": "How do you track success?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Through real-time dashboards connected to Google Analytics, Google Search Console, Meta Ads Manager, and our internal AI reporting tools. You see every metric live, 24/7. No monthly PDF surprises."
          }
        },
        {
          "@type": "Question",
          "name": "Which industries do you specialize in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "E-Commerce, SaaS & Tech, and Ed-Tech are our strongest verticals with proven case studies. We also work with Real Estate, Energy, and NGO clients on a project basis."
          }
        }
      ]
    }
  ]
};

import DeferredSection from "../components/DeferredSection";

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

      <DeferredSection minHeight="500px">
        <Suspense fallback={null}>
          <MarketAnalysis />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="150px">
        <Suspense fallback={null}>
          <ToolsLogoBar />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="600px">
        <Suspense fallback={null}>
          <ServiceGrid initialServices={services} />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="500px">
        <Suspense fallback={null}>
          <Comparison />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="300px">
        <Suspense fallback={null}>
          <AuditCTA />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="500px">
        <Suspense fallback={null}>
          <WhyChooseUs />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="400px">
        <Suspense fallback={null}>
          <IndustryExpertise />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="500px">
        <Suspense fallback={null}>
          <SuccessStories />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="400px">
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="600px">
        <Suspense fallback={null}>
          <WorkingProcess />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="500px">
        <Suspense fallback={null}>
          <AboutUs />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="500px">
        <Suspense fallback={null}>
          <FAQ />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="250px">
        <Suspense fallback={null}>
          <NewsletterCTA />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="500px">
        <Suspense fallback={null}>
          <LatestInsights initialPosts={posts} />
        </Suspense>
      </DeferredSection>
    </main>
  );
}
