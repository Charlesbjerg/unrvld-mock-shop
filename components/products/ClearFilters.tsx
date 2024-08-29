"use client";

import React, { useCallback } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function ClearFilters() {
  const router = useRouter();
  const pathname = usePathname();

  const clear = useCallback(() => {
    router.push(`${pathname}`, { scroll: false });
  }, [router, pathname]);

  return (
    <div className="flex justify-center mt-4">
      <Button onClick={clear} className="block w-full">
        Clear Filters
      </Button>
    </div>
  );
}
