import { Eye, FolderArchive, Plus, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
import { ShareProjectModal } from "./share-project-modal";

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
            <Button variant="outline" className="hidden md:flex">
              <p className="hidden md:block">Criar Projeto</p>
              <Plus className="size-4" />
            </Button>
          </CreateProjectModal>

          <CreateProjectModal profileId={profileId}>
            <Button variant="outline" className="md:hidden">
              <Plus className="size-4" />
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
                  <Card className="bg-accent pt-0 overflow-hidden h-full group relative">
                    <div className="absolute top-2 right-2 z-10">
                      <ShareProjectModal project={project} profileId={profileId}>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8 rounded-full shadow-sm opacity-80 hover:opacity-100 transition-opacity"
                        >
                          <Share2 className="size-4" />
                        </Button>
                      </ShareProjectModal>
                    </div>
                    <CardHeader className="w-full h-[200px] relative">
                      <Image
                        src={project.thumbnail}
                        alt={project.name}
                        fill
                        className="object-cover"
                      />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <strong className="text-sm font-bold">
                          {project.name}
                        </strong>
                        <p className="text-xs line-clamp-2 text-muted-foreground">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Eye className="size-3" />
                          <span>{project.totalViews || 0} visualizações</span>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          asChild
                        >
                          <Link href={`/me/projects/${project.id}`}>
                            Ver Detalhes
                          </Link>
                        </Button>
                      </div>
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
