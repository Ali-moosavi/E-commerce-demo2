import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // In the browser, ALWAYS use the current origin (works on localhost, staging, and production).
  // On the server (during build), fall back to env or localhost.
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});

export const { useSession, signIn, signOut, signUp } = authClient;
