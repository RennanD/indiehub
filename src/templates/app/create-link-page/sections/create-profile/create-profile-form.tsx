"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { createProfile } from "@/actions/create-profile";
import { verifyLink } from "@/actions/verify-link";
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
import { cn, generateSlug } from "@/lib/utils";
import {
  type CreateLinkSchema,
  createLinkSchema,
} from "@/validations/create-link.schema";

export function CreateProfileForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  const form = useForm<CreateLinkSchema>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      slug: "",
    },
  });

  const {
    handleSubmit,

    formState: { errors, isSubmitting },
  } = form;

  const { field: slugField } = useController({
    name: "slug",
    control: form.control,
  });

  const handleChangeSlug = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    slugField.onChange(generateSlug(value));
  };

  async function onSubmit(data: CreateLinkSchema) {
    if (data.slug === "me") {
      setErrorMessage("O slug 'me' é reservado para o perfil do usuário");
      return;
    }

    const linkExists = await verifyLink(data.slug);

    if (linkExists) {
      setErrorMessage("Desculpe, esse link já está em uso");
      return;
    }

    const isProfileCreated = await createProfile(data.slug);
    if (!isProfileCreated) {
      setErrorMessage("Desculpe, ocorreu um erro ao criar seu perfil");
      return;
    }

    router.push("/me");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Crie seu perfil</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para criar seu perfil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <InputGroup
              className={cn({
                "border-destructive": errors.slug,
              })}
            >
              <InputGroupInput
                placeholder="seu-nome"
                className="pl-1"
                onChange={handleChangeSlug}
                value={slugField.value}
              />
              <InputGroupAddon>
                <InputGroupText>https://indiehub.site/</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {(errors.slug || errorMessage) && (
              <span className="text-destructive text-sm" role="alert">
                {errors.slug?.message || errorMessage}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Criar minha página
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
