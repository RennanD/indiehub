import { notFound } from "next/navigation";
import { Gradient } from "@/components/ui/gradient";
import { SparklesCore } from "@/components/ui/sparkles";
import { getProfileData, getProjects } from "@/server/get-profile-data";
import { ProfileSection, ProjectsSection } from "./sections";

export async function ProfilePageTemplate({ slug }: { slug: string }) {
  const profileData = await getProfileData(slug);

  if (!profileData) {
    return notFound();
  }

  const projects = await getProjects(slug);

  return (
    <div className="min-h-screen">
      {/* Gradient background */}
      <Gradient position="fixed" />

      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#ffe0c2"
        />
      </div>

      <main className="flex flex-col  pt-5 pb-20 md:pt-20 w-full max-w-7xl mx-auto px-5 relative">
        <div className="flex flex-col gap-10 md:flex-row justify-between md:gap-20">
          <ProfileSection />
          <ProjectsSection projects={projects} />
        </div>
      </main>
    </div>
  );
}
