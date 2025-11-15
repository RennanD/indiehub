"use server";

import { auth, signIn, signOut } from "@/lib/auth";

export async function manageAuth() {
  const session = await auth();

  if (!session) {
    return signIn("google", { redirectTo: "/create-link" });
  }

  return signOut({
    redirectTo: "/",
  });
}
