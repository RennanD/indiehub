"use server";

import { Timestamp } from "firebase-admin/firestore";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";

export async function createProfile(slug: string) {
  const session = await auth();

  if (!session?.user) return false;

  try {
    await db.collection("profiles").doc(slug).set({
      userId: session.user.id,
      name: session.user.name,
      description: null,
      hasAvatarUpdated: false,
      plan: "trial",
      avatar: session.user.image,
      slug,
      createdAt: Timestamp.now().toMillis(),
    });

    return true;
  } catch {
    return false;
  }
}
