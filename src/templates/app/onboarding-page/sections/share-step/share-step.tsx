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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getProject } from "@/actions/get-project";
import {
  createShortLink,
  getProjectLinks,
  type ShortLink,
} from "@/actions/short-links";
import { DiscordIcon, RedditIcon, TikTokIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { ProjectData } from "@/server/get-profile-data";
import { CONSTANTS } from "@/shared/constants";

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
  {
    id: "tiktok",
    name: "TikTok",
    icon: TikTokIcon,
    color: "text-white",
    bg: "bg-black",
  },
  {
    id: "discord",
    name: "Discord",
    icon: DiscordIcon,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: RedditIcon,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

interface ShareStepProps {
  projectId: string;
  onNext: (step: "success") => void;
  onSkip: (step: "success") => void;
  profileId: string;
}

export function ShareStep({
  projectId,
  onNext,
  onSkip,
  profileId,
}: ShareStepProps) {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    async function loadProject() {
      try {
        const projectData = await getProject(projectId);
        if (projectData) {
          setProject(projectData);
          const projectLinks = await getProjectLinks(profileId, projectId);
          setLinks(projectLinks);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId, profileId]);

  const getSlug = () => {
    if (!project) return "";
    return (
      project.slug ||
      project.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
    );
  };

  async function handleSocialClick(networkId: string) {
    if (!project) return;

    setProcessing(networkId);
    try {
      const existing = links.find((l) => l.utmParameters.source === networkId);
      let code: string | null | undefined = existing?.code;

      if (!code) {
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
          const projectLinks = await getProjectLinks(profileId, projectId);
          setLinks(projectLinks);
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
    const url = `${CONSTANTS.basePath}/l/${code}/${slug}`;
    navigator.clipboard.writeText(url);

    toast.success("Link copiado!", {
      description: "Agora você pode compartilhar seu projeto com o mundo.",
    });
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!project) {
    return (
      <Card className="w-full">
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">
            Projeto não encontrado
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Compartilhe seu projeto</CardTitle>
        <CardDescription>
          Gere links personalizados para compartilhar seu projeto em diferentes
          redes sociais. Cada rede terá seu próprio link com rastreamento. Esta
          etapa é opcional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-4 space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Compartilhar via
            </Label>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_NETWORKS.map((net) => (
                <Button
                  key={net.id}
                  variant="ghost"
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
        <div className="flex justify-end items-center gap-4 mt-6">
          <Button variant="ghost" onClick={() => onSkip("success")}>
            Pular
          </Button>
          <Button onClick={() => onNext("success")}>Próximo</Button>
        </div>
      </CardContent>
    </Card>
  );
}
