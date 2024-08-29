import { getProduct } from "@/lib/queries";
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
      <div className="max-w-7xl my-20 mx-auto px-8 grid grid-cols-2 gap-20">
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
          <h1 className="font-bold text-5xl tracking-tighter mb-4">
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
