import Footer from "@/components/footer";
import Header from "@/components/header";

import {
  CtaSection,
  FaqSection,
  HeroSection,
  PricingSection,
  WhyToUseSection,
} from "./sections";

const NAV_ITEMS = [
  {
    label: "Por que usar?",
    href: "#features",
  },
  {
    label: "Planos",
    href: "#plans",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];
export function LandingPage() {
  return (
    <>
      <Header links={NAV_ITEMS} />
      <main>
        <HeroSection />
        {/* <ProjectSection /> */}
        <WhyToUseSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
