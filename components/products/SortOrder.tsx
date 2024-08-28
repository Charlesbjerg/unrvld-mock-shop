"use client";

import React from "react";

export default function SortOrder() {
  return (
    <div>
      <p>Sort</p>
      <select>
        <option value="default">Default</option>
        <option value="price-asc">Price ASC</option>
        <option value="price-desc">Price DESC</option>
      </select>
    </div>
  );
}
