"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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

export function CreateNowForm() {
  const [, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  function handleFormSubmit(data: CreateLinkSchema) {
    if (data.slug === "me") {
      setErrorMessage("O slug 'me' é reservado para o perfil do usuário");
      return;
    }

    setIsLoading(true);

    signIn("google", {
      redirectTo: `/create-link?slug=${data.slug}`,
    });
  }

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col sm:flex-row gap-4 justify-start items-center mb-12"
      >
        <InputGroup
          className={cn({
            "border-destructive": errors.slug,
          })}
        >
          <InputGroupInput
            placeholder="example.com"
            className="pl-1"
            onChange={handleChangeSlug}
            value={slugField.value}
          />
          <InputGroupAddon>
            <InputGroupText>https://indhub.in/</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <Button
          type="submit"
          size="default"
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          Criar minha página{" "}
          {isSubmitting || isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </Button>
      </form>
      {/* {(errors.slug || errorMessage) && (
        <span className="text-destructive text-sm" role="alert">
          {errors.slug?.message || errorMessage}
        </span>
      )} */}
    </div>
  );
}
