import { notFound } from "next/navigation";
import { getProfileData, validatePageAccess } from "@/server/get-profile-data";
import { ProfilePageTemplate } from "@/templates/app/profile-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ profileSlug: string }>;
}) {
  const { profileSlug } = await params;

  const profileData = await getProfileData(profileSlug);

  if (!profileData) {
    return notFound();
  }

  return {
    title: `${profileData.name} | IndieHub`,
    description: profileData.description,
    alternates: {
      canonical: `https://indhub.in/${profileSlug}`,
    },
    keywords: [
      `portfólio de ${profileData.name}`,
      `página de portfólio de ${profileData.name}`,
      `página de portfólio de ${profileData.name}`,
    ],
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileSlug: string }>;
}) {
  const { profileSlug } = await params;

  const pageIsAccessible = await validatePageAccess(profileSlug);

  if (!pageIsAccessible) {
    return notFound();
  }

  return <ProfilePageTemplate slug={profileSlug} />;
}
