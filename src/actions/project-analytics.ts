"use server";

import { db } from "@/lib/firebase";

export type LinkEvent = {
  shortLinkId: string;
  source: string;
  timestamp: number;
  userAgent: string;
  userAgentReadable: string;
  ip: string;
  location: string;
  referer: string;
};

export async function getProjectAnalytics(
  profileId: string,
  projectId: string,
) {
  const snapshot = await db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .doc(projectId)
    .collection("link_events")
    .get();

  const events = snapshot.docs.map((doc) => doc.data());

  return events as LinkEvent[];
}

export async function getProjectAnalyticsPaginated(
  profileId: string,
  projectId: string,
  pageSize: number = 10,
  lastTimestamp?: number,
) {
  let query = db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .doc(projectId)
    .collection("link_events")
    .orderBy("timestamp", "desc")
    .limit(pageSize);

  if (lastTimestamp) {
    query = query.startAfter(lastTimestamp);
  }

  const snapshot = await query.get();
  const events = snapshot.docs.map((doc) => doc.data());

  return events as LinkEvent[];
}
