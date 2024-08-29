import Image from "next/image";
import Link from "next/link";
import ProductMiniOptions from "./ProductMiniOptions";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link
      href={`/products/${product.handle}`}
      key={product.id}
      className="bg-white rounded-lg shadow-opacity-0 group transition-all hover:shadow-lg"
    >
      <div className="overflow-hidden aspect-square rounded-t-lg">
        <Image
          src={product.featuredImage.url}
          alt={product.title}
          height={625}
          width={625}
          className="rounded-t-lg transition-all group-hover:scale-110 group-hover:opacity-75"
        />
      </div>
      <div className="px-4 py-6 text-black">
        <h2 className="text-xl tracking-tighter mb-1 transition-opacity group-hover:opacity-75">
          {product.title}
        </h2>
        <p className="mb-4">From ${product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}</p>
        {product.options.length > 0 && (
          <ProductMiniOptions options={product.options} />
        )}
      </div>
    </Link>
  );
}
