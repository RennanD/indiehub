import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserData } from "@/server/get-user-data";
import { MePageTemplate } from "@/templates/app/me-page";

export const metadata: Metadata = {
  title: "Dashboard | IndieHub",
  description: "Dashboard do usuário",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MePage() {
  const userData = await getUserData();

  if (!userData) redirect("/");

  const session = await auth();

  if (!session || !session.user) redirect("/");

  if (userData.plan === "trial" && !session.user.isTrial) {
    redirect("/me/upgrade");
  }

  return <MePageTemplate />;
}
