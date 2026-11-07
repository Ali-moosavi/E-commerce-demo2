import { prisma } from "@/lib/prisma";
import type { ProductCategory } from "@/types/category";

export async function getProductsCategory(): Promise<ProductCategory[]> {
  const categories = await prisma.categories.findMany({
    where: { parentCategoryId: null },
    include: {
      children: {
        include: { children: true },
      },
    },
  });

  const toProductCategory = (category: {
    categoryId: string;
    name: string;
    children: { categoryId: string; name: string; children: { categoryId: string; name: string }[] }[];
  }): ProductCategory => ({
    categoryId: category.categoryId,
    name: category.name,
    children: category.children.map((child) => ({
      categoryId: child.categoryId,
      name: child.name,
      children: child.children.map((grandchild) => ({
        categoryId: grandchild.categoryId,
        name: grandchild.name,
        children: [],
      })),
    })),
  });

  return categories.map(toProductCategory);
}
