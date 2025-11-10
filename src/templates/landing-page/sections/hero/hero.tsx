import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-5">
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

          <div className="flex flex-col sm:flex-row gap-4 justify-start items-center mb-12">
            <InputGroup>
              <InputGroupInput placeholder="example.com" className="pl-1" />
              <InputGroupAddon>
                <InputGroupText>https://indiehub.site/</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <Button
              size="default"
              asChild
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Link href="/auth/signup">
                Criar minha página <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative flex-1 h-80 md:h-96 rounded-xl overflow-hidden glass-effect border border-border">
          {/* Demo preview placeholder */}
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
        </div>
      </div>
    </section>
  );
}
