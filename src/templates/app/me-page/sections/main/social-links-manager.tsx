import {
  GithubIcon,
  InstagramIcon,
  Linkedin02Icon,
  NewTwitterIcon,
  ThreadsIcon,
  TiktokIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import type { SocialLinkData } from "@/server/get-social-links";
import { EditSocialLinkModal } from "./edit-social-link-modal";

const PLATFORMS = [
  { id: "x", name: "X", icon: NewTwitterIcon },
  { id: "instagram", name: "Instagram", icon: InstagramIcon },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin02Icon },
  { id: "tiktok", name: "TikTok", icon: TiktokIcon },
  { id: "threads", name: "Threads", icon: ThreadsIcon },
  { id: "github", name: "GitHub", icon: GithubIcon },
] as const;

export function SocialLinksManager({
  profileId,
  socialLinks,
}: {
  profileId: string;
  socialLinks: SocialLinkData[];
}) {
  const getLinkForPlatform = (platform: string) => {
    return socialLinks.find((link) => link.platform === platform);
  };

  return (
    <div className="flex flex-wrap gap-2 pt-4">
      {PLATFORMS.map((platform) => {
        const IconData = platform.icon;
        const existingLink = getLinkForPlatform(platform.id);

        return (
          <EditSocialLinkModal
            key={platform.id}
            platform={platform.id}
            platformName={platform.name}
            currentUrl={existingLink?.url}
            profileId={profileId}
          >
            <Button
              title={`Editar ${platform.name}`}
              variant="outline"
              size="icon"
              className="size-10"
            >
              <HugeiconsIcon icon={IconData} size={20} />
            </Button>
          </EditSocialLinkModal>
        );
      })}
    </div>
  );
}
