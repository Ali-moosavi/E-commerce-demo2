import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

const authUrl =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  "http://localhost:3000";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  // 1. Allow requests from localhost (when testing build) and your production URL
  trustedOrigins: [
    "http://localhost:3000",
    process.env.BETTER_AUTH_URL || "",
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "",
  ].filter(Boolean),

  // 2. CRITICAL FOR LOCAL BUILD TESTING:
  // Only require HTTPS Secure cookies when your URL actually starts with https://
  advanced: {
    useSecureCookies: authUrl.startsWith("https://"),
  },

  // Keep nextCookies() as the last plugin in the array
  plugins: [nextCookies()],
});

export async function requireServerSession() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/user/registeration");
  }

  return session;
}
