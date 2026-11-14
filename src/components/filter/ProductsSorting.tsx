"use client";
import { setProducts } from "@/redux/features/properties/propertiesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/setup/hooks";
import { PRODUCT_TYPE } from "@/types/types";
import { useEffect, useState } from "react";

const sortOptions = [
  { name: "پرفروش‌ترین", id: "topSeller" },
  { name: "جدیدترین", id: "newest" },
  { name: "ارزان‌ترین", id: "cheapest" },
  { name: "گران‌ترین", id: "mostExpensive" },
  { name: "پربازدیدترین", id: "mostViewed" },
];

const toCleanNumber = (val: string | number) => {
  if (typeof val === "number") return val;
  const englishStr = String(val)
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/,/g, "") // حذف کاماهای قیمت مثل 50,000,000
    .trim();
  return Number(englishStr) || 0;
};

export default function ProductsSorting({
  view,
  products,
}: {
  view: "desktop" | "mobile";
  products: PRODUCT_TYPE[];
}) {
  const dispatch = useAppDispatch();
  const { filteredProducts: reduxProducts } = useAppSelector(
    (state) => state.PropertyState,
  );
  const [activeSort, setActiveSort] = useState("topSeller");

  useEffect(() => {
    const finalProducts =
      reduxProducts === null
        ? products
        : products.filter((p) => reduxProducts.includes(String(p.id)));

    const sortedProducts = [...finalProducts].sort((a, b) => {
      if (activeSort === "cheapest") return Number(toCleanNumber(a.price)) - Number(toCleanNumber(b.price));
      if (activeSort === "topSeller") return Number(toCleanNumber(b.rate)) - Number(toCleanNumber(a.rate));
      if (activeSort === "mostExpensive")return Number(toCleanNumber(b.price)) - Number(toCleanNumber(a.price));
      if (activeSort === "newest") return String(b.id).localeCompare(String(a.id));
      return Number(toCleanNumber(b.rate)) - Number(toCleanNumber(a.rate));
    });

    dispatch(setProducts(sortedProducts));
  }, [activeSort, reduxProducts, products, dispatch]);

  return (
    <>
      {view === "mobile" && (
        <ul className="flex gap-2 overflow-x-auto whitespace-nowrap text-[11px] lg:hidden">
          {sortOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => setActiveSort(option.id)}
              className="cursor-pointer"
            >
              <span
                className={`block rounded-full px-3 py-1.5 ${
                  activeSort === option.id
                    ? "bg-[#f0f0f1] font-[iransansBold] text-[#23254e]"
                    : "text-[#62666d]"
                }`}
              >
                {option.name}
              </span>
            </li>
          ))}
        </ul>
      )}

      {view === "desktop" && (
        <header className="mr-77 mt-50 hidden lg:block">
          <ul className="flex items-stretch gap-2 whitespace-nowrap text-sm text-gray-600 xl:gap-3">
            <li className="shrink-0 font-semibold">مرتب سازی:</li>
            {sortOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => setActiveSort(option.id)}
                className={`cursor-pointer transition ${
                  activeSort === option.id
                    ? "font-semibold text-red-600 opacity-100"
                    : "text-gray-500 opacity-60"
                }`}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </header>
      )}
    </>
  );
}
