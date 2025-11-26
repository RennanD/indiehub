"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  MessageCircle,
  Send,
  Twitter,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createShortLink,
  getProjectLinks,
  type ShortLink,
} from "@/actions/short-links";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { ProjectData } from "@/server/get-profile-data";

const SOCIAL_NETWORKS = [
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    color: "text-sky-500",
    bg: "bg-sky-100",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "text-pink-600",
    bg: "bg-pink-100",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: MessageCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: Send,
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    color: "text-blue-700",
    bg: "bg-blue-100",
  },
];

export function ShareProjectModal({
  children,
  project,
  profileId,
}: {
  children: React.ReactNode;
  project: ProjectData;
  profileId: string; // slug do perfil
}) {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [, setLoading] = useState(false);
  const [processing, setProcessing] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const loadLinks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProjectLinks(profileId, project.id);
      setLinks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [project.id, profileId]);

  useEffect(() => {
    if (isOpen) {
      loadLinks();
    }
  }, [isOpen, loadLinks]);

  const getSlug = () =>
    project.slug ||
    project.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  async function handleSocialClick(networkId: string) {
    setProcessing(networkId);
    try {
      const existing = links.find((l) => l.utmParameters.source === networkId);
      let code: string | null | undefined = existing?.code;

      if (!code) {
        // Cria novo link se não existir
        code = await createShortLink(
          profileId,
          project.id,
          getSlug(),
          project.link,
          {
            source: networkId,
            medium: "social",
            campaign: "share",
          },
        );
        if (code) {
          // Recarrega links para ter o novo na lista
          await loadLinks();
        }
      }

      if (code) {
        copyToClipboard(code, getSlug());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(null);
    }
  }

  function copyToClipboard(code: string, slug: string) {
    const url = `${origin}/l/${code}/${slug}`;
    navigator.clipboard.writeText(url);

    toast.success("Link copiado!", {
      description: "Agora você pode compartilhar seu projeto com o mundo.",
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar Projeto</DialogTitle>
          <DialogDescription>
            Compartilhe seu projeto e comece a divulgar para o mundo.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Social Icons */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Compartilhar via
            </Label>
            <div className="flex items-center justify-between gap-2">
              {SOCIAL_NETWORKS.map((net) => (
                <Button
                  key={net.id}
                  variant="outline"
                  size="icon"
                  className={`rounded-full size-12 ${net.color} ${net.bg} border-0 hover:brightness-95 transition-all`}
                  onClick={() => handleSocialClick(net.id)}
                  disabled={!!processing}
                >
                  {processing === net.id ? (
                    <Loader2 className="size-5 animate-spin text-foreground" />
                  ) : (
                    <net.icon className="size-5" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
