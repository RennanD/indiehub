import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserData } from "@/server/get-user-data";
import { UpgradePageTemplate } from "@/templates/app/upgrade-page";

export default async function UpgradePage() {
  const session = await auth();

  if (!session || !session.user) redirect("/");

  const userData = await getUserData();

  if (!userData) redirect("/");

  if (userData.plan !== "trial") redirect("/");

  return <UpgradePageTemplate />;
}
