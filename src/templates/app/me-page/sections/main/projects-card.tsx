import { FolderArchive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CreateProjectModal } from "./create-project-modal";

export function ProjectsCard({ profileId }: { profileId: string }) {
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
