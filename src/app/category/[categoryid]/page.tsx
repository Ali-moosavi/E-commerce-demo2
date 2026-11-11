import { Suspense } from "react";
import {
  getClassifiedProducts,
  getProductsCategories,
  getProductsProperties,
} from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterSection from "@/components/filter/Filter";
import MobileFilter from "@/components/filter/MobileFilter";
import ProductsGrid from "@/components/filter/ProductsGrid";

const sortOptions = [
  "پرفروش‌ترین",
  "جدیدترین",
  "ارزان‌ترین",
  "گران‌ترین",
  "پربازدیدترین",
];

export default async function CategoryIdPage({
  params,
}: {
  params: Promise<{ categoryid: string }>;
}) {
  const { categoryid } = await params;

  const [products, productsCategory, productsProperty] = await Promise.all([
    getClassifiedProducts(categoryid),
    getProductsCategories(),
    getProductsProperties(categoryid),
  ]);

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

      <div className=" lg:mt-40 lg:px-8">
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

          <Suspense
            fallback={<div className="p-8 text-center">در حال بارگذاری...</div>}
          >
            <ProductsGrid products={products} />
          </Suspense>
        </main>
      </div>
    </>
  );
}
