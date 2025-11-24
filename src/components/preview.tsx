// import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

// const SOCIAL_LINKS = [
//   {
//     icon: "instagram",
//     href: "https://instagram.com/shadcn",
//   },
//   {
//     icon: "github",
//     href: "https://github.com/shadcn",
//   },
//   {
//     icon: "twitter",
//     href: "https://twitter.com/shadcn",
//   },
//   {
//     icon: "linkedin",
//     href: "https://linkedin.com/in/shadcn",
//   },
// ];

// const ICONS = {
//   instagram: Instagram,
//   github: Github,
//   twitter: Twitter,
//   linkedin: Linkedin,
// };

interface PreviewProps {
  name: string;
  avatar: string;
  description: string;
  projects: {
    name: string;
    description: string;
    link: string;
    thumbnail: string;
  }[];
}

export function Preview({ name, avatar, description, projects }: PreviewProps) {
  return (
    <div className="flex flex-1 flex-col gap-10 pt-10 px-5">
      <div className="flex flex-col items-center">
        <Avatar className="size-10">
          <AvatarImage
            sizes="100%"
            className="object-cover"
            src={avatar}
            alt={name}
          />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>

        <h1 className="text-2xl font-bold mt-8 mb-2">{name}</h1>
        <p className="text-sm text-muted-foreground text-center ">
          {description}
        </p>

        {/* <ul className="flex items-center gap-2 mt-4">
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
        </ul> */}
      </div>

      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-bold">Conheça meus projetos</h2>
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <Card
              key={project.name}
              className="p-0 overflow-hidden min-h-[200px]"
            >
              <CardContent className="relative flex justify-end p-0 flex-col h-full gap-2 overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
                <CardFooter className="flex flex-col bg-black/80 py-2 items-start gap-1 relative z-10">
                  <strong className="text-sm font-bold">{project.name}</strong>
                  <p className="text-xs">{project.description}</p>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
