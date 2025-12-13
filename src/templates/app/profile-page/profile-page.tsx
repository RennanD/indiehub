import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { trackProfileEvent } from "@/actions/profile-analytics";
import { JsonLdWrapper } from "@/components/json-ld-wrapper";
import { Button } from "@/components/ui/button";
import { Gradient } from "@/components/ui/gradient";
import { SparklesCore } from "@/components/ui/sparkles";
import { getProfileData, getProjects } from "@/server/get-profile-data";
import { getSocialLinks } from "@/server/get-social-links";
import { ProfileSection, ProjectsSection } from "./sections";

export async function ProfilePageTemplate({ slug }: { slug: string }) {
  const profileData = await getProfileData(slug);

  if (!profileData) {
    return notFound();
  }

  const jsonLdProfile = {
    "@context": "https://schema.org",
    "@type": "Profile",
    name: profileData.name,
    image: profileData.avatar,
    description: profileData.description,
  };

  // Tracking
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "unknown";
  const referer = headersList.get("referer") || "direct";
  const ip =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    "unknown";

  try {
    await trackProfileEvent({
      userAgent,
      ip,
      referer,
      profileId: profileData.slug,
    });
  } catch (err) {
    console.error("[ProfilePage] Error calling trackProfileEvent", err);
  }

  const projects = await getProjects(slug);
  const socialLinks = await getSocialLinks(slug);

  return (
    <>
      <JsonLdWrapper content={jsonLdProfile} />
      <div className="min-h-screen relative">
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
            <ProfileSection
              profileData={{
                name: profileData.name,
                description: profileData.description,
                avatar: profileData.avatar,
                slug: profileData.slug,
              }}
              socialLinks={socialLinks}
            />
            <ProjectsSection projects={projects} />
          </div>
        </main>

        <Button asChild className="absolute bottom-5 right-1/2 translate-x-1/2">
          <a target="_blank" rel="noopener noreferrer" href={`/`}>
            Junte-se a {profileData.slug} no IndieHub
          </a>
        </Button>
      </div>
    </>
  );
}
