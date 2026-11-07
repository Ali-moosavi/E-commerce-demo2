import HomeContent from '@/components/home/HomeContent'
import Footer from '@/components/footer/Footer'
import {getProducts} from '@/lib/data'

export default async function Home() {


  const products = await getProducts()
  console.log(products)

  return (
    <>
      <HomeContent products={products}/>
      <Footer/>
    </>

  )
}
