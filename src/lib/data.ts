"use server";

import { prisma } from "@/lib/prisma";

export async function getProducts() {
  const products = await prisma.grandChildProduct.findMany();
  return products;
}

export async function getClassifiedProducts(id: string) {
  const category = await prisma.categories.findUnique({
    where: {
      categoryId: id,
    },
    select: {
      categoryId: true,
      children: {
        select: {
          categoryId: true,
          children: {
            select: { categoryId: true },
          },
        },
      },
    },
  });

  if (!category) return [];

  const categoryIds = [
    category.categoryId,
    ...category.children.flatMap((child) => [
      child.categoryId,
      ...child.children.map((grandchild) => grandchild.categoryId),
    ]),
  ];

  return prisma.grandChildProduct.findMany({
    where: {
      OR: [{ categoryId: { in: categoryIds } }, { parentCategoryId: id }],
    },
  });
}

export async function getProductsCategories() {
  const productsCategory = prisma.categories.findMany({
    where: { parentCategoryId: null },
    include: {
      children: {
        include: { children: true },
      },
    },
  });
  return productsCategory;
}

export async function getProductsProperties(categoryId: string) {
  const category = await prisma.categories.findUnique({
    where: { categoryId },
    select: {
      categoryId: true,
      parent: {
        select: {
          categoryId: true,
          parent: { select: { categoryId: true } },
        },
      },
    },
  });

  if (!category) return [];

  const productTypeId =
    category.parent?.parent?.categoryId ??
    category.parent?.categoryId ??
    category.categoryId;

  return prisma.properties.findMany({
    where: { productTypeId },
    include: { propertyOptions: true },
  });
}

export async function getProductById(id: string) {
  return prisma.grandChildProduct.findUnique({
    where: { id },
    include: {
      category: { select: { name: true } },
      pageDetails: {
        include: {
          featureHighlights: true,
          specifications: true,
        },
      },
    },
  });
}


export async function getCartStatus(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });
  return cart; 
}

export async function createCart(userId: string) {
  const cart = await prisma.cart.create({
    data: {
      userId,
    },
  });
  return cart;
}

export async function getProductCartQuantity(
  userId: string,
  productId: string,
) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) return 0;

  const cartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  return cartItem ? cartItem.quantity : 0;
}

export async function updateCartItemQuantity(
  cartId: string,
  productId: string,
  quantity: number,
) {
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