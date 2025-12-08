import { SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gradient } from "@/components/ui/gradient";
import { SparklesCore } from "@/components/ui/sparkles";

export default function ProfileNotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Gradient background */}
      <Gradient position="fixed" />

      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#ffe0c2"
        />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center px-5 text-center max-w-2xl mx-auto">
        <div className="animate-fade-in">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
            <SearchX className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Perfil não encontrado
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            Este perfil não existe ou não está mais disponível. Verifique se o
            link está correto.
          </p>

          <Button asChild size="lg" className="shadow-lg">
            <Link href="/">Voltar à página inicial</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
