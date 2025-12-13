"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateSocialLink } from "@/actions/update-social-link";
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
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  type SocialLinkSchema,
  socialLinkSchema,
} from "@/validations/social-link-schema";

interface EditSocialLinkModalProps {
  children: React.ReactNode;
  platform: string;
  platformName: string;
  currentUrl?: string;
  profileId: string;
  onSuccess?: () => void;
}

const PLATFORM_URL_EXAMPLES: Record<string, string> = {
  x: "https://x.com/seuusuario",
  instagram: "https://instagram.com/seuusuario",
  linkedin: "https://linkedin.com/in/seuusuario",
  tiktok: "https://tiktok.com/@seuusuario",
  threads: "https://threads.net/@seuusuario",
  github: "https://github.com/seuusuario",
};

export function EditSocialLinkModal({
  children,
  platform,
  platformName,
  currentUrl,
  profileId,
  onSuccess,
}: EditSocialLinkModalProps) {
  const router = useRouter();

  const form = useForm<SocialLinkSchema>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      url: currentUrl || "",
      platform: platform as SocialLinkSchema["platform"],
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(data: SocialLinkSchema) {
    const url = data.url?.trim() || null;

    const success = await updateSocialLink(profileId, platform, url);

    if (success) {
      startTransition(() => {
        router.refresh();
        toast.success(`${platformName} atualizado com sucesso`);
      });
    }
  }

  async function handleRemove() {
    const success = await updateSocialLink(profileId, platform, null);

    if (success) {
      startTransition(() => {
        router.refresh();
        onSuccess?.();
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar {platformName}</DialogTitle>
          <DialogDescription>
            Preencha o link da sua conta no {platformName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                placeholder={PLATFORM_URL_EXAMPLES[platform] || "https://..."}
                className={cn({
                  "border-destructive": errors.url,
                })}
                {...register("url")}
              />
              {errors.url && (
                <span className="text-destructive text-sm" role="alert">
                  {errors.url.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <div>
              {currentUrl && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleRemove}
                  disabled={isSubmitting}
                >
                  Remover
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                Salvar
                {isSubmitting && (
                  <Loader2 className="ml-2 size-4 animate-spin" />
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
