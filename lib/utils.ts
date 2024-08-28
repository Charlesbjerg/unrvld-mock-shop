import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prepareFiltersForQuery(params: URLSearchParams) {
  let filters = [];

  const sizes = params.getAll("Size[]");
  const colors = params.getAll("Color[]");

  if (sizes.length > 0) {
    filters.push(`size:(${sizes.join(" OR ")})`);
  }

  if (colors.length > 0) {
    filters.push(`color:(${colors.join(" OR ")})`);
  }

  // query: "product_type:Music OR product_type:Movies AND variants.price:>100";

  return filters.join(" AND ");
}
