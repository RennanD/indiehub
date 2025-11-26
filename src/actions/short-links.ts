"use server";

import { Timestamp } from "firebase-admin/firestore";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";

export type UTMParameters = {
  source: string;
  medium: string;
  campaign: string;
};

export type ShortLink = {
  code: string;
  projectId: string;
  profileId: string;
  originalUrl: string;
  projectSlug: string;
  utmParameters: UTMParameters;
  createdAt: number;
};

export async function createShortLink(
  profileId: string,
  projectId: string,
  projectSlug: string,
  originalUrl: string,
  utmParameters: UTMParameters,
) {
  const session = await auth();
  if (!session?.user?.id) return null;

  let code = nanoid(8);
  let exists = await db.collection("lookup_codes").doc(code).get();

  let attempts = 0;
  while (exists.exists && attempts < 3) {
    code = nanoid(8);
    exists = await db.collection("lookup_codes").doc(code).get();
    attempts++;
  }

  if (exists.exists) {
    throw new Error("Failed to generate unique code");
  }

  const linkData = {
    code,
    projectId,
    profileId,
    originalUrl,
    projectSlug,
    utmParameters,
    createdAt: Timestamp.now().toMillis(),
  };

  const batch = db.batch();

  const projectLinkRef = db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .doc(projectId)
    .collection("short_links")
    .doc(code);

  batch.set(projectLinkRef, linkData);

  const lookupRef = db.collection("lookup_codes").doc(code);
  batch.set(lookupRef, {
    profileId,
    projectId,
    code, // redundante mas útil
    createdAt: linkData.createdAt,
  });

  await batch.commit();

  return code;
}

export async function getProjectLinks(
  profileId: string,
  projectId: string,
): Promise<ShortLink[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  const snapshot = await db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .doc(projectId)
    .collection("short_links")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map(
    (doc) =>
      ({
        code: doc.id,
        ...doc.data(),
      }) as ShortLink,
  );
}

export async function getLinkByCode(code: string): Promise<ShortLink | null> {
  const lookupDoc = await db.collection("lookup_codes").doc(code).get();

  if (!lookupDoc.exists) return null;

  const { profileId, projectId } = lookupDoc.data() as {
    profileId: string;
    projectId: string;
  };

  const linkDoc = await db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .doc(projectId)
    .collection("short_links")
    .doc(code)
    .get();

  if (!linkDoc.exists) return null;

  return {
    code: linkDoc.id,
    ...linkDoc.data(),
  } as ShortLink;
}

export async function trackLinkEvent(
  code: string,
  userAgent: string,
  ip: string | null,
  referer: string | null,
  profileId: string,
  projectId: string,
  source: string,
) {
  try {
    const userAgentReadable = userAgent || "unknown";

    const rawIp =
      ip && ip !== "unknown" ? ip.split(",")[0]?.trim() || null : null;

    let locationReadable = "Unknown location";

    if (rawIp) {
      try {
        const response = await fetch(`https://ipapi.co/${rawIp}/json/`);

        if (response.ok) {
          const data = (await response.json()) as {
            city?: string;
            region?: string;
            country_name?: string;
          };

          const parts = [data.city, data.region, data.country_name].filter(
            (part) => !!part,
          ) as string[];

          if (parts.length > 0) {
            locationReadable = parts.join(", ");
          }
        }
      } catch (geoError) {
        console.error(
          "[trackLinkEvent] Error resolving geo location:",
          geoError,
        );
      }
    }

    await db
      .collection("profiles")
      .doc(profileId)
      .collection("projects")
      .doc(projectId)
      .collection("link_events")
      .add({
        shortLinkId: code,
        source,
        timestamp: Timestamp.now().toMillis(),
        userAgent: userAgent || "unknown",
        userAgentReadable,
        ip: rawIp || "unknown",
        location: locationReadable,
        referer: referer || "direct",
      });
  } catch (error) {
    console.error("[trackLinkEvent] Error tracking link event:", error);
  }
}
