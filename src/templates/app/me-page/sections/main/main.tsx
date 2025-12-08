"use client";

import { LogOut, Pencil, TrendingUp } from "lucide-react";
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
import type { ProjectData } from "@/server/get-profile-data";
import type { UserData } from "@/server/get-user-data";
// import { BarChartComponent } from "./bar-chart";
import { EditProfileModal } from "./edit-profile-modal";
import { ProjectsCard } from "./projects-card";
import { ShareProfileButton } from "./share-profile-button";

const DEFAULT_DESCRIPTION = "Uma descrição bem legal aqui...";

export function MainSection({
  userData,
  projects,
}: {
  userData: UserData;
  projects: ProjectData[];
}) {
  return (
    <section className="flex relative flex-col gap-6 flex-1 pt-5 md:pt-20">
      <div className="w-full max-w-7xl mx-auto px-5">
        <Card className="">
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">
                  {userData.totalViews ?? 0}
                </h1>
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Visualizações no perfil
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
                  sizes="100%"
                  className="object-cover"
                  src={userData.avatar}
                  alt={userData.name}
                />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex w-full items-center gap-10 flex-1 justify-between">
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium">{userData.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    https://indhub.in/{userData.slug}
                  </p>
                </div>
                <ShareProfileButton slug={userData.slug} />
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-4">
                <blockquote className="mt-6 border-primary border-l-2 pl-6 italic">
                  &quot;{userData.description ?? DEFAULT_DESCRIPTION}&quot;
                </blockquote>

                <CardFooter className="space-x-2 px-0 pt-6">
                  <EditProfileModal
                    userData={{
                      profileId: userData.slug,
                      name: userData.name,
                      avatar: userData.avatar,
                      description: userData.description,
                    }}
                  >
                    <Button>
                      <Pencil className="w-4 h-4" />
                      Editar Perfil
                    </Button>
                  </EditProfileModal>
                </CardFooter>
              </div>
            </CardContent>
          </Card>
          <ProjectsCard profileId={userData.slug} projects={projects} />

          {/* <BarChartComponent /> */}
        </div>

        <div className="flex-col sticky top-20 gap-2 flex-1 hidden md:flex">
          <Android size="lg">
            <Preview
              avatar={userData.avatar}
              name={userData.name}
              description={userData.description ?? DEFAULT_DESCRIPTION}
              projects={projects}
            />
          </Android>
        </div>
      </div>
    </section>
  );
}
