"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireServerSession } from "@/lib/auth";

const personalNameSchema = z.object({
  firstName: z.string().trim().min(1).max(50),
  lastName: z.string().trim().min(1).max(50),
});

export async function updatePersonalName(input: unknown) {
  const session = await requireServerSession();
  const parsed = personalNameSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false as const, error: "نام و نام خانوادگی را بررسی کنید." };
  }

  const { firstName, lastName } = parsed.data;

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
      },
    });

    return { success: true as const, user: { firstName, lastName } };
  } catch (error) {
    console.error("[profile] Failed to update personal name:", error);
    return { success: false as const, error: "ذخیرهٔ اطلاعات انجام نشد. دوباره تلاش کنید." };
  }
}
