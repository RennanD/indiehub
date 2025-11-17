"use client";

import {
  Eye,
  Github,
  Instagram,
  Linkedin,
  LogOut,
  Save,
  Share,
  TrendingUp,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { manageAuth } from "@/actions/manage-auth";
import { Preview } from "@/components/preview";
import { Android } from "@/components/ui/android";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { UserData } from "@/server/get-user-data";
import { AreaChartComponent } from "./area-chart";
import { ProjectsCard } from "./projects-card";

const PROJECTS = [
  {
    title: "Project 1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    href: "https://indiehub.site/project-1",
  },
  {
    title: "Project 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    href: "https://indiehub.site/project-2",
  },

  {
    title: "Project 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    href: "https://indiehub.site/project-3",
  },
  {
    title: "Project 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    href: "https://indiehub.site/project-4",
  },
];

export function MainSection({ userData }: { userData: UserData }) {
  const defaultDescription =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

  const [characterCount, setCharacterCount] = useState(
    70 - defaultDescription.length,
  );
  const [description, setDescription] = useState(defaultDescription);

  function handleChangeDescription(value: string) {
    setDescription(value);

    setCharacterCount(70 - value.length);
  }

  return (
    <section className="flex relative flex-col gap-6 flex-1 pt-5 md:pt-20">
      <div className="w-full max-w-7xl mx-auto px-5">
        <Card className="">
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">1000</h1>
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Visualizações totais
              </p>
            </div>

            <Button onClick={manageAuth} variant="outline" size="icon">
              <LogOut className="w-4 h-4 text-destructive" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="w-full relative max-w-7xl pb-32 mx-auto px-5 flex flex-col gap-10 md:flex-row">
        <div className="flex flex-col gap-3 flex-2 max-w-3xl">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
              <Avatar className="size-14">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex items-center gap-2 flex-1 justify-between">
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium">John Doe</h3>
                  <p className="text-sm text-muted-foreground">
                    https://indiehub.site/john-doe
                  </p>
                </div>
                <Button variant="outline" size="icon">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <InputGroup>
                  <InputGroupTextarea
                    onChange={(e) => handleChangeDescription(e.target.value)}
                    value={description}
                    className={cn({
                      "border-destructive": characterCount < 0,
                    })}
                    placeholder="Conte sobre você"
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="text-muted-foreground text-xs">
                      {characterCount} caracteres restantes
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {characterCount < 0 && (
                  <span className="text-destructive text-xs">
                    Você atingiu o limite de caracteres
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Instagram className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        type="url"
                        id="instagram"
                        placeholder="https://instagram.com/john-doe"
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Github className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        type="url"
                        id="github"
                        placeholder="https://github.com/john-doe"
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <Label htmlFor="x">X</Label>
                      <Input
                        type="url"
                        id="x"
                        placeholder="https://x.com/john-doe"
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        type="url"
                        id="linkedin"
                        placeholder="https://linkedin.com/in/john-doe"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>

            <CardFooter className="space-x-2">
              <Button>
                <Save className="w-4 h-4" />
                Salvar
              </Button>

              <Button variant="secondary" className="md:hidden">
                <Eye className="w-4 h-4" />
                Preview
              </Button>
            </CardFooter>
          </Card>

          <ProjectsCard profileId={userData.slug} />

          <AreaChartComponent />
        </div>

        <div className="flex-col sticky top-20 gap-2 flex-1 hidden md:flex">
          <Android size="lg">
            <Preview
              name="John Doe"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              projects={PROJECTS}
            />
          </Android>
        </div>
      </div>
    </section>
  );
}
