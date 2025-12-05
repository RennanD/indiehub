import { Preview } from "@/components/preview";
import { Android } from "@/components/ui/android";
import { Gradient } from "@/components/ui/gradient";
import { CreateNowForm } from "./create-now-form";

const PROJECTS = [
  {
    name: "Project 1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGdHua81yyP72jTtK-L9lTKq4Zybc7I_r2nQ&s",
    link: "https://indiehub.site/project-1",
  },
  {
    name: "Project 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGdHua81yyP72jTtK-L9lTKq4Zybc7I_r2nQ&s",
    link: "https://indiehub.site/project-2",
  },

  {
    name: "Project 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGdHua81yyP72jTtK-L9lTKq4Zybc7I_r2nQ&s",
    link: "https://indiehub.site/project-3",
  },
  {
    name: "Project 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGdHua81yyP72jTtK-L9lTKq4Zybc7I_r2nQ&s",
    link: "https://indiehub.site/project-4",
  },
];

export function HeroSection() {
  return (
    <section className="relative pb-20 flex items-center justify-center px-4 pt-5">
      <Gradient position="absolute" />
      {/* Grid background effect */}
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

      <div className="max-w-7xl flex flex-col gap-10 md:gap-20 md:flex-row md:justify-between items-center mx-auto relative z-10">
        <div className="text-center md:text-left flex-1">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium">
              Welcome to IndieHub 🎉
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
            Mostre seus projetos para o{" "}
            <span className="text-primary">mundo.</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 text-balance max-w-2xl">
            Crie sua página e comece a compartilhar seus projetos e acompanhe as
            métricas detalhadas de cada um.
          </p>

          <CreateNowForm />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <Android>
            <Preview
              name="John Doe"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              avatar="https://github.com/rennand.png"
              projects={PROJECTS}
            />
          </Android>
        </div>

        {/* <div className="relative flex-1 h-80 md:h-96 rounded-xl overflow-hidden glass-effect border border-border">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded animate-pulse" />
              </div>
              <p className="text-muted-foreground">Demo Preview</p>
              <p className="text-sm text-muted-foreground">
                indiehub.app/seu-perfil
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
