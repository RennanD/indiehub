import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="w-full max-w-7xl mx-auto px-5 flex flex-col gap-10">
        <h2 className="text-2xl font-bold md:text-3xl">
          Pronto para mostrar seu trabalho ao mundo?
        </h2>
        <p className="text-text-muted text-lg max-w-[510px]">
          Junte-se a milhares de criadores e crie um portfólio que se destaca. É
          rápido, fácil e gratuito para começar.
        </p>

        <Button>Criar minha página</Button>
      </div>
    </section>
  );
}
