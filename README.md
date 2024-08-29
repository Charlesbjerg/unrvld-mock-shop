## UNRVLD Interview Test

For ease, the API url has been hardcoded instead of put into an .env file. So all you should need to get going is to run `pnpm install` and `pnpm run dev`.

## Sidenote

Although filters are present, they do not apply correctly within the API. I've tried a few different approaches to getting it to work, but I cannot get a consistent result from the API. Sizes return nothing, and colours return everything. When I did get colours to work at one point, it only returned two products and were missing others.

Category pages are pulling through products based on the collection, but it seems like every collection has the same products.

Sort orders work as expected.
