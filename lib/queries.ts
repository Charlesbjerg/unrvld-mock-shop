import { apiFetcher } from "./api";
import {
  AllProducts,
  Category,
  FilterQuery,
  MenuCollectionsList,
  Product,
  ProductCollection,
} from "./types";
import { prepareFiltersForQuery, prepareSortForQuery } from "./utils";

/**
 * There's some strange behaviour going on with this GraphQL API.
 * Passing a size stops any products from being returned,
 * whereas passing a colour leads to all products being returned.
 *
 * Tried about 5/6 different syntax combinations for applying the
 * filters, including querying through a collection and none of
 * them seem to work correctly.
 */
export async function getHomepageProducts(filters: URLSearchParams) {
  const filterString = prepareFiltersForQuery(filters);
  const sortOrderString = prepareSortForQuery(filters.get("sort"));

  const query = `
    {
      products(first: 12, ${filterString}, ${sortOrderString}) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
              id
              url
            }
            options {
              id
              name
              values
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await apiFetcher<ProductCollection>(query);

  if (!data) {
    return false;
  }

  return data.products.edges;
}

export async function getAllProducts() {
  const query = `
    {
      products(first: 30) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;
  const data = await apiFetcher<AllProducts>(query);

  if (!data) {
    return [];
  }

  return data.products.edges;
}


export async function getMenuCollections() {
  const query = `
    {
      collections(first: 5) {
        edges {
          cursor
          node {
            id
            handle
            title
            description
            image {
              id
              url
            }
          }
        }
      }
    }
  `;

  const data = await apiFetcher<MenuCollectionsList>(query);

  if (!data) {
    return [];
  }

  return data.collections.edges;
}

export async function getCategory(slug: string) {
  const query = `
    {
      collection(handle: "${slug}") {
        id
        handle
        title
        description
          image {
            id
            url
          }
        }
        products(first: 12) {
          nodes {
            id
            title
            handle
            description
            featuredImage {
              id
              url
            }
            options {
              id
              name
              values
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
    }
  `;

  const data = await apiFetcher<Category>(query);

  if (!data) {
    return false;
  }

  return data;
}

export async function getProduct(slug: string) {
  const query = `
    {
      product(handle: "${slug}") {
        id
        title
        description
        featuredImage {
          id
          url
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }

  `;

  const data = await apiFetcher<Product>(query);

  if (!data) {
    return false;
  }

  return data.product;
}

export async function getProductFilters() {
  const query = `
    {
      products(first: 12) {
        edges {
          node {
            options {
              name
              values
            }
          }
        }
      }
    }
  `;

  const data = await apiFetcher<FilterQuery>(query);

  if (!data) {
    return false;
  }

  let filterList: { [key: string]: string[] } = {};

  data.products.edges.map(({ node }) => {
    node.options.map((group) => {
      if (typeof filterList[group.name] === "undefined") {
        filterList[group.name] = group.values;
      } else {
        group.values.map((value) => {
          if (!filterList[group.name].includes(value)) {
            filterList[group.name].push(value);
          }
        });
      }
    });
  });

  return filterList;
}

/**
 * Returning an array here to emulate querying an
 * API to return the data.
 */
export function getHeroSlides() {
  return [
    {
      title: "mock.shop",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper velit in ornare placerat. Pellentesque maximus sagittis justo, non dapibus lacus cursus sit amet.",
      image: {
        url: "/assets/hero-asset-1.jpg",
        alt: "Hero Slide 1",
      },
      cta: {
        link: "#",
        title: "Find out more",
      },
    },
    {
      title: "Sale now on",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper velit in ornare placerat. Pellentesque maximus sagittis justo, non dapibus lacus cursus sit amet.",
      image: {
        url: "/assets/hero-asset-2.jpg",
        alt: "Hero Slide 2",
      },
      cta: {
        link: "#",
        title: "Shop sale items",
      },
    },
    {
      title: "Fresh in on the rack",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper velit in ornare placerat. Pellentesque maximus sagittis justo, non dapibus lacus cursus sit amet.",
      image: {
        url: "/assets/hero-asset-3.jpg",
        alt: "Hero Slide 3",
      },
      cta: {
        link: "#",
        title: "See the latest products",
      },
    },
  ];
}
