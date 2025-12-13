"use server";

import { Timestamp } from "firebase-admin/firestore";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";

export async function updateSocialLink(
  profileId: string,
  platform: string,
  url: string | null,
) {
  const session = await auth();

  if (!session?.user || !session.user.id) return false;

  try {
    const socialLinkRef = db
      .collection("profiles")
      .doc(profileId)
      .collection("social_links")
      .doc(platform);

    if (!url || url.trim() === "") {
      // Deletar documento se URL vazia
      const doc = await socialLinkRef.get();
      if (doc.exists) {
        await socialLinkRef.delete();
      }
      return true;
    }

    // Criar ou atualizar documento
    await socialLinkRef.set(
      {
        platform,
        url: url.trim(),
        createdAt: Timestamp.now().toMillis(),
      },
      { merge: true },
    );

    return true;
  } catch {
    return false;
  }
}

