import Image from "next/image";
import projectImage from "@/assets/images/project-demo.webp";

export function ProjectSection() {
  return (
    <section className="py-20 bg-background-low" id="demo">
      <div className="w-full max-w-7xl mx-auto px-5 flex items-center flex-col gap-10">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            Seu portfólio. Seus dados. Seu impacto.
          </h2>
          <p className="text-text-muted text-lg max-w-[510px]">
            Acompanhe quantas pessoas visualizaram, de onde vieram e quais
            projetos estão ganhando mais atenção.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border max-w-[992px] border-text-muted/20">
          <Image
            src={projectImage}
            className="w-full h-full object-cover"
            alt="Project demo"
            width={992}
            height={558}
          />
        </div>
      </div>
    </section>
  );
}
