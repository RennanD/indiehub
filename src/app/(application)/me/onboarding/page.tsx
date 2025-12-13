import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { checkOnboardingRequired } from "@/server/check-onboarding-required";
import { getUserData } from "@/server/get-user-data";
import { OnboardingPageTemplate } from "@/templates/app/onboarding-page";

export const metadata: Metadata = {
  title: "Onboarding | IndieHub",
  description: "Complete seu perfil e comece a usar o IndieHub",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string; projectId?: string }>;
}) {
  const session = await auth();

  if (!session || !session.user) redirect("/");

  const params = await searchParams;
  const step = params?.step;

  // Se não está em um step válido do onboarding, verifica se precisa de onboarding
  // Se está em um step válido (welcome, bio, project, share, success), permite continuar
  // mesmo que já tenha criado um projeto durante o onboarding
  const validOnboardingSteps = [
    "welcome",
    "bio",
    "project",
    "share",
    "success",
  ];

  if (!step || !validOnboardingSteps.includes(step)) {
    const needsOnboarding = await checkOnboardingRequired();
    if (!needsOnboarding) {
      redirect("/me");
    }
  }
  // Se está em um step válido, permite continuar mesmo que já tenha projetos

  const userData = await getUserData();

  if (!userData) redirect("/");

  return (
    <OnboardingPageTemplate
      profileId={userData.slug}
      initialDescription={userData.description || ""}
      userName={userData.name}
    />
  );
}
