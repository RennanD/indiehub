import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type ShortLink, trackLinkEvent } from "@/actions/short-links";

const detectBot = (headersList: ReadonlyHeaders) => {
  const userAgent = headersList.get("User-Agent");

  if (userAgent) {
    return /bot|chatgpt|facebookexternalhit|WhatsApp|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|MetaInspector/i.test(
      userAgent,
    );
  }

  return false;
};

export async function RedirectWrapper({
  link,
  code,
}: {
  link: ShortLink;
  code: string;
}) {
  // Tracking
  const headersList = await headers();

  const bot = detectBot(headersList);

  if (!bot) {
    const userAgent = headersList.get("user-agent") || "unknown";
    const referer = headersList.get("referer") || "direct";
    const ip =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      "unknown";

    try {
      await trackLinkEvent(
        code,
        userAgent,
        ip,
        referer,
        link.profileId,
        link.projectId,
        link.utmParameters.source,
      );
    } catch (err) {
      console.error("[RedirectPage] Error calling trackLinkEvent", err);
    }

    // Construir URL com UTMs
    const url = new URL(link.originalUrl);
    if (link.utmParameters) {
      url.searchParams.set("utm_source", link.utmParameters.source);
      url.searchParams.set("utm_medium", link.utmParameters.medium);
      url.searchParams.set("utm_campaign", link.utmParameters.campaign);
    }

    redirect(url.toString());
  }

  return <div></div>;
}
