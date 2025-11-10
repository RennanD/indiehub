import Image from "next/image";
import heroImage from "@/assets/images/hero-image.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="pb-20 pt-6 bg-foreground md:pt-20">
      <div className="w-full max-w-7xl mx-auto px-5 flex flex-col justify-between gap-10 md:flex-row md:items-center">
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold md:text-5xl max-w-[634px]">
              Mostre seus projetos para o mundo e descubra quais estão
              crescendo.
            </h1>
            <p className="text-text-muted text-lg max-w-[510px]">
              Crie sua página pessoal com todos os seus projetos em um só lugar.
              Acompanhe acessos, descubra os canais que mais trazem visitas e
              aprenda o que realmente funciona.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <Input
                placeholder="my-projects"
                prefix="https://indiehub.site/"
              />
            </div>
            <Button className="md:w-fit">Criar</Button>
          </div>
        </div>

        <div className="flex justify-center items-center w-full">
          <Image src={heroImage} alt="Hero image" width={320} />
        </div>
      </div>
    </section>
  );
}
