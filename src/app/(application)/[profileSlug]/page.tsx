import { ProfilePageTemplate } from "@/templates/app/profile-page";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileSlug: string }>;
}) {
  const { profileSlug } = await params;

  return <ProfilePageTemplate slug={profileSlug} />;
}
