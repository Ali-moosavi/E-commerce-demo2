import CategoryClientView from '@/components/category/CategoryClientView'
import {prisma} from '@/lib/prisma'
import {getClassifiedProducts , getProductsCategories , getProductsProperties} from "@/lib/data"

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const allIds = await prisma.categories.findMany({select:{categoryId:true}})
  return allIds.map((category) => ({
    categoryid: category.categoryId
  }))
}


export default async function CategoryIdPage({params}:{params:{categoryid:string}}) {
  const {categoryid} = await params
   const products = await getClassifiedProducts(categoryid)
   const productsCategory = await getProductsCategories()
   const productsProperty = await getProductsProperties(categoryid)

  //  const FilteredProducts = products.filter((product) => product.categoryId === categoryid || product === categoryid)

  return (
    <CategoryClientView products={products} categories={productsCategory} properties={productsProperty} />
  )
}
