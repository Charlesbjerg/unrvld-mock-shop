// Would normally be imported from .env
const SHOP_API_URL = "https://mock.shop/api";

export async function apiFetcher<T>(
  query: string,
  variables?: any,
): Promise<T | false> {
  // Note: Fetcher function will need updating if graphql variables need
  // passing through.

  const request = await fetch(
    `${SHOP_API_URL}/?query=${encodeURIComponent(query)}`,
  );
  const response = await request.json();

  // TODO: Add better error handling
  if (request.status !== 200 || response.errors !== undefined) {
    console.error(`API request failed`, request, response);
    return false;
  }

  return response.data;
}
