import { getAllProducts, getHomepageProducts, getProduct } from "@/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-8 my-12 grid gap-8 md:grid-cols-2 md:gap-20 md:my-20">
        <div>
          <Image
            src={product.featuredImage.url}
            alt={product.title}
            width={600}
            height={600}
            className="rounded-lg"
          />
        </div>
        <section>
          <h1 className="font-bold tracking-tighter mb-4 text-3xl md:text-5xl">
            {product.title}
          </h1>
          <p className="text-xl mb-4">
            ${product.priceRange.minVariantPrice.amount}{" "}
            {product.priceRange.minVariantPrice.currencyCode}
          </p>
          {product.description !== "" && (
            <p className="mb-4">{product.description}</p>
          )}
          <Button>Buy product</Button>
        </section>
      </div>
    </div>
  );
}

/**
 * Generates metadata for a product page.
 */
export async function generateMetadata({ params }: { params: { slug: string }}) {
  const product = await getProduct(params.slug);

  if (!product) {
    return {};
  }

  return {
    title: product?.title,
  };
}

/**
 * Generate all product pages.
 */
export async function generateStaticParams() {

  /**
   * Intentionally using getHomepageProducts as it
   * queries most of the available products. Normally
   * I'd have a separate function to statically
   * generate the first 100 or so.
   */
  const products = await getAllProducts();

  if (!products || products.length === 0) {
    return [];
  }

  return products.map((product) => ({
    slug: product.node.handle,
  }));
}