import { Eye, Pencil } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProjectData } from "@/server/get-profile-data";

type ProjectDetailsSectionProps = {
  project: ProjectData;
  totalViews: number;
};

export function ProjectDetailsSection({
  project,
  totalViews,
}: ProjectDetailsSectionProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Detalhes do Projeto</CardTitle>
          <CardDescription>Análise de tráfego e visualizações</CardDescription>
        </div>

        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col bg-accent gap-2 rounded-md  overflow-hidden">
          <div className="w-full relative h-[200px]">
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 space-y-2">
            <h3 className="text-sm font-bold">{project.name}</h3>
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
            <p className="text-xs text-muted-foreground">{project.link}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Badge>
          <Eye className="size-3" />
          {totalViews} visualizações
        </Badge>
      </CardFooter>
    </Card>
  );
}
