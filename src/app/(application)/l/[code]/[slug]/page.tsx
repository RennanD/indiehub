import type { Metadata } from "next";
import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getLinkByCode, trackLinkEvent } from "@/actions/short-links";
import { getProjectData } from "@/server/get-project-data";

type Props = {
  params: Promise<{ code: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const link = await getLinkByCode(code);

  if (!link) {
    return {
      title: "Link não encontrado | IndieHub",
    };
  }

  const project = await getProjectData(link.profileId, link.projectId);

  if (!project) {
    return {
      title: "Projeto não encontrado | IndieHub",
    };
  }

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [
        {
          url: project.thumbnail,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
      images: [
        {
          url: project.thumbnail,
        },
      ],
    },
  };
}

const detectBot = (headersList: ReadonlyHeaders) => {
  const userAgent = headersList.get("User-Agent");

  if (userAgent) {
    return /bot|chatgpt|facebookexternalhit|WhatsApp|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|MetaInspector/i.test(
      userAgent,
    );
  }

  return false;
};

export default async function RedirectPage({ params }: Props) {
  const { code } = await params;
  const link = await getLinkByCode(code);

  if (!link) {
    console.warn("[RedirectPage] Link not found for code", code);
    notFound();
  }

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

  return null;
}
