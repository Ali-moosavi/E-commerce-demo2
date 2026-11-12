"use client";

import { useAppSelector } from "@/redux/setup/hooks";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import type { PRODUCT_TYPE } from "@/types/types";

const toPersianDigits = (value: string | number): string =>
  String(value)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

export default function ProductsGrid({
  products,
}: {
  products: PRODUCT_TYPE[];
}) {
const reduxFiltered = useAppSelector(
  (state) => state.PropertyState.filteredProducts,
);

const finalProducts =
  reduxFiltered === null
    ? products
    : products.filter((p) => reduxFiltered.includes(String(p.id)));

  const count = Math.ceil(finalProducts.length / 10);

  return (
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

      <nav aria-label="صفحه‌ها" className="my-8 flex justify-center" dir="ltr">
        <div className="flex items-center gap-1">
          <Stack spacing={2}>
            <Pagination count={count} />
          </Stack>
        </div>
      </nav>
    </div>
  );
}
