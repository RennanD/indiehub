import Footer from "@/components/footer";
import Header from "@/components/header";

import { HeroSection, ProjectSection, WhyToUseSection } from "./sections";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProjectSection />
        <WhyToUseSection />
      </main>
      <Footer />
    </>
  );
}
