import { Sparkles } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WelcomeStepProps {
  userName?: string;
}

export function WelcomeStep({ userName }: WelcomeStepProps) {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-primary/10 p-4">
            <Sparkles className="size-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-3xl">
          Bem-vindo IndieHub{userName ? `, ${userName}` : ""}!
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Vamos configurar seu perfil em poucos passos. Este processo é rápido e
          você pode pular qualquer etapa que quiser.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
