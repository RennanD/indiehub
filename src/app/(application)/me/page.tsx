import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { MePageTemplate } from "@/templates/app/me-page";

export const metadata: Metadata = {
  title: "Dashboard | IndieHub",
  description: "Dashboard do usuário",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MePage() {
  return <MePageTemplate />;
}
