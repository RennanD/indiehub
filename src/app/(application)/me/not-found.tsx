import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gradient } from "@/components/ui/gradient";

export default function DashboardNotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Gradient background */}
      <Gradient position="fixed" />

      <main className="relative z-10 flex flex-col items-center justify-center px-5 text-center max-w-2xl mx-auto">
        <div className="animate-fade-in">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
            <FileQuestion className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Página não encontrada
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            A página que você está procurando não existe. Verifique a URL ou
            volte ao dashboard.
          </p>

          <Button asChild size="lg" className="shadow-lg">
            <Link href="/me">Voltar ao dashboard</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
