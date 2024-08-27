import { apiFetcher } from "./api";
import {
  Category,
  MenuCollectionsList,
  Product,
  ProductCollection,
} from "./types";

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
      }
    }

  `;

  const data = await apiFetcher<Product>(query);

  if (!data) {
    return false;
  }

  return data.product;
}

export async function getHomepageProducts() {
  const query = `
    {
      products(first: 12) {
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
            variants(first: 3) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
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

/**
  Returning an array here to emulate querying an
  API to return the data.
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
