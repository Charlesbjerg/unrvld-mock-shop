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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface IProps {
  filters: { [key: string]: string[] };
}

export default function GridFilters({ filters }: IProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  /**
   * When a filter is changed, add to query string
   * and replace the URL.
   */
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
    [searchParams, router, pathname],
  );

  /**
   * Check if a given filter is present in the URL
   * query string.
   */
  const isFilterActive = useCallback(
    (group: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      return params.getAll(`${group}[]`).includes(value);
    },
    [searchParams],
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-bold tracking-tighter text-xl">Filter</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InformationCircleIcon className="w-6 h-6" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[18rem]">
              <p>
                This list of filters is built up dynamically from the available
                products. However when applied to the query, they do not behave
                correctly. See comment in: <code>./lib/queries.ts</code>
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
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
