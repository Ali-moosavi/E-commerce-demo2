import { prisma } from "@/lib/prisma";

export async function getProducts() {
  const products = await prisma.grandChildProduct.findMany();
  return products;
}

export async function getClassifiedProducts(id: string) {
  if (!id) return [];

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
  const productsCategory = await prisma.categories.findMany({
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
  if (!categoryId) return [];

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
  if (!id) return null;

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

export async function getProductsPropertyLinks() {
  return prisma.productsproperty.findMany({
    select: {
      productId: true,
      optionId: true,
    },
  });
}