import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProfileId } from "@/server/get-profile-data";

export default async function CreateLinkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) return redirect("/");

  const profileExists = await getProfileId(session.user.id as string);

  if (profileExists) return redirect("/me");

  return <>{children}</>;
}
