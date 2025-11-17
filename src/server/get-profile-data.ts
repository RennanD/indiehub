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
