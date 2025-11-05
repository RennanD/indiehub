import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FEATURES = [
  "Uma página personalizada para mostrar todos os seus projetos",
  "Links curtos e rastreáveis para cada projeto",
  "Analytics em tempo real com número de visitas e canais de origem",
  "Geração automática de UTMs para divulgar com eficiência",
];

const PLANS = [
  {
    name: "Plano Mensal",
    price: 19.9,
    fullPrice: 29.9,
    highlight: false,
    features: [
      "Todas as funcionalidades incluídas",
      "Cancelamento a qualquer momento",
      "Reembolso garantido em até 7 dias após a primeira assinatura",
    ],
  },
  {
    name: "Plano Anual",
    price: 190.0,
    fullPrice: 290.0,
    highlight: true,
    features: [
      "Tudo do plano mensal",
      "20% de desconto",
      "Acesso garantido por 12 meses",
    ],
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export function PricingSection() {
  return (
    <section className="pt-20 pb-20 bg-background-low" id="plans">
      <div className="w-full max-w-7xl mx-auto px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="text-2xl font-bold md:text-3xl max-w-[650px]">
            Mostre seus projetos, acompanhe os resultados e cresça com dados.
          </h2>
          <p className="text-text-muted text-lg max-w-[750px]">
            Crie sua página de portfólio, compartilhe seus projetos com links
            curtos e veja quais canais trazem mais visitas, tudo em um só lugar.
          </p>
        </div>

        <div className="flex flex-col rounded-lg border border-text-muted/20 md:p-10 p-4 gap-10 md:items-start md:flex-row md:justify-between md:gap-10">
          <ul className="flex flex-col gap-6 max-w-[420px]">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex place-items-baseline gap-4">
                <div className="size-6 shrink-0 rounded-md bg-primary/10 flex items-center justify-center">
                  <Check className="size-4 text-primary" />
                </div>
                <p className="text-lg font-medium text-accent">{feature}</p>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col gap-8 w-full max-w-[520px]">
            {PLANS.map((plan) => {
              const formattedPrice = formatPrice(plan.price);
              const formattedFullPrice = formatPrice(plan.fullPrice);

              return (
                <li
                  key={plan.name}
                  className={cn(
                    "p-6 relative space-y-6 bg-foreground rounded-lg border border-text-muted/20",
                    {
                      "border-primary": plan.highlight,
                    },
                  )}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-primary text-accent px-4 py-1 rounded-full">
                      <span className="text-accent font-medium">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg font-medium">{plan.name}</h3>
                  <div>
                    <span className="text-text-muted line-through text-sm font-medium">
                      {formattedFullPrice}
                    </span>
                    <p className="text-4xl font-bold text-accent">
                      {formattedPrice}
                      <span className="text-base">
                        /{plan.name === "Plano Mensal" ? "mês" : "ano"}
                      </span>
                    </p>
                  </div>

                  <div className="h-px w-full bg-text-muted/20"></div>

                  <ul className="flex flex-col gap-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex place-items-baseline gap-4"
                      >
                        <div className="size-6 shrink-0 rounded-md bg-primary/10 flex items-center justify-center">
                          <Check className="size-4 text-primary" />
                        </div>
                        <p className="text-lg font-medium text-accent">
                          {feature}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={cn("w-full", {
                      "bg-secondary hover:bg-primary transition-colors":
                        !plan.highlight,
                    })}
                  >
                    Assinar {plan.name}
                    <ArrowRight className="size-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
