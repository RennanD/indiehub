import { Check } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Personal",
    price: "R$39,00",
    description: "Perfeito para começar",
    features: [
      "1 projeto",
      "Analytics de perfil e projeto",
      "Links compartilháveis",
      "UTMs automáticas",
    ],
    popular: false,
  },
  {
    name: "Hacker",
    price: "R$99,00",
    description: "Para makers que querem escalar",
    features: [
      "10 projetos",
      "Analytics de perfil e projeto",
      "Links compartilháveis",
      "UTMs automáticas",
      "Suporte prioritário",
    ],
    popular: true,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/50" />
        <svg className="absolute w-full h-full opacity-5">
          <title>Grid background effect</title>
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Planos que crescem com você
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mesmas funcionalidades, diferentes limites. Escolha o plano que
            combina com seu ritmo de criação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "glass-effect border border-primary/50 animate-glow-purple"
                  : "glass-effect border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge>Popular</Badge>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm mb-4">
                  Pague uma vez, use sempre.
                </p>
              </div>

              <Link href="/auth/signup">
                <Button
                  className="w-full mb-8"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  Começar gratuitamente
                </Button>
              </Link>

              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
