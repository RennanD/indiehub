"use server";

import { db } from "@/lib/firebase";
import type { UTMParameters } from "./short-links";

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

export type ShortLink = {
  id: string;
  code: string;
  utmParameters: UTMParameters;
  totalViews: number;
  createdAt: number;
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

export async function getProjectShortLinks(
  profileId: string,
  projectId: string,
) {
  const snapshot = await db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .doc(projectId)
    .collection("short_links")
    .where("totalViews", ">", 0)
    .get();

  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ShortLink[];
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
