"use client";

import type { CATEGORY_PROPERTIES } from "@/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/setup/hooks";
import { setfilteredProducts } from "@/redux/features/properties/propertiesSlice";

type ProductLink = {
  productId: string | null;
  optionId: string | null;
};

export default function FilterSection({
  properties,
  productLinks = [],
}: {
  properties: CATEGORY_PROPERTIES[];
  productLinks?: ProductLink[];
}) {
  const dispatch = useAppDispatch();
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (filterOptions.length === 0) {
      dispatch(setfilteredProducts(null)); // null = show all products
      return;
    }

    const matchedProductIds = productLinks
      .filter((link) => link.optionId && filterOptions.includes(link.optionId))
      .map((link) => String(link.productId));

    dispatch(setfilteredProducts(matchedProductIds));
  }, [filterOptions, productLinks, dispatch]);

  const checkboxChangeHandeler = (checked: boolean, optionId: string) => {
    if (checked) {
      setFilterOptions((pre) => [...pre, optionId]);
    } else {
      setFilterOptions((filter) =>
        filter.filter((option) => option !== optionId),
      );
    }
  };

  return (
    <Accordion className="h-[85dvh]">
      {properties.map((property) => (
        <AccordionItem
          key={property.propertyCategoryId}
          value={property.propertyCategoryId}
          className="border-b border-gray-200"
        >
          <AccordionTrigger className="py-3 text-right text-md font-medium text-gray-700">
            {property.nameFa}
          </AccordionTrigger>
          <AccordionContent className="pb-3 text-md overflow-y-visible pt-1">
            <div className="space-y-2">
              {property.propertyOptions.map((option) => (
                <label
                  key={option.optionId}
                  className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 hover:text-red-600"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-red-500"
                    onChange={(e) => {
                      checkboxChangeHandeler(e.target.checked, option.optionId);
                    }}
                    checked={filterOptions.includes(option.optionId)}
                  />
                  <span>{option.nameFa}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
