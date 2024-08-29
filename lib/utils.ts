import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Takes a set of URLSearchParams and prepares them for a
 * Shopify Storefront GraphQL query.
 */
export function prepareFiltersForQuery(params: URLSearchParams) {
  let filters = [];

  // Only running size and color for now, would normally need to be dynamic
  const sizes = params.getAll("Size[]");
  const colors = params.getAll("Color[]");

  if (sizes.length > 0) {
    filters.push(`size:(${sizes.join(" OR ")})`);
  }

  if (colors.length > 0) {
    filters.push(`color:${colors.join(" OR ")}`);
  }

  if (filters.length > 0) {
    return `query: "${filters.join(" AND ")}"`;
  }

  return "";
}

/**
 * Takes a sort order key and prepares it for a Shopify 
 * Storefront GraphQL query.
 */
export function prepareSortForQuery(sortKey: string | null) {
  let key = "";

  // Take a key, convert it to the shopify equivalent
  if (sortKey === null || sortKey === "default") {
    key = "ID";
  } else {
    key = "PRICE";
  }

  // Only add reverse if order is desc
  if (sortKey?.includes("desc")) {
    key += `, reverse: true`;
  }

  return `sortKey: ${key}`;
}
