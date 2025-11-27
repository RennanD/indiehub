import { notFound } from "next/navigation";
import { getProjectAnalytics } from "@/actions/project-analytics";
import { getProjectData } from "@/server/get-project-data";
// import {
//   BarChartProject,
//   type SourceOriginChartData,
// } from "./bar-chart-project";
import { ProjectDetailsSection, SourceOriginChart } from "./sections";

const COLORS = {
  facebook: "var(--color-blue-700)",
  indiehub_profile: "var(--color-secondary)",
  twitter: "var(--color-sky-700)",
  instagram: "var(--color-pink-800)",
  linkedin: "var(--color-blue-600)",
  whatsapp: "var(--color-green-700)",
  telegram: "var(--color-blue-600)",
};

export async function ProjectAnalyticsTemplate({
  projectId,
  profileSlug,
}: {
  projectId: string;
  profileSlug: string;
}) {
  const projectData = await getProjectData(profileSlug, projectId);

  if (!projectData) notFound();

  const events = await getProjectAnalytics(profileSlug, projectId);

  // Agrupar por source
  const sourceCount = events.reduce(
    (acc, event) => {
      const source = event.source || "direto";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const sourceChartData = Object.entries(sourceCount)
    .map(([source, count]) => ({
      source,
      visitors: count,
      fill: COLORS[source as keyof typeof COLORS],
    }))
    .sort((a, b) => b.visitors - a.visitors);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl space-y-8">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
        {/* Card de Resumo */}
        <ProjectDetailsSection
          project={projectData}
          totalViews={projectData.totalViews ?? 0}
        />

        {/* Gráfico de Barras */}
        <div className="col-span-2 lg:col-span-2">
          <SourceOriginChart data={sourceChartData} />
        </div>
      </div>
    </div>
  );
}
