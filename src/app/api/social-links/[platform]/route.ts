import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { trackSocialClick } from "@/actions/track-social-click";
import { db } from "@/lib/firebase";

const detectBot = (headersList: ReadonlyHeaders) => {
  const userAgent = headersList.get("User-Agent");

  if (userAgent) {
    return /bot|chatgpt|facebookexternalhit|WhatsApp|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|MetaInspector/i.test(
      userAgent,
    );
  }

  return false;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { platform } = await params;
  const searchParams = request.nextUrl.searchParams;
  const profileId = searchParams.get("profileId");

  if (!profileId) {
    return NextResponse.json({ error: "profileId is required" }, { status: 400 });
  }

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
      // Buscar URL do link social
      const socialLinkDoc = await db
        .collection("profiles")
        .doc(profileId)
        .collection("social_links")
        .doc(platform)
        .get();

      if (!socialLinkDoc.exists) {
        return NextResponse.json(
          { error: "Social link not found" },
          { status: 404 },
        );
      }

      const socialLinkData = socialLinkDoc.data();
      if (!socialLinkData || !socialLinkData.url) {
        return NextResponse.json(
          { error: "Social link URL not found" },
          { status: 404 },
        );
      }

      // Tracking assíncrono (não bloqueia o redirecionamento)
      trackSocialClick({
        userAgent,
        ip,
        referer,
        profileId,
        platform,
      }).catch((err) => {
        console.error("[SocialLinks API] Error calling trackSocialClick", err);
      });

      // Redirecionar para a URL
      return NextResponse.redirect(socialLinkData.url);
    } catch (err) {
      console.error("[SocialLinks API] Error:", err);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }

  // Para bots, retornar 404 ou redirecionar sem tracking
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

