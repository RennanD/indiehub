"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createProject } from "@/actions/create-project";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { cn, compressImage } from "@/lib/utils";
import {
  type CreateProjectSchema,
  createProjectSchema,
} from "@/validations/create-project-schema";

const SEO_DESCRIPTION_SIZE = 160;

interface ProjectStepProps {
  onNext: (step: "share" | "success", projectId?: string) => void;
  onSkip: (step: "success") => void;
  profileId: string;
}

export function ProjectStep({ onNext, onSkip, profileId }: ProjectStepProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [descriptionSizeError, setDescriptionSizeError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      link: "",
      description: "",
      thumbnail: undefined,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const { field: descriptionField } = useController({
    name: "description",
    control: form.control,
  });

  const { field: thumbnailField } = useController({
    name: "thumbnail",
    control: form.control,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      thumbnailField.onChange(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      thumbnailField.onChange(undefined);
      setPreviewUrl(null);
    }
  };

  function handleChangeDescription(value: string) {
    if (value.length < SEO_DESCRIPTION_SIZE) {
      setDescriptionSizeError("");
    }

    if (value.length > SEO_DESCRIPTION_SIZE) {
      setDescriptionSizeError("O limite de caracteres foi atingido");
    }

    descriptionField.onChange(value);
  }

  async function onSubmit(data: CreateProjectSchema) {
    setIsSubmitting(true);
    const compressedImage = await compressImage(data.thumbnail);

    try {
      const response = await createProject({
        ...data,
        profileId,
        thumbnail: compressedImage as File,
      });

      if (response.status !== "CREATED") {
        toast.error(response.message);
        setIsSubmitting(false);
        return;
      }

      toast.success(response.message);

      // Se o projeto foi criado com sucesso e temos o ID, vai para share
      if (response.projectId) {
        onNext("share", response.projectId);
      } else {
        // Se não tem ID, vai para success
        onNext("success");
      }
    } catch (error) {
      toast.error("Erro ao criar projeto");
      console.error(error);
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Crie seu primeiro projeto</CardTitle>
        <CardDescription>
          Adicione um projeto ao seu perfil para mostrar seu trabalho. Você pode
          adicionar nome, link, descrição e uma imagem.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Nome do Projeto</Label>
              <Input
                id="name"
                placeholder="Ex: Meu Projeto"
                className={cn({
                  "border-destructive": errors.name,
                })}
                {...form.register("name")}
              />
              {errors.name && (
                <span className="text-destructive text-sm" role="alert">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="link">Link do Projeto</Label>
              <Input
                id="link"
                placeholder="Ex: https://meuprojeto.com"
                className={cn({
                  "border-destructive": errors.link,
                })}
                {...form.register("link")}
              />
              {errors.link && (
                <span className="text-destructive text-sm" role="alert">
                  {errors.link.message}
                </span>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Descrição do Projeto</Label>
              <InputGroup
                className={cn({
                  "border-destructive": errors.description,
                })}
              >
                <InputGroupTextarea
                  id="description"
                  placeholder="Conte sobre seu projeto"
                  onChange={(e) => handleChangeDescription(e.target.value)}
                  value={descriptionField.value}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText
                    className={cn("text-muted-foreground text-xs", {
                      "text-destructive": descriptionSizeError,
                    })}
                  >
                    {SEO_DESCRIPTION_SIZE - descriptionField.value.length}{" "}
                    caracteres restantes
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {(errors.description || descriptionSizeError) && (
                <span className="text-destructive text-sm" role="alert">
                  {errors.description?.message || descriptionSizeError}
                </span>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="thumbnail" className="cursor-pointer">
                {previewUrl ? (
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={previewUrl}
                      alt="Preview do Thumbnail"
                      fill
                      className="object-cover rounded-md"
                      onLoad={() => URL.revokeObjectURL(previewUrl)}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 w-full">
                    <div
                      className={cn(
                        "relative flex flex-col gap-2 w-full h-[200px] border border-dashed rounded-md items-center justify-center",
                        {
                          "border-destructive": errors.thumbnail,
                        },
                      )}
                    >
                      <CloudUpload className="size-6 text-muted-foreground" />
                      <p className="text-muted-foreground max-w-[196px] text-center text-sm">
                        Clique para fazer upload da imagem do seu projeto
                      </p>
                    </div>
                    {errors.thumbnail && (
                      <span className="text-destructive text-sm" role="alert">
                        {errors.thumbnail.message}
                      </span>
                    )}
                  </div>
                )}
              </Label>
              <Input
                id="thumbnail"
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onSkip("success")}
              disabled={isSubmitting}
            >
              Pular
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Criando...
                </>
              ) : (
                "Criar Projeto"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
