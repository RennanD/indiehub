"use server";

import { Timestamp } from "firebase-admin/firestore";
import { auth } from "@/lib/auth";
import { db, storage } from "@/lib/firebase";

export type CreateProjectSchema = {
  profileId: string;
  name: string;
  link: string;
  description: string;
  thumbnail: File;
};

export async function createProject(data: CreateProjectSchema) {
  const session = await auth();

  if (!session?.user || !session.user.id) return false;

  try {
    console.log({ data });

    const generatedId = crypto.randomUUID();

    const storageRef = storage.file(
      `project-images/${data.profileId}/${generatedId}`,
    );

    const arrayBuffer = await data.thumbnail.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await storageRef.save(buffer);

    const imageUrl = storageRef.name;

    await db
      .collection("projects")
      .doc(data.profileId)
      .collection("projects")
      .doc(generatedId)
      .set({
        userId: session.user.id,
        name: data.name,
        link: data.link,
        description: data.description,
        thumbnail: imageUrl,
        createdAt: Timestamp.now().toMillis(),
      });
  } catch {
    return false;
  }
}
