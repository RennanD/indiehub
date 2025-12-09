import { notFound } from "next/navigation";
import { getProjectShortLinks } from "@/actions/project-analytics";
import { getProjectData } from "@/server/get-project-data";
// import {
//   BarChartProject,
//   type SourceOriginChartData,
// } from "./bar-chart-project";
import {
  EventsTable,
  ProjectDetailsSection,
  SourceOriginChart,
} from "./sections";

const COLORS = {
  facebook: "var(--color-blue-700)",
  indiehub_profile: "var(--color-secondary)",
  twitter: "var(--color-sky-700)",
  instagram: "var(--color-pink-800)",
  linkedin: "var(--color-blue-600)",
  whatsapp: "var(--color-green-700)",
  telegram: "var(--color-blue-600)",
  tiktok: "hsl(0, 0%, 100%)", // White
  discord: "hsl(235, 86%, 65%)", // Indigo
  reddit: "hsl(16, 100%, 50%)", // Orange
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

  const shortLinks = await getProjectShortLinks(profileSlug, projectId);

  const sourceChartData = shortLinks
    .map((link) => ({
      source: link.utmParameters?.source || "direto",
      visitors: link.totalViews || 0,
      fill:
        COLORS[
          (link.utmParameters?.source as keyof typeof COLORS) || "direto"
        ] || "var(--color-gray-500)",
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
        <div className="col-span-2 lg:col-span-2 space-y-6 sticky top-4 h-fit">
          <SourceOriginChart data={sourceChartData} />
          <EventsTable projectId={projectId} profileSlug={profileSlug} />
        </div>
      </div>
    </div>
  );
}
