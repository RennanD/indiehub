import type { Timestamp } from "firebase-admin/firestore";
import { db } from "@/lib/firebase";

type ProfileData = {
  slug: string;
  userId: string;
  createdAt: Timestamp;
};

export async function getProfileData(slug: string) {
  const snapshot = await db.collection("profiles").doc(slug).get();

  return snapshot.data() as ProfileData;
}

export type ProjectData = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  link: string;
  createdAt: Timestamp;
};

export async function getProjects(profileId: string) {
  const snapshot = await db
    .collection("projects")
    .doc(profileId)
    .collection("projects")
    .get();

  return snapshot.docs.map((doc) => doc.data()) as ProjectData[];
}
