import Footer from "@/components/footer";
import Header from "@/components/header";

import { HeroSection, WhyToUseSection } from "./sections";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WhyToUseSection />
      </main>
      <Footer />
    </>
  );
}
