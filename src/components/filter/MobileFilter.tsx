"use client"

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import FilterSection from "./Filter";
import { CATEGORY_PROPERTIES } from "@/types/types";
import { useState } from "react";

type ProductLink = {
  productId: string | null;
  optionId: string | null;
};

export default function MobileFilter ({
  properties,
  productLinks,
}: {
  properties: CATEGORY_PROPERTIES[];
  productLinks: ProductLink[];
}){

    const [filterOpen , setFilterOpen] = useState(false)


    return (
      <details className=" relative shrink-0">
        <summary
          onClick={() => {
            setFilterOpen(true);
          }}
          className="flex cursor-pointer list-none items-center gap-1 rounded-full border border-gray-300 px-3 py-1.5 text-[11px] font-medium text-gray-700"
        >
          <TuneRoundedIcon sx={{ fontSize: 16 }} />
          فیلترها
        </summary>
        <div
          className={`fixed inset-0 z-50 bg-black/40 ${filterOpen ? "block" : "hidden"}`}
        >
          <div className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white pb-20">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
              <h2 className="text-sm font-[iransansBold] text-[#23254e]">
                فیلترها
              </h2>
              <span
                onClick={() => {
                  setFilterOpen(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600"
              >
                <CloseRoundedIcon sx={{ fontSize: 18 }} />
              </span>
            </div>
            <div className="px-4 py-3">
              <FilterSection  properties={properties} productLinks={productLinks} />
            </div>
            <div className="sticky bottom-0 flex gap-3 border-t border-gray-200 bg-white px-4 py-3">
              <span
                onClick={() => {
                  setFilterOpen(false);
                }}
                className="flex h-11 flex-1 items-center justify-center rounded-lg bg-[#ef4056] text-xs font-[iransansBold] text-white"
              >
                مشاهده نتایج
              </span>
            </div>
          </div>
        </div>
      </details>
    );
}
