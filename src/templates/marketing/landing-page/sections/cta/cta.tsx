import { Button } from "@/components/ui/button";
import { Gradient } from "@/components/ui/gradient";

export function CtaSection() {
  return (
    <section className="py-20 relative">
      <Gradient position="absolute" />
      <div className="w-full max-w-7xl items-center text-center justify-center mx-auto px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="text-2xl font-bold md:text-3xl text-center">
            Pronto para mostrar seu trabalho ao mundo?
          </h2>
          <p className="text-text-muted text-lg max-w-[510px] text-center">
            Junte-se a milhares de criadores e crie um portfólio que se destaca.
            É rápido, fácil e gratuito para começar.
          </p>
        </div>

        <Button>Criar minha página</Button>
      </div>
    </section>
  );
}
