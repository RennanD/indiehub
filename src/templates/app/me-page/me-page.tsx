import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getDownloadURLFromPath } from "@/lib/firebase";
import { getProjects } from "@/server/get-profile-data";
import { getUserData } from "@/server/get-user-data";
import { MainSection, TopBannerSection } from "./sections";

export async function MePageTemplate() {
  const userData = await getUserData();

  if (!userData) redirect("/");

  const projects = await getProjects(userData.slug);

  const projectsWithThumbnail = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      thumbnail: await getDownloadURLFromPath(project.thumbnail),
    })),
  );

  const session = await auth();

  if (!session || !session.user) redirect("/");

  return (
    <main>
      {userData.plan === "trial" && session.user.isTrial && (
        <TopBannerSection />
      )}
      <MainSection
        projects={projectsWithThumbnail}
        userData={{
          name: userData.name,
          totalViews: userData.totalViews,
          description: userData.description,
          avatar: userData.avatar,
          userId: userData.userId,
          plan: userData.plan,
          slug: userData.slug,
        }}
      />
    </main>
  );
}
