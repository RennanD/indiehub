"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { updateProfile } from "@/actions/update-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  type EditProfileSchema,
  editProfileSchema,
} from "@/validations/edit-profile-schema";

const SEO_DESCRIPTION_SIZE = 70;

interface EditProfileModalProps {
  children: React.ReactNode;
  userData: {
    profileId: string;
    name: string;
    avatar: string;
    description: string;
  };
}

export function EditProfileModal({
  children,
  userData,
}: EditProfileModalProps) {
  const defaultDescription = userData.description ?? "";

  const [characterCount, setCharacterCount] = useState(
    SEO_DESCRIPTION_SIZE - defaultDescription.length,
  );

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: userData.name,
      avatar: undefined,
      description: userData.description ?? "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const { field: descriptionField } = useController({
    name: "description",
    control: form.control,
  });

  const { field: avatarField } = useController({
    name: "avatar",
    control: form.control,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      avatarField.onChange(file);
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    } else {
      avatarField.onChange(undefined);
      setAvatarUrl(null);
    }
  };

  function handleChangeDescription(value: string) {
    descriptionField.onChange(value);
    setCharacterCount(SEO_DESCRIPTION_SIZE - value.length);
  }

  async function onSubmit(data: EditProfileSchema) {
    try {
      let updatedAvatar: File | undefined;

      if (data.avatar) {
        const compressedImage = await compressImage(data.avatar);
        updatedAvatar = compressedImage as File;
      }

      await updateProfile(userData.profileId, {
        avatar: updatedAvatar,
        name: data.name,
        description: data.description,
      });

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para editar seu perfil
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="avatar" className="cursor-pointer">
                {avatarUrl ? (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <Image
                      src={avatarUrl}
                      alt="Preview do Avatar"
                      fill
                      className="object-cover"
                      onLoad={() => URL.revokeObjectURL(avatarUrl)}
                    />
                  </div>
                ) : (
                  <Avatar className="size-24 rounded-full">
                    <AvatarImage
                      sizes="100%"
                      className="object-cover"
                      src={userData.avatar}
                      alt={userData.name}
                    />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
              </Label>
              <Input
                id="avatar"
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              <p className="text-xs text-muted-foreground">100 x 100</p>

              {errors.avatar && (
                <span className="text-destructive text-sm" role="alert">
                  {errors.avatar.message}
                </span>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Ex: John Doe"
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

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Descrição</Label>
              <InputGroup
                className={cn({
                  "border-destructive":
                    characterCount < 0 || errors.description,
                })}
              >
                <InputGroupTextarea
                  onChange={(e) => handleChangeDescription(e.target.value)}
                  value={descriptionField.value}
                  placeholder="Conte sobre você"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="text-muted-foreground text-xs">
                    {characterCount} caracteres restantes
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors.description && (
                <span className="text-destructive text-sm" role="alert">
                  {errors.description.message}
                </span>
              )}
              {characterCount < 0 && (
                <span className="text-destructive text-xs">
                  Você atingiu o limite de caracteres
                </span>
              )}
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
