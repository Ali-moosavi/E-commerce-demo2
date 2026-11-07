"use client"

import type { CATEGORY_PROPERTIES } from "@/types/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useState } from "react";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/setup/hooks";
import { setfilteredProperties } from "@/redux/features/properties/propertiesSlice";
import { postFilterOptions } from "@/redux/features/properties/propertiesService";






export default function FilterSection({
  properties,
}: {
  properties: CATEGORY_PROPERTIES[];
}) {
  const dispatch = useAppDispatch();
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [Checked, setChecked] = useState(false);

  useEffect(() => {
    dispatch(postFilterOptions(filterOptions));
  }, [filterOptions, dispatch]);

  const checkboxChangeHandeler = (checked: boolean, optionId: string) => {
    setChecked(checked);
    if (checked) {
      setFilterOptions((pre) => [...pre, optionId]);
    } else if (!checked) {
      setFilterOptions((filter) =>
        filter.filter((option) => {
          return option != optionId;
        }),
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
