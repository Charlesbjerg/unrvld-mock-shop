export type MenuCollectionsList = {
  collections: {
    edges: {
      cursor: string;
      node: {
        id: string;
        handle: string;
        title: string;
        description: string;
        image: {
          id: string;
          url: string;
        };
      };
    }[];
  };
};

export type Category = {
  collection: {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: {
      id: string;
      url: string;
    };
    products: {
      nodes: {
        id: string;
        title: string;
        handle: string;
      }[];
    };
  };
};

export type Product = {
  product: {
    id: string;
    title: string;
    description: string;
    featuredImage: {
      id: string;
      url: string;
    };
  };
};

export type ProductCollection = {
  products: {
    edges: {
      node: {
        id: string;
        title: string;
        handle: string;
        description: string;
        featuredImage: {
          id: string;
          url: string;
        };
        variants: {
          edges: {
            node: {
              price: {
                amount: number;
                currencyCode: string;
              };
            };
          };
        }[];
      };
    }[];
  };
};

export type FilterQuery = {
  products: {
    edges: {
      node: {
        options: {
          name: string;
          values: string[];
        };
      }[];
    }[];
  };
};
