"use client";

import React, { useCallback, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortOrder() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilterChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("sort", value);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const activeSortOrder = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    return params.get(`sort`) ?? "";
  }, [searchParams]);

  return (
    <div className="mt-4">
      <label className="mb-2 inline-block text-sm">Sort by</label>
      <Select onValueChange={handleFilterChange} defaultValue={activeSortOrder}>
        <SelectTrigger>
          <SelectValue placeholder="Sort products" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="price-asc">Price Asc</SelectItem>
          <SelectItem value="price-desc">Price Desc</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
