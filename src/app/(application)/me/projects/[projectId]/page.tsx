import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserData } from "@/server/get-user-data";
import { ProjectAnalyticsTemplate } from "@/templates/app/project-analytics";

type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectAnalyticsPage({ params }: Props) {
  const { projectId } = await params;

  const userData = await getUserData();

  if (!userData) redirect("/");

  const session = await auth();

  if (!session || !session.user) redirect("/");

  if (userData.plan === "trial" && !session.user.isTrial) {
    redirect("/me/upgrade");
  }

  return (
    <ProjectAnalyticsTemplate
      projectId={projectId}
      profileSlug={userData.slug}
    />
  );
}
