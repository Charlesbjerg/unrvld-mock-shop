import { getHeroSlides } from "@/lib/queries";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/products/ProductGrid";

export default async function Home({ searchParams }: { searchParams?: any }) {
  const heroSlides = getHeroSlides();

  return (
    <div>
      <Hero slides={heroSlides} />
      <ProductGrid activeFilters={new URLSearchParams(searchParams)} />
    </div>
  );
}

export const metadata = {
  title: "Homepage | mock.shop",
};
