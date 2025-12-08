import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getLinkByCode, trackLinkEvent } from "@/actions/short-links";
import { getDownloadURLFromPath } from "@/lib/firebase";
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

  const thumbnailUrl = await getDownloadURLFromPath(project.thumbnail);

  console.log({ thumbnailUrl });

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [
        {
          url: thumbnailUrl,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
      images: [
        {
          url: thumbnailUrl,
        },
      ],
    },
  };
}

export default async function RedirectPage({ params }: Props) {
  const { code } = await params;
  const link = await getLinkByCode(code);

  if (!link) {
    console.warn("[RedirectPage] Link not found for code", code);
    notFound();
  }

  // Tracking
  const headersList = await headers();
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
