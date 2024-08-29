import BasicProductGrid from "@/components/products/BasicProductGrid";
import { getCategory, getMenuCollections } from "@/lib/queries";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <header className="my-20 max-w-2xl mx-auto text-center px-8 lg:px-20">
        <h1 className="font-bold text-5xl tracking-tighter mb-4">
          {category.collection.title}
        </h1>
        {category.collection.description !== "" && (
          <p>{category.collection.description}</p>
        )}
      </header>
      <BasicProductGrid products={category.products.nodes} />
    </div>
  );
}

/**
 * Generates metadata for a category page.
 */
export async function generateMetadata({ params }: { params: { slug: string }}) {
  const category = await getCategory(params.slug);

  if (!category) {
    return false;
  }

  return {
    title: category.collection.title,
  };
}

/**
 * Generate all category pages.
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  /**
   * Intentionally using getMenuCollections as it
   * queries the only 'available' collections. Normally
   * I'd have a separate function to statically
   * generate the most of the data.
   */
  const categories = await getMenuCollections();

  if (!categories || categories.length === 0) {
    return [];
  }

  return categories.map((category) => ({
    slug: category.node.handle,
  }));
}