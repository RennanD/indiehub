import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SuccessStep() {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="size-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl">Tudo pronto!</CardTitle>
        <CardDescription className="text-base">
          Seu perfil está configurado. Agora você pode começar a usar o
          IndieHub!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button asChild size="lg">
          <Link href="/me">Ir para o Dashboard</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
