import Image from "next/image";
import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import ProductMiniOptions from "./ProductMiniOptions";

export function ProductCard({ product }: { product: any }) {
  return (
    <Link
      href={`/products/${product.handle}`}
      key={product.id}
      className="bg-white rounded-lg shadow-sm group transition-all hover:shadow-lg"
    >
      <div className="overflow-hidden aspect-square">
        <Image
          src={product.featuredImage.url}
          alt={product.title}
          height={625}
          width={625}
          className="rounded-t-lg transition-all group-hover:scale-110 group-hover:opacity-75"
        />
      </div>
      <div className="px-4 py-6 text-black">
        <h2 className="text-xl tracking-tighter mb-4 transition-opacity group-hover:opacity-75">
          {product.title}
        </h2>
        {product.options.length > 0 && (
          <ProductMiniOptions options={product.options} />
        )}
      </div>
    </Link>
  );
}
