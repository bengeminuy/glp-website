import { Hero } from "@/components/marketing/hero";
import { FeaturedIn } from "@/components/marketing/featured-in";
import { ProductsGrid } from "@/components/marketing/products-grid";
import { TestimonialSpotlight } from "@/components/marketing/testimonial-spotlight";
import { CalculatorSection } from "@/components/marketing/calculator-section";
import { StatsBand } from "@/components/marketing/stats-band";
import { MetabolismCta } from "@/components/marketing/metabolism-cta";
import { AnimatedStats } from "@/components/marketing/animated-stats";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { SupportSection } from "@/components/marketing/support-section";
import { TestimonialsGrid } from "@/components/marketing/testimonials-grid";
import { FAQ } from "@/components/marketing/faq";
import { Guarantee } from "@/components/marketing/guarantee";
import { GoalSelector } from "@/components/marketing/goal-selector";
import { GuaranteeFeatures } from "@/components/marketing/guarantee-features";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedIn />
      <ProductsGrid />
      <TestimonialSpotlight />
      <CalculatorSection />
      <StatsBand />
      <MetabolismCta />
      <AnimatedStats />
      <HowItWorks />
      <SupportSection />
      <TestimonialsGrid />
      <FAQ />
      <Guarantee />
      <GoalSelector />
      <GuaranteeFeatures />
    </>
  );
}
