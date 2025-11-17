import { redirect } from "next/navigation";
import { getUserData } from "@/server/get-user-data";
import { MainSection, TopBannerSection } from "./sections";

export async function MePageTemplate() {
  const userData = await getUserData();

  if (!userData) redirect("/");

  return (
    <main>
      <TopBannerSection />
      <MainSection
        userData={{
          userId: userData.userId,
          slug: userData.slug,
        }}
      />
    </main>
  );
}
