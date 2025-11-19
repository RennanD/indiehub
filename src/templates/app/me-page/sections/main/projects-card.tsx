import { FolderArchive, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { ProjectData } from "@/server/get-profile-data";
import { CreateProjectModal } from "./create-project-modal";

export function ProjectsCard({
  profileId,
  projects,
}: {
  profileId: string;
  projects: ProjectData[];
}) {
  if (projects.length > 0) {
    return (
      <Card className="relative">
        <CardHeader className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Projetos ({projects.length})</CardTitle>
            <CardDescription>Projetos criados por você</CardDescription>
          </div>
          <CreateProjectModal profileId={profileId}>
            <Button variant="outline" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </CreateProjectModal>
        </CardHeader>
        <CardContent>
          <Carousel
            opts={{
              align: "start",
            }}
            orientation="horizontal"
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.id} className="pt-1 md:basis-1/2">
                  <Card className="bg-accent pt-0 overflow-hidden h-full">
                    <CardHeader className="w-full h-[200px] relative">
                      <Image
                        src={project.thumbnail}
                        alt={project.name}
                        fill
                        className="object-cover"
                      />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <strong className="text-sm font-bold">
                        {project.name}
                      </strong>
                      <p className="text-xs">{project.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center gap-4 mt-6">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderArchive className="w-4 h-4" />
          </EmptyMedia>
          <EmptyTitle>Nenhum Projeto</EmptyTitle>
          <EmptyDescription>
            Você ainda não criou nenhum projeto. Comece criando seu primeiro
            projeto.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <CreateProjectModal profileId={profileId}>
              <Button type="button">Criar Projeto</Button>
            </CreateProjectModal>
          </div>
        </EmptyContent>
      </Empty>
    </Card>
  );
}
