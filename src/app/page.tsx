import type { Metadata } from "next";
import { LandingPage } from "@/templates/marketing/landing-page";

export const metadata: Metadata = {
  title:
    "IndieHub – Mostre Seus Projetos Para o Mundo | Portfólio + Links + Métricas",
  description:
    "Crie sua página profissional, centralize todos os seus projetos, use links curtos com UTMs automáticas e acompanhe métricas em tempo real. Ideal para indie hackers e criadores.",
  alternates: {
    canonical: "https://indhub.in/",
  },
  keywords: [
    "indie hackers showcase",
    "página de projetos profissional",
    "analytics para criadores",
    "links rastreáveis com UTM",
    "portfólio de side projects",
    "centralizador de links criativos",
    "encurtador de links com métricas",
    "landing page para criadores digitais",
    "visibilidade para makers",
    "ferramenta para divulgar projetos",
  ],
};

export default function Home() {
  return <LandingPage />;
}
