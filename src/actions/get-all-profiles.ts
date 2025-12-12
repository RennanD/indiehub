"use server";

import { db } from "@/lib/firebase";

export async function getAllProfiles() {
  const snapshot = await db.collection("profiles").get();

  const profiles = snapshot.docs.map((doc) => doc.data());

  console.log(profiles);

  return profiles;
}
