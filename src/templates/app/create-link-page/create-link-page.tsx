import Footer from "@/components/footer";
import Header from "@/components/header";
import { CreateProfileSection } from "./sections";

export function CreateLinkPage() {
  return (
    <div className="bg-background-low flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        <CreateProfileSection />
      </main>
      <Footer />
    </div>
  );
}
