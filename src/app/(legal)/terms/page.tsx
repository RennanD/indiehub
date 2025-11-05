import type { Metadata } from "next";
import { TermsPage } from "@/templates/terms-page";

export const metadata: Metadata = {
  title: "Termos de Uso - ShortDev",
  description: "Termos de uso da plataforma ShortDev",
};

export default function Terms() {
  return <TermsPage />;
}
