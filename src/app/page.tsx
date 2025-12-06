import type { Metadata } from "next";
import { LandingPage } from "@/templates/marketing/landing-page";

export const metadata: Metadata = {
  title: "Mostre seus projetos para o mundo | IndieHub",
  description:
    "Crie sua página e comece a compartilhar seus projetos e acompanhe as métricas detalhadas de cada um.",
  alternates: {
    canonical: "https://indhub.in/",
  },
  keywords: [
    " portfólio de projetos",
    "link na bio",
    "encurtador de links personalizados",
    "página para divulgar projetos",
    "analytics para projetos digitais",
    "rastrear visitas de projetos",
    "vitrine de projetos online",
    "link na bio para criadores",
    "página de portfólio para indie hackers",
    "projetar portfólio online",
    "shortlink para projeto web",
    "rastreamento de tráfego para projetos",
    "link curto para landing de projeto",
    "mostrar meus projetos online",
    "centralizar todos meus projetos digitalmente",
    "compartilhar projetos com link único",
    "UTM automática para links de projeto",
    "painel de analytics para makers",
    "construir portfólio web rápido",
    "domain shortlink para startup solo",
    "vitrine de ideias e projetos digitais",
    "ferramenta para portfólio + shortlinks",
    "como divulgar projetos web facilmente",
    "criar página de portfólio para projetos digitais",
    "rastrear visitas de landing de projeto",
    "link na bio dev designer indie hacker",
    "link curto personalizado para criador digital",
    "analytics simplificado para projetos side-hustle",
    "compartilhar landing de oferta com shortlink",
    "portfolio link único para mostrar todos meus projetos",
  ],
};

export default function Home() {
  return <LandingPage />;
}
