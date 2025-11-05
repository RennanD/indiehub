import type { Metadata } from "next";
import { LandingPage } from "@/templates/landing-page";

export const metadata: Metadata = {
  title: "ShortDev",
  description:
    "ShortDev - Mostre seus projetos para o mundo e descubra quais estão crescendo.",
  alternates: {
    canonical: "https://shortdev.site",
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
