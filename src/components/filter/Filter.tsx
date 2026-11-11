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
import { postFilterOptions } from "@/redux/features/properties/propertiesService";
import { usePathname, useRouter } from "next/navigation";

export default function FilterSection({
  properties,
}: {
  properties: CATEGORY_PROPERTIES[];
}) {
  const dispatch = useAppDispatch();
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Don't run on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // If all checkboxes are unchecked, reset URL to show all products
    if (filterOptions.length === 0) {
      router.push(pathname, { scroll: false });
      return;
    }

    dispatch(postFilterOptions({ filterOptions, pathname }))
      .unwrap()
      .then((productIds) => {
        const params = new URLSearchParams();
        if (productIds && productIds.length > 0) {
          productIds.forEach((id: string) => params.append("id", id));
        } else {
          params.append("id", "none"); // No products match this filter
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
  }, [filterOptions, dispatch, pathname, router]);

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
