"use client";

import React from "react";
import { Button } from "../ui/button";

export default function ClearFilters() {
  return (
    <div className="flex justify-center mt-4">
      <Button onClick={() => console.log("hi")} className="block w-full">
        Clear Filters
      </Button>
    </div>
  );
}
