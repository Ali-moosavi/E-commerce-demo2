import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: { // [!code highlight]
    enabled: true, // [!code highlight]
  },
  plugins: [nextCookies()],
});

export async function requireServerSession() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/user/registeration");
  }

  return session;
}
