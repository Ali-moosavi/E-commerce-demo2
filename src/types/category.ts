export type ProductCategory = {
  categoryId: string;
  name: string;
  children: ProductCategory[];
};
