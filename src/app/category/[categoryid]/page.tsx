
import {prisma} from '@/lib/prisma'
import {getClassifiedProducts , getProductsCategories , getProductsProperties} from "@/lib/data"
import { SearchParams } from 'next/dist/server/request/search-params'
import Image from "next/image";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterSection from '@/components/filter/Filter';
import type {
  PRODUCT_TYPE,
  CATEGORY_TYPE,
  CATEGORY_PROPERTIES,
} from "@/types/types";
import MobileFilter from '@/components/filter/MobileFilter';
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export async function generateStaticParams() {
  const allIds = await prisma.categories.findMany({
    select: { categoryId: true },
  });
  return allIds.map((category) => ({
    categoryid: category.categoryId,
  }));
}

export const dynamicParams = true

const sortOptions = [
  "پرفروش‌ترین",
  "جدیدترین",
  "ارزان‌ترین",
  "گران‌ترین",
  "پربازدیدترین",
];

const toPersianDigits = (value: string | number): string =>
  String(value)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

export default async function CategoryIdPage({params , searchParams}:{params:{categoryid:string}, searchParams:SearchParams}) {
  const {id} = await searchParams
  const ids: string[] = !id ? [] : Array.isArray(id) ? id : [id];
  console.log(ids)
  const {categoryid} = await params
   const products = await getClassifiedProducts(categoryid)
   const productsCategory = await getProductsCategories()
   const productsProperty = await getProductsProperties(categoryid)
   const finalProducts =ids?.length > 0 ? products.filter((product) => ids.includes(product.id)) : products;
   const count = Math.ceil(finalProducts.length/10); 
  


  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white px-3 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center text-[#1f1f1f]"
          >
            <ArrowLeft size={20} />
          </span>
          <h1 className="shrink-0 text-sm font-[iransansBold] text-[#1f1f1f]">
            {productsCategory[0]?.name ?? "دسته‌بندی"}
          </h1>
          <div className="relative min-w-0 flex-1">
            <input
              type="search"
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 pr-9 text-xs text-gray-900 outline-none transition focus:border-[#19bfd3] focus:bg-white"
              placeholder="جستجو..."
            />
            <SearchRoundedIcon
              sx={{ fontSize: 18, color: "#8a8a8a" }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </header>

      <div className="sticky top-13.5 z-30 border-b border-gray-200 bg-white lg:hidden">
        <div className="flex items-center gap-2 px-3 py-2">
          <MobileFilter properties={productsProperty} />
          <ul className="flex gap-2 overflow-x-auto whitespace-nowrap text-[11px]">
            {sortOptions.map((option, index) => (
              <li key={option}>
                <span
                  className={`block rounded-full px-3 py-1.5 ${
                    index === 0
                      ? "bg-[#f0f0f1] font-[iransansBold] text-[#23254e]"
                      : "text-[#62666d]"
                  }`}
                >
                  {option}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-4 pt-4 sm:px-6 lg:mt-40 lg:px-8">
        <header className="mr-77 mt-8 hidden lg:block">
          <ul className="flex items-stretch gap-2 whitespace-nowrap text-sm text-gray-600 xl:gap-3">
            <li className="shrink-0 font-semibold">مرتب سازی:</li>
            {sortOptions.map((option, index) => (
              <li
                key={option}
                className={`transition ${
                  index === 0
                    ? "font-semibold text-red-600 opacity-100"
                    : "text-gray-500 opacity-60"
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </header>

        <main className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)] lg:pt-5">
          <aside className="order-1 hidden h-fit rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-50 lg:block">
            <h2 className="mb-3 border-b border-gray-200 pb-2 px-1 text-lg font-bold text-gray-800">
              فیلترها
            </h2>
            <FilterSection properties={productsProperty} />
          </aside>

          <div className="order-3 flex flex-col justify-between gap-8 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {finalProducts.map((product) => (
                <Link
                  href={`/category/${product.categoryId}/${product.id}`}
                  key={product.id}
                  dir="rtl"
                  className="group box-border mx-auto flex h-full w-full max-w-full flex-row items-center gap-3 overflow-hidden border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-col sm:items-stretch sm:gap-3 sm:p-4"
                >
                  <div className="relative flex min-w-25 max-w-30 shrink-0 overflow-hidden rounded-xl sm:w-full sm:max-w-none">
                    <Image
                      src={`/${product.images[0]}`}
                      alt={product.name}
                      width={200}
                      height={200}
                      sizes="(max-width: 640px) 120px, 200px"
                      className="mx-auto aspect-square object-contain object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1 sm:pt-3">
                    {product.badge ? (
                      <span className="mb-2 w-fit rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-600">
                        {product.badge}
                      </span>
                    ) : (
                      <span className="mb-6 w-fit px-2.5 py-1" />
                    )}
                    <h2 className="text-xs font-semibold leading-7 text-[#474c4d] sm:text-[15px]">
                      {product.name}
                    </h2>
                    <div className="mt-3 flex flex-col gap-2">
                      <div className="flex items-center justify-end gap-2 text-xs font-semibold text-[#474c4d]">
                        <span>{toPersianDigits(product.rate)}</span>
                        <span aria-hidden="true" className="text-yellow-500">
                          ★
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="shrink-0 rounded-full border border-gray-300 px-3 py-1.5 text-[12px] font-medium text-gray-700">
                          مشاهده
                        </span>
                        <p className="min-w-0 truncate text-sm font-bold text-[#474c4d] sm:text-base">
                          {toPersianDigits(product.price)} تومان
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <nav
              aria-label="صفحه‌ها"
              className="my-8 flex justify-center"
              dir="ltr"
            >
              <div className="flex items-center gap-1">
                <Stack spacing={2}>
            <Pagination count={count} />
                </Stack>
                
              </div>
            </nav>
          </div>
        </main>
      </div>
    </>
  );
}
