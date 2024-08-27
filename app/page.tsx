import { getHeroSlides, getHomepageProducts } from "@/lib/queries";
import { ProductCard } from "@/components/products/ProductCard";
import Hero from "@/components/Hero";

export default async function Home() {
  const products = await getHomepageProducts();
  const heroSlides = getHeroSlides();

  return (
    <div>
      <Hero slides={heroSlides} />

      <section className="my-20 px-8 lg:px-20">
        <h2 className="mb-12 text-4xl font-bold tracking-tighter text-center">
          New on the grid
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {products.map((product: any) => (
            <ProductCard key={product.node.id} product={product.node} />
          ))}
        </div>
      </section>
    </div>
  );
}
