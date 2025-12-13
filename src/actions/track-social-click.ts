"use server";

import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { db } from "@/lib/firebase";

type TrackSocialClickData = {
  userAgent: string;
  ip: string | null;
  referer: string | null;
  profileId: string;
  platform: string;
};

export async function trackSocialClick({
  userAgent,
  ip,
  referer,
  profileId,
  platform,
}: TrackSocialClickData) {
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
          "[trackSocialClick] Error resolving geo location:",
          geoError,
        );
      }
    }

    await db
      .collection("profiles")
      .doc(profileId)
      .collection("social_links")
      .doc(platform)
      .collection("social_links_events")
      .add({
        profileId,
        platform,
        ip: rawIp || "unknown",
        location: locationReadable,
        referer: referer || "direct",
        timestamp: Timestamp.now().toMillis(),
        userAgent: userAgent || "unknown",
        userAgentReadable,
      });

    // Incrementar totalViews no documento do link social
    await db
      .collection("profiles")
      .doc(profileId)
      .collection("social_links")
      .doc(platform)
      .update({
        totalViews: FieldValue.increment(1),
      });
  } catch (error) {
    console.error("[trackSocialClick] Error tracking social click:", error);
  }
}

