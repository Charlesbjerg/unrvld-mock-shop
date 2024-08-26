import { getProduct } from "@/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {
  // TODO: Update to pull through products
  const product = await getProduct(params.slug);

  console.log("product", params.slug, product);

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
          <h1 className="text-white text-4xl -tracking-widest mb-4">
            {product.title}
          </h1>
          {product.description !== "" && <p>{product.description}</p>}
        </section>
      </div>
    </div>
  );
}
