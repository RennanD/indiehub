import "server-only";

import { auth } from "@/lib/auth";
import { getProjects } from "./get-profile-data";
import { getUserData } from "./get-user-data";

export async function checkOnboardingRequired(): Promise<boolean> {
  const session = await auth();

  if (!session?.user || !session.user.id) return false;

  const userData = await getUserData();

  if (!userData) return false;

  const projects = await getProjects(userData.slug);

  // Usuário precisa de onboarding se não tem nenhum projeto
  return projects.length === 0;
}
