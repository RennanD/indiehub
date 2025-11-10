import type { Metadata } from "next";
import { TermsPage } from "@/templates/terms-page";

export const metadata: Metadata = {
  title: "Termos de Uso - IndieHub",
  description: "Termos de uso da plataforma IndieHub",
};

export default function Terms() {
  return <TermsPage />;
}
