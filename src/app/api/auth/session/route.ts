// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // adjust path if your auth.ts is elsewhere

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const isAuthenticated = Boolean(
      session?.session?.token || session?.user?.id,
    );

    return NextResponse.json(
      { isAuthenticated, user: session?.user ?? null },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch {
    return NextResponse.json({ isAuthenticated: false, user: null });
  }
}
