import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getDownloadURLFromPath } from "@/lib/firebase";
import type { ProjectData } from "@/server/get-profile-data";

function getProjectSlug(project: ProjectData) {
  if (project.slug) return project.slug;

  return project.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function ProjectsSection({
  projects,
}: {
  projects: ProjectData[];
}) {
  const projectsWithThumbnail = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      thumbnail: await getDownloadURLFromPath(project.thumbnail),
    })),
  );
  return (
    <section className="flex flex-1">
      <div className="flex flex-col gap-4 items-center md:items-start w-full">
        <h2 className="text-lg font-bold">Conheça meus projetos</h2>

        <div className="grid grid-cols-1 w-full md:grid-cols-2 gap-4 md:gap-6">
          {projectsWithThumbnail.map((project) => {
            const slug = getProjectSlug(project);
            const shortHref = project.profileShortLink
              ? `/l/${project.profileShortLink}/${slug}`
              : null;

            const href = shortHref ?? project.link;

            return (
              <a
                key={project.name}
                href={href}
                target="_blank"
                className="min-h-[220px] w-full"
                rel="noopener noreferrer"
              >
                <Card className="p-0 overflow-hidden h-full">
                  <CardContent className="relative flex justify-end p-0 flex-col h-full gap-2 overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                    <CardFooter className="flex flex-col bg-black/80 py-2 items-start gap-1 relative z-10">
                      <strong className="text-sm font-bold">
                        {project.name}
                      </strong>
                      <p className="text-xs">{project.description}</p>
                    </CardFooter>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
