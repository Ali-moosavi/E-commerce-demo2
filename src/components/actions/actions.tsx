"use server";

import { auth, requireServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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

export async function getCurrentProductCartQuantity(productId: string) {
  const session = await requireServerSession();
  if (!productId) return 0;

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });
  if (!cart) return 0;

  const cartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    select: { quantity: true },
  });

  return cartItem?.quantity ?? 0;
}

export async function setCurrentProductCartQuantity(
  productId: string,
  quantity: number,
) {
  const session = await requireServerSession();
  if (!productId || !Number.isInteger(quantity) || quantity < 0) {
    throw new Error("Invalid cart item.");
  }

  const cart = await prisma.cart.upsert({
    where: { userId: session.user.id },
    update: {},
    create: { userId: session.user.id },
    select: { id: true },
  });

  if (quantity === 0) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });
    return 0;
  }

  const cartItem = await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    update: { quantity },
    create: { cartId: cart.id, productId, quantity },
    select: { quantity: true },
  });

  return cartItem.quantity;
}

export async function updateCartItemQuantity(
  cartId: string,
  productId: string,
  quantity: number,
) {
  const session = await requireServerSession();
  const cart = await prisma.cart.findFirst({
    where: { id: cartId, userId: session.user.id },
    select: { id: true },
  });
  if (!cart) throw new Error("Cart not found.");

  if (quantity <= 0) {
    return prisma.cartItem.deleteMany({
      where: {
        cartId,
        productId,
      },
    });
  }

  return prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId,
        productId,
      },
    },
    update: {
      quantity,
    },
    create: {
      cartId,
      productId,
      quantity,
    },
  });
}

export async function getUserCart(userId: string) {
  if (!userId) return null;

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return cart;
}


