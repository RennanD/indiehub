import "server-only";

import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";

export type UserData = {
  userId: string;
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

  return profile as UserData;
}
