import type { Timestamp } from "firebase-admin/firestore";
import { db, getDownloadURLFromPath } from "@/lib/firebase";

type ProfileData = {
  slug: string;
  name: string;
  description: string;
  avatar: string;
  hasAvatarUpdated: boolean;
  userId: string;
  createdAt: Timestamp;
};

export async function getProfileData(slug: string) {
  const snapshot = await db.collection("profiles").doc(slug).get();

  const profile = snapshot.data();

  if (!profile) return null;

  return {
    userId: profile.userId,
    name: profile.name,
    description: profile.description,
    avatar: profile.hasAvatarUpdated
      ? await getDownloadURLFromPath(profile.avatar)
      : profile.avatar,
    slug: profile.slug,
  } as ProfileData;
}

export type ProjectData = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  link: string;
  slug?: string;
  profileShortLink?: string;
  totalViews?: number;
  createdAt: Timestamp;
};

export async function getProjects(profileId: string) {
  const snapshot = await db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProjectData[];
}

export async function getProfileId(userId: string) {
  const snapshot = await db
    .collection("profiles")
    .where("userId", "==", userId)
    .count()
    .get();

  const profileExists = snapshot.data().count > 0;

  return profileExists;
}
