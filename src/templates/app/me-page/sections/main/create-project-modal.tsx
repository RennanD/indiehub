"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { createProject } from "@/actions/create-project";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export function CreateProjectModal({
  children,
  profileId,
}: {
  children: React.ReactNode;
  profileId: string;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

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
    formState: { errors, isSubmitting },
  } = form;

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

  async function onSubmit(data: CreateProjectSchema) {
    const compressedImage = await compressImage(data.thumbnail);

    try {
      await createProject({
        ...data,
        profileId,
        thumbnail: compressedImage as File,
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Projeto</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar seu projeto
          </DialogDescription>
        </DialogHeader>
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
                  {...form.register("description")}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="text-muted-foreground text-xs">
                    0 caracteres restantes
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors.description && (
                <span className="text-destructive text-sm" role="alert">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Campo de upload de thumbnail do projeto com preview */}
            <div className="grid gap-3">
              <Label htmlFor="thumbnail" className="cursor-pointer">
                {previewUrl ? (
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={previewUrl}
                      alt="Preview do Thumbnail"
                      fill
                      className="object-cover"
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
          <DialogFooter className="flex justify-end gap-2 mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">
              Salvar
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
