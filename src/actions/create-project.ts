"use server";

import { Timestamp } from "firebase-admin/firestore";
import { auth } from "@/lib/auth";
import { db, storage } from "@/lib/firebase";
import { createShortLink } from "./short-links";

export type CreateProjectSchema = {
  profileId: string;
  name: string;
  link: string;
  description: string;
  thumbnail: File;
};

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function createProject(data: CreateProjectSchema) {
  const session = await auth();

  if (!session?.user || !session.user.id) return false;

  try {
    const generatedId = crypto.randomUUID();
    const projectSlug = slugify(data.name);

    const storageRef = storage.file(
      `project-images/${data.profileId}/${generatedId}`,
    );

    const arrayBuffer = await data.thumbnail.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await storageRef.save(buffer);

    const imageUrl = storageRef.name;

    const shortCode = await createShortLink(
      data.profileId, // slug do perfil
      generatedId,
      projectSlug,
      data.link,
      {
        source: "indiehub_profile",
        medium: "referral",
        campaign: "portfolio_visit",
      },
    );

    await db
      .collection("profiles")
      .doc(data.profileId)
      .collection("projects")
      .doc(generatedId)
      .set({
        userId: session.user.id,
        name: data.name,
        link: data.link,
        description: data.description,
        thumbnail: imageUrl,
        slug: projectSlug,
        profileShortLink: shortCode,
        createdAt: Timestamp.now().toMillis(),
      });
  } catch {
    return false;
  }
}
