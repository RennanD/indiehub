import type { Timestamp } from "firebase-admin/firestore";
import { db } from "@/lib/firebase";

export type SocialLinkData = {
  id: string;
  platform: string;
  url: string;
  createdAt: Timestamp;
  totalViews?: number;
};

export async function getSocialLinks(profileId: string): Promise<SocialLinkData[]> {
  const snapshot = await db
    .collection("profiles")
    .doc(profileId)
    .collection("social_links")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as SocialLinkData[];
}

