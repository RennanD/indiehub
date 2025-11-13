import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

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

interface PreviewProps {
  name: string;
  description: string;
  projects: {
    title: string;
    description: string;
    href: string;
  }[];
}

export function Preview({ name, description, projects }: PreviewProps) {
  return (
    <div className="flex flex-1 flex-col gap-10 pt-10 px-5">
      <div className="flex flex-col items-center">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <h1 className="text-2xl font-bold mt-8 mb-2">{name}</h1>
        <p className="text-sm text-muted-foreground text-center ">
          {description}
        </p>

        <ul className="flex items-center gap-2 mt-4">
          {SOCIAL_LINKS.map((link) => {
            const Icon = ICONS[link.icon as keyof typeof ICONS];

            return (
              <li key={link.href}>
                <Button variant="outline" size="icon">
                  <Icon className="size-4" />
                </Button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Card key={project.title}>
            <CardContent className="flex flex-col gap-2">
              <strong className="text-lg font-bold">{project.title}</strong>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
