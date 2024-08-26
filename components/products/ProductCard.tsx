import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: any }) {
  return (
    <article key={product.id} className="bg-white rounded-lg shadow-lg">
      <Image
        src={product.featuredImage.url}
        alt={product.title}
        height={500}
        width={500}
        className="rounded-t-lg"
      />
      <div className="px-4 py-6 text-black">
        <h2 className="text-xl tracking-tighter mb-2">{product.title}</h2>
        <Link
          href={`/products/${product.handle}`}
          className="inline-flex items-center gap-x-2 group"
        >
          View Product
          <ArrowLongRightIcon className="w-6 h-6 transition-all group-hover:opacity-50 group-hover:translate-x-2" />
        </Link>
      </div>
    </article>
  );
}
