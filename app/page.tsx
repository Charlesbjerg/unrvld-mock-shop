import { getHomepageProducts } from "@/lib/queries";
import { ProductCard } from "@/components/products/ProductCard";

export default async function Home() {
  const products = await getHomepageProducts();

  return (
    <div>
      <h1 className="text-center my-20 text-3xl tracking-tighter">
        Shop Homepage
      </h1>
      <div className="max-w-5xl my-20 mx-auto grid grid-cols-3 gap-8">
        {products.map((product: any) => (
          <ProductCard key={product.node.id} product={product.node} />
        ))}
      </div>
    </div>
  );
}
