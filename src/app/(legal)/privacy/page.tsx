import type { Metadata } from "next";
import { PrivacyPage } from "@/templates/privacy-page";

export const metadata: Metadata = {
  title: "Política de Privacidade - IndieHub",
  description: "Política de privacidade da plataforma IndieHub",
};

export default function Privacy() {
  return <PrivacyPage />;
}
