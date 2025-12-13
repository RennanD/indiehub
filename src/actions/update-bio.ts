"use server";

import { Timestamp } from "firebase-admin/firestore";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import type { UpdateBioSchema } from "@/validations/update-bio-schema";

export async function updateBio(profileId: string, data: UpdateBioSchema) {
  const session = await auth();

  if (!session?.user || !session.user.id) return false;

  try {
    await db
      .collection("profiles")
      .doc(profileId)
      .update({
        description: data.description || null,
        updatedAt: Timestamp.now().toMillis(),
      });

    return true;
  } catch {
    return false;
  }
}
