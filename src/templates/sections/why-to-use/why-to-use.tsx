import { ChartBar, Eye, Globe } from "lucide-react";

const ITEMS = [
  {
    icon: ChartBar,
    title: "Analytics de Projetos",
    description:
      "Acompanhe o engajamento dos visitantes e entenda como as pessoas interagem com seus projetos.",
  },
  {
    icon: Globe,
    title: "Centralize seus Projetos",
    description:
      "Tenha todos os seus projetos centralizados em um só lugar, de forma organizada e fácil de acessar.",
  },
  {
    icon: Eye,
    title: "Aumente sua Visibilidade",
    description:
      "Com o ShortDev, você pode compartilhar seus projetos em diferentes redes sociais e plataformas.",
  },
];

export default function WhyToUseSection() {
  return (
    <section className="py-20">
      <div className="w-full max-w-7xl mx-auto px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            Divulgar é tão importante quanto criar.
          </h2>
          <p className="text-text-muted text-lg max-w-[510px]">
            Você já finalizou um projeto incrível, agora é hora de colocá-lo
            diante das pessoas certas.
          </p>

          <div className="h-px w-[73px] bg-text-muted"></div>
        </div>

        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <li
                key={item.title}
                className="flex flex-col gap-3 p-6 rounded-lg border border-text-muted/20"
              >
                <Icon className="size-6 text-primary" />
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-text-muted">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
