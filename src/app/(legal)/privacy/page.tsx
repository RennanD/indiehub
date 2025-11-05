import type { Metadata } from "next";
import { PrivacyPage } from "@/templates/privacy-page";

export const metadata: Metadata = {
  title: "Política de Privacidade - ShortDev",
  description: "Política de privacidade da plataforma ShortDev",
};

export default function Privacy() {
  return <PrivacyPage />;
}
