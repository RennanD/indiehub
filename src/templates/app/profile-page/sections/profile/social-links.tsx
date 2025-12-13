import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  NewTwitterIcon,
  ThreadsIcon,
  TiktokIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import type { SocialLinkData } from "@/server/get-social-links";

const PLATFORM_ICONS: Record<string, typeof NewTwitterIcon> = {
  x: NewTwitterIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  tiktok: TiktokIcon,
  threads: ThreadsIcon,
  github: GithubIcon,
};

export function SocialLinks({
  socialLinks,
  profileId,
}: {
  socialLinks: SocialLinkData[];
  profileId: string;
}) {
  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {socialLinks.map((link) => {
        const IconData = PLATFORM_ICONS[link.platform];
        if (!IconData) return null;

        return (
          <Link
            key={link.id}
            title={`Abrir ${link.platform} em uma nova aba`}
            href={`/api/social-links/${link.platform}?profileId=${profileId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <HugeiconsIcon icon={IconData} size={24} />
          </Link>
        );
      })}
    </div>
  );
}
