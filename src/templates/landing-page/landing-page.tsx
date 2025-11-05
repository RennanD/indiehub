import Footer from "@/components/footer";
import Header from "@/components/header";

import {
  CtaSection,
  FaqSection,
  HeroSection,
  PricingSection,
  ProjectSection,
  WhyToUseSection,
} from "./sections";

export function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProjectSection />
        <WhyToUseSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
