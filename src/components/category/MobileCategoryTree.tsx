'use client'
import type { ProductCategory } from '@/types/category'
import { useMemo, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'

function CategoryBranches({
  categories,
}: {
  categories: ProductCategory[]
}) {
  return (
    <div className="divide-y divide-[#f0f0f0]">
      {categories.map((category) => (
        <Accordion
          key={category.categoryId}
          dir="rtl"
          className="w-full"
        >
          <AccordionItem
            value={category.categoryId}
            className="border-0 bg-white"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <Link
                href={`/category/${category.categoryId}`}
                className="flex-1 text-right text-[13px] font-medium text-[#23254e]"
              >
                {category.name}
              </Link>
              {category.children.length > 0 && (
                <AccordionTrigger className="shrink-0 p-0" />
              )}
            </div>

            {category.children.length > 0 && (
              <AccordionContent className="px-0 pb-0">
                <CategoryBranches categories={category.children} />
              </AccordionContent>
            )}
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}

export default function MobileCategoryTree({ Categories }: { Categories: ProductCategory[] }) {
  const [selectedCategory, setSelectedCategory] = useState(
    Categories[0]?.categoryId ?? '',
  )

  const activeCategory = useMemo(
    () =>
      Categories.find((category) => category.categoryId === selectedCategory) ??
      Categories[0],
    [Categories, selectedCategory],
  )

  return (
    <div className="w-full bg-[#f0f0f0] lg:hidden">
      <div className="mx-auto max-w-300 overflow-hidden border border-[#e5e5e5] bg-white">
        <div className="flex min-h-[calc(100vh-8.5rem)] flex-row">

          <div className="w-24 shrink-0 overflow-y-auto bg-[#f3f3f3] md:border-l md:border-[#e5e5e5]">
            {Categories.map((category) => {
              const isSelected = category.categoryId === activeCategory?.categoryId
              return (
                <button
                  key={category.categoryId}
                  type="button"
                  onClick={() => setSelectedCategory(category.categoryId)}
                  className={`relative flex w-full cursor-pointer items-center justify-center border-b border-[#e5e5e5] py-5 text-center text-[12px] transition-all ${
                    isSelected
                      ? 'bg-white font-[iransansBold] text-[#1f1f1f]'
                      : 'bg-[#f3f3f3] font-medium text-[#4b4b4b] hover:bg-[#ebebeb]'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute inset-y-0 right-0 w-1 rounded-r-full bg-[#ef4056]" />
                  )}
                  {category.name}
                </button>
              )
            })}
          </div>


          <div className="flex-1 overflow-y-auto bg-white pb-6">
            {activeCategory ? (
              <>
                <Link
                  href={`/category/${activeCategory.categoryId}`}
                  className="flex items-center justify-between px-4 py-3.5 text-[13px] font-[iransansBold] text-[#23254e]"
                >
                  همه کالاهای {activeCategory.name}
                  <ChevronLeftRoundedIcon sx={{ fontSize: 18, color: '#a1a3a8' }} />
                </Link>

                <div className="border-t border-[#f0f0f0]">
                  <CategoryBranches categories={activeCategory.children} />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
