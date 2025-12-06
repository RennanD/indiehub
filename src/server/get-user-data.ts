import "server-only";

import { auth } from "@/lib/auth";
import { db, getDownloadURLFromPath } from "@/lib/firebase";

export type UserData = {
  userId: string;
  name: string;
  description: string;
  totalViews: number;
  plan: "trial" | "personal" | "hacker";
  avatar: string;
  slug: string;
};

export async function getUserData() {
  const session = await auth();

  if (!session?.user || !session.user.id) return null;

  const snapshot = await db
    .collection("profiles")
    .where("userId", "==", session.user.id)
    .get();

  if (snapshot.empty) return null;

  const profile = snapshot.docs[0].data();

  return {
    userId: profile.userId,
    name: profile.name,
    description: profile.description,
    totalViews: profile.totalViews,
    avatar: profile.hasAvatarUpdated
      ? await getDownloadURLFromPath(profile.avatar)
      : profile.avatar,
    slug: profile.slug,
    plan: profile.plan,
  } as UserData;
}
