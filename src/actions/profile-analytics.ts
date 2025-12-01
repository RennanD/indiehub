import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { db } from "@/lib/firebase";

type ProfileEventData = {
  userAgent: string;
  ip: string | null;
  referer: string | null;
  profileId: string;
};

export async function trackProfileEvent({
  userAgent,
  ip,
  referer,
  profileId,
}: ProfileEventData) {
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
          "[trackProfileEvent] Error resolving geo location:",
          geoError,
        );
      }
    }

    await db
      .collection("profiles")
      .doc(profileId)
      .collection("profile_events")
      .add({
        profileId,
        ip: rawIp || "unknown",
        location: locationReadable,
        referer: referer || "direct",
        timestamp: Timestamp.now().toMillis(),
        userAgent: userAgent || "unknown",
        userAgentReadable,
      });

    // Increment totalViews on the profile document as well
    await db
      .collection("profiles")
      .doc(profileId)
      .update({
        totalViews: FieldValue.increment(1),
      });
  } catch (error) {
    console.error("[trackProfileEvent] Error tracking profile event:", error);
  }
}
