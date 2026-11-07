'use client'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Link from 'next/link';
import type { CATEGORY_TYPE } from "@/types/types";



export default function HeaderCategory({ isLoading = false , productCategories }: { isLoading?: boolean , productCategories: CATEGORY_TYPE[] }) {
  const [listStats, setListStats] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    productCategories[0]?.categoryId ?? '',
  )
  const selected = productCategories.find(
    (category) => category.categoryId === selectedCategory,
  )


  return (
    <li
      onMouseEnter={() => setListStats(true)}

      className="relative z-20 hidden text-[16px] lg:block"
    >
      <button
        type="button"
        className="flex items-center gap-1 cursor-pointer"
        aria-busy={isLoading}
      >
        <MenuIcon fontSize="inherit" />
        <span>دسته‌بندی کالاها</span>
      </button>

      {listStats && (
        <div
          onMouseOver={() => setListStats(true)}
          onMouseLeave={() => setListStats(false)}
          className="absolute -right-1 top-full mt-2 h-[60vh] w-[70vw] overflow-hidden rounded-b-xl border border-gray-200 bg-white text-black shadow-[0_18px_45px_rgba(0,0,0,0.14)] z-110 grid grid-cols-[220px_1fr]"
        >
          <div className='col-span-1 grid bg-[#f7f7f7]'>
            {productCategories.map((category) => (
              <Link
                key={category.categoryId}
                href={`/category/${category.categoryId}`}
                className={`flex items-center justify-between px-4 py-3 text-right text-sm transition-all duration-200 ${
                  selectedCategory === category.categoryId
                    ? 'bg-white text-[#ef4056] shadow-[inset_4px_0_0_#ef4056]'
                    : 'text-gray-700 hover:bg-white hover:text-[#ef4056]'
                }`}
                onClick={() => setListStats(false)}
                onMouseOver={() => setSelectedCategory(category.categoryId)}
              >
                <span>{category.name}</span>
                <span className={`text-lg leading-none ${selectedCategory === category.categoryId ? 'text-[#ef4056]' : 'text-gray-400'}`}>
                  ‹
                </span>
              </Link>
            ))}
          </div>

          <div className='col-span-1 p-4'>
            {isLoading ? (
              <div className="grid grid-cols-4 gap-x-8 gap-y-5">
                 {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
                  </div>
                ))}
              </div>
            ) : selected ? (
              <div className='grid grid-cols-4 gap-x-8 gap-y-5'>
                {selected.children.map((child:any) => (
                  <div key={child.categoryId} className='min-w-0'>
                    <Link
                      href={`/category/${child.categoryId}`}
                      className='mb-2 block text-sm font-bold text-gray-800 hover:text-[#ef4056]'
                      onClick={() => setListStats(false)}
                    >
                      {child.name}
                    </Link>

                    {child.children.length > 0 && (
                      <ul className="space-y-1.5 border-r border-gray-100 pr-2">
      {child.children.map((category:any) => (
        <li key={category.categoryId}>
          <Link
            href={`/category/${category.categoryId}`}
            className="block text-xs text-gray-500 transition-colors hover:text-[#ef4056]"
            onClick={() => setListStats(false)}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex h-full items-center justify-center text-sm text-gray-400'>
                انتخاب دسته‌بندی
              </div>
            )}
          </div>
        </div>
      )}
      <div className={`absolute w-screen h-screen top-8 -right-5 bg-black/20 z-90
         ${listStats ? '' : 'hidden'}`} />
    </li>
  );
} 
