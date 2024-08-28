"use client";

import React, { useCallback } from "react";
import { Checkbox } from "../ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export default function GridFilters({ filters }: { filters: any }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilterChange = useCallback(
    (group: string, value: string, checked: boolean | string) => {
      const params = new URLSearchParams(searchParams);

      // Get current values for the filter group
      const currentValues = params.getAll(`${group}[]`);

      if (checked) {
        // Add the new value if it's not already present
        if (!currentValues.includes(value)) {
          currentValues.push(value);
        }
      } else {
        // Remove the value if it exists
        const valueIndex = currentValues.indexOf(value);
        if (valueIndex > -1) {
          currentValues.splice(valueIndex, 1);
        }
      }

      // Update the URLSearchParams object
      params.delete(`${group}[]`);
      currentValues.forEach((val) => params.append(`${group}[]`, val));

      // Update the URL
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname],
  );

  const isFilterActive = useCallback(
    (group: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      return params.getAll(`${group}[]`).includes(value);
    },
    [searchParams],
  );

  return (
    <>
      <h3 className="font-bold tracking-tighter text-xl">Filter</h3>
      {Object.entries(filters).map(([key, values]) => (
        <Accordion key={key} type="single" collapsible>
          <AccordionItem value={key}>
            <AccordionTrigger>{key}</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {values.map((val: string) => (
                <div key={val} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${key}-${val}`}
                    onCheckedChange={(checked) =>
                      handleFilterChange(key, val, checked)
                    }
                    checked={isFilterActive(key, val)}
                  />
                  <label
                    htmlFor={`${key}-${val}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {val}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
}
