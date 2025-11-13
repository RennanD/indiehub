"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export function CreateProfileForm() {
  const hasError = false;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Crie seu perfil</CardTitle>
        <CardDescription>
          Preencha os campos abaixo para criar seu perfil
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-1">
            <InputGroup
              className={cn({
                "border-destructive": hasError,
              })}
            >
              <InputGroupInput placeholder="seu-nome" className="pl-1" />
              <InputGroupAddon>
                <InputGroupText>https://indiehub.site/</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {hasError && (
              <span className="text-destructive text-sm" role="alert">
                esse nome já está em uso
              </span>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Criar minha página
        </Button>
      </CardFooter>
    </Card>
  );
}
