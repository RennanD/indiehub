import { Card, CardContent } from "@/components/ui/card";

const PROJECTS = [
  {
    title: "Project 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur non maiores id aperiam voluptatibus pariatur nostrum voluptates. Rerum, saepe quam sed sapiente doloribus aliquid quos ullam? Neque consectetur ullam libero.",
    link: "https://indiehub.site/project-1",
  },
  {
    title: "Project 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur non maiores id aperiam voluptatibus pariatur nostrum voluptates. Rerum, saepe quam sed sapiente doloribus aliquid quos ullam? Neque consectetur ullam libero.",
    link: "https://indiehub.site/project-2",
  },

  {
    title: "Project 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur non maiores id aperiam voluptatibus pariatur nostrum voluptates. Rerum, saepe quam sed sapiente doloribus aliquid quos ullam? Neque consectetur ullam libero.",
    link: "https://indiehub.site/project-3",
  },
  {
    title: "Project 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur non maiores id aperiam voluptatibus pariatur nostrum voluptates. Rerum, saepe quam sed sapiente doloribus aliquid quos ullam? Neque consectetur ullam libero.",
    link: "https://indiehub.site/project-4",
  },
];

export function ProjectsSection() {
  return (
    <section className="flex flex-1">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <h2 className="text-lg font-bold">Conheça meus projetos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {PROJECTS.map((project) => (
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
    </section>
  );
}
