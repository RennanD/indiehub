import { redirect } from "next/navigation";
import { getProjects } from "@/server/get-profile-data";
import { getUserData } from "@/server/get-user-data";
import { MainSection, TopBannerSection } from "./sections";

export async function MePageTemplate() {
  const userData = await getUserData();

  if (!userData) redirect("/");

  const projects = await getProjects(userData.slug);

  return (
    <main>
      <TopBannerSection />
      <MainSection
        projects={projects}
        userData={{
          name: userData.name,
          totalViews: userData.totalViews,
          description: userData.description,
          avatar: userData.avatar,
          userId: userData.userId,
          slug: userData.slug,
        }}
      />
    </main>
  );
}
