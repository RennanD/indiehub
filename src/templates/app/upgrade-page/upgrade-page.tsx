import Footer from "@/components/footer";
import Header from "@/components/header";
import { PricingSection } from "./sections";

export function UpgradePageTemplate() {
  return (
    <>
      <Header links={[]} />

      <main>
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
