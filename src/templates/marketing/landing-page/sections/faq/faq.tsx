import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = [
  {
    question: "O que é o IndieHub?",
    answer:
      "É uma plataforma onde criadores e indie hackers podem reunir todos os seus projetos em um só link, gerar links curtos e acompanhar o desempenho de cada um.",
  },
  {
    question: "Preciso ser desenvolvedor para usar?",
    answer:
      "Não! Qualquer pessoa que cria projetos digitais pode usar — sejam apps, templates, newsletters, cursos ou ferramentas.",
  },
  {
    question: "Como funcionam as métricas?",
    answer:
      "Cada link criado é automaticamente rastreado, e você pode ver quantas pessoas visitaram e de onde vieram, com UTMs geradas automaticamente.",
  },
  {
    question: "Tem plano gratuito?",
    answer:
      "Você pode testar tudo por 7 dias sem compromisso. Depois disso, basta escolher o plano que melhor se adapta ao seu ritmo de criação.",
  },
  {
    question: "Posso personalizar minha página?",
    answer:
      "Sim! Você pode definir seu nome, bio, imagem e até escolher a ordem dos seus projetos.",
  },
];

export function FaqSection() {
  return (
    <section className="py-20 bg-background-low" id="faq">
      <div className="w-full max-w-7xl mx-auto px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <Accordion type="single" collapsible>
            {FAQ.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
