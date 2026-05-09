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
import servicesData from "../data/services.json";
import { blogPosts } from "../data/blogData";

export default function HomePage() {
  const services = servicesData.filter((s) => s.description); 
  const posts = blogPosts.slice(0, 3);

  return (
    <main>
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
