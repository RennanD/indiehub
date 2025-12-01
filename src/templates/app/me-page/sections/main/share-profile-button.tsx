"use client";

import { Share } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CONSTANTS } from "@/shared/constants";

export function ShareProfileButton({ slug }: { slug: string }) {
  function copyToClipboard() {
    const url = `${CONSTANTS.basePath}/${slug}`;
    navigator.clipboard.writeText(url);

    toast.success("Link copiado!", {
      description: "Agora você pode compartilhar seu perfil com o mundo.",
    });
  }

  return (
    <Button variant="outline" size="icon" onClick={copyToClipboard}>
      <Share className="w-4 h-4" />
    </Button>
  );
}
