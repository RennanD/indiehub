import { BarChart3, Link2, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Visibilidade sem esforço",
    description:
      "Compartilhe seus projetos e chegue a um público global de makers e criadores.",
  },
  {
    icon: BarChart3,
    title: "Métricas automáticas",
    description:
      "Acompanhe visualizações, cliques e engajamento de cada projeto em tempo real.",
  },
  {
    icon: Link2,
    title: "Links curtos personalizados",
    description:
      "Crie URLs memoráveis e track performance com UTMs automáticas.",
  },
];

export function WhyToUseSection() {
  return (
    <section id="features" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Por que usar o IndieHub
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Facilite a divulgação de seus projetos e acompanhe as métricas
            detalhadas de cada um.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group glass-effect p-8 rounded-xl border border-text-muted/20 hover:border-primary/50 transition-all duration-300"
              >
                <div className="mb-6 inline-flex p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
