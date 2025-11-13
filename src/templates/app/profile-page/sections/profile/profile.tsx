import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const SOCIAL_LINKS = [
  {
    icon: "instagram",
    href: "https://instagram.com/shadcn",
  },
  {
    icon: "github",
    href: "https://github.com/shadcn",
  },
  {
    icon: "twitter",
    href: "https://twitter.com/shadcn",
  },
  {
    icon: "linkedin",
    href: "https://linkedin.com/in/shadcn",
  },
];

const ICONS = {
  instagram: Instagram,
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
};

export function ProfileSection() {
  return (
    <section className="flex max-w-sm">
      <div className="flex flex-col items-center md:items-start">
        <Avatar className="size-20 md:size-40">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <h1 className="text-2xl font-bold mt-8 mb-2">John Doe</h1>
        <p className="text-sm text-muted-foreground text-center md:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          non maiores id aperiam voluptatibus pariatur nostrum voluptates.
          Rerum, saepe quam sed sapiente doloribus aliquid quos ullam? Neque
          consectetur ullam libero.
        </p>

        <ul className="flex items-center gap-2 mt-4">
          {SOCIAL_LINKS.map((link) => {
            const Icon = ICONS[link.icon as keyof typeof ICONS];

            return (
              <li key={link.href}>
                <Button variant="outline" size="icon" asChild>
                  <Link href={link.href}>
                    <Icon className="size-4" />
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
