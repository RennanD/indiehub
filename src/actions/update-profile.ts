"use server";

import { Timestamp } from "firebase-admin/firestore";
import { auth } from "@/lib/auth";
import { db, storage } from "@/lib/firebase";

export type UpdateProfileSchema = {
  name: string;
  description: string;
  avatar: File | undefined;
};

export async function updateProfile(
  profileId: string,
  data: UpdateProfileSchema,
) {
  const session = await auth();

  if (!session?.user || !session.user.id) return false;

  try {
    if (data.avatar) {
      const currentProfile = await db
        .collection("profiles")
        .doc(profileId)
        .get();

      if (currentProfile.data()?.hasAvatarUpdated) {
        const currentPath = currentProfile.data()?.avatar;
        if (currentPath) {
          const storageRef = storage.file(currentPath);
          const [exists] = await storageRef.exists();

          if (exists) {
            await storageRef.delete();
          }
        }
      }

      const storageRef = storage.file(
        `profile-images/${profileId}/${crypto.randomUUID()}`,
      );
      const arrayBuffer = await data.avatar.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await storageRef.save(buffer);

      const imagePath = storageRef.name;

      await db.collection("profiles").doc(profileId).update({
        avatar: imagePath,
        name: data.name,
        description: data.description,
        hasAvatarUpdated: true,
        updatedAt: Timestamp.now().toMillis(),
      });
      return true;
    }

    if (!data.avatar) {
      await db.collection("profiles").doc(profileId).update({
        name: data.name,
        description: data.description,
        updatedAt: Timestamp.now().toMillis(),
      });
      return true;
    }
  } catch {
    return false;
  }
}
