import { FirestoreAdapter } from "@auth/firebase-adapter";
import { Timestamp } from "firebase-admin/firestore";
import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { TRIAL_DAYS } from "./config";
import { db, firebaseCert } from "./firebase";
import { isTrialPeriod } from "./utils";

declare module "next-auth" {
  interface Session {
    user: {
      createdAt: number;
      plan: "trial" | "personal" | "hacker";
      isTrial: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    createdAt: number;
    plan: "trial" | "personal" | "hacker";
    isTrial?: boolean;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: FirestoreAdapter({
    credential: firebaseCert,
  }),
  trustHost: true,
  providers: [Google],
  events: {
    createUser: async ({ user }) => {
      if (!user.id) return;

      await db.collection("users").doc(user.id).update({
        createdAt: Timestamp.now().toMillis(),
        plan: "trial",
      });
    },
  },
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          isTrial: isTrialPeriod(user.createdAt),
        },
      };
    },
  },
});
