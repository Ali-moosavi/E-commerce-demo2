"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// 1. Define the Zod validation schema and types
const createUserSchema = z.object({
  identifier: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  firstName: z.string().trim().min(1, "First name is required.").max(50),
  lastName: z.string().trim().min(1, "Last name is required.").max(50),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type AuthResult =
  | {
      success: true;
      user: {
        id: string;
        email: string;
        name: string;
      };
    }
  | {
      success: false;
      error: string;
    };



export async function productPropertyLinker(
  optionIds: string[],
  pathname: string,
) {
  if (!optionIds || optionIds.length === 0) {
    return [];
  }

  const productsProperties = await prisma.productsproperty.findMany({
    select: {
      productId: true,
    },
    where: {
      optionId: { in: optionIds },
    },
  });

  return productsProperties.map((item) => String(item.productId));
}

export async function signUpUser(data: CreateUserInput): Promise<AuthResult> {

  const parsed = createUserSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data.",
    };
  }

  try {
    const response = await auth.api.signUpEmail({
      body: {
        email: parsed.data.identifier.trim().toLowerCase(),
        password: parsed.data.password,
        name: `${parsed.data.firstName} ${parsed.data.lastName}`,
      },
    });

    await prisma.user.update({
      where: { id: response.user.id },
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
      },
    });
    console.log(response);

    return {
      success: true,
      user: {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
      },
    };
  } catch (error) {
    console.error("[auth] signUpEmail failed:", error);
    return {
      success: false,
      error: "some thing went wrong try again",
    };
  }
}

export async function signInUser({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}): Promise<AuthResult> {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email: identifier.trim().toLowerCase(),
        password,
      },
    });

    return {
      success: true,
      user: {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
      },
    };
  } catch (error) {
    console.error("[auth] signInEmail failed:", error);
    return {
      success: false,
      error: "some thing went wrong try again",
    };
  }
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
}
export async function userExists(email: string): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
    select: {
      id: true, 
    },
  });

  return Boolean(existingUser);
}
