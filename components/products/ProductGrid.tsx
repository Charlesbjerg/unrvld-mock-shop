import "@/components/products/ProductGrid.css";
import { ProductCard } from "./ProductCard";
import { getHomepageProducts, getProductFilters } from "@/lib/queries";
import SortOrder from "./SortOrder";
import GridFilters from "./GridFilters";
import ClearFilters from "./ClearFilters";

export default async function ProductGrid({
  activeFilters,
}: {
  activeFilters: URLSearchParams;
}) {
  const products = await getHomepageProducts(activeFilters);
  const filters = await getProductFilters();

  return (
    <section className="my-20 px-8 lg:px-20">
      <h2 className="mb-12 text-4xl font-bold tracking-tighter text-center">
        New on the grid
      </h2>
      <div className="lg:flex">
        <div className="p-4 bg-white rounded-lg text-black lg:w-1/5">
          <aside className="sticky top-8">
            <GridFilters filters={filters} />
            <SortOrder />
            <ClearFilters />
          </aside>
        </div>
        <div className="product-grid lg:flex-1">
          {products.map((product: any) => (
            <ProductCard key={product.node.id} product={product.node} />
          ))}
        </div>
      </div>
    </section>
  );
}
