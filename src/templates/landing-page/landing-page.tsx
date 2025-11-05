import Footer from "@/components/footer";
import Header from "@/components/header";

import {
  CtaSection,
  FaqSection,
  HeroSection,
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
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
