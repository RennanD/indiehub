"use server";

import { db } from "@/lib/firebase";

export async function verifyLink(slug: string) {
  const profile = await db.collection("profiles").doc(slug).get();
  return profile.exists;
}
