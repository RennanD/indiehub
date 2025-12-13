"use server";

import { auth } from "@/lib/auth";
import { getProjectData } from "@/server/get-project-data";
import { getUserData } from "@/server/get-user-data";

export async function getProject(projectId: string) {
  const session = await auth();

  if (!session?.user || !session.user.id) return null;

  const userData = await getUserData();

  if (!userData) return null;

  const project = await getProjectData(userData.slug, projectId);

  return project;
}
