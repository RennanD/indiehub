import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { getLinkByCode } from "@/actions/short-links";
import { JsonLdWrapper } from "@/components/json-ld-wrapper";
import { getProjectData } from "@/server/get-project-data";
import { RedirectWrapper } from "./redirect-wrapper";

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

export default async function RedirectPage({ params }: Props) {
  const { code } = await params;
  const link = await getLinkByCode(code);

  if (!link) {
    notFound();
  }

  const project = await getProjectData(link.profileId, link.projectId);

  if (!project) {
    notFound();
  }

  const jsonLdProject = {
    "@context": "https://schema.org",
    "@type": "Projeto",
    name: project.name,
    image: project.thumbnail,
    description: project.description,
  };

  return (
    <>
      <RedirectWrapper link={link} code={code} />
      <JsonLdWrapper content={jsonLdProject} />
    </>
  );
}
