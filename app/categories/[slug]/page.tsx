import BasicProductGrid from "@/components/products/BasicProductGrid";
import { getCategory } from "@/lib/queries";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {

  const category = await getCategory(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <header className="my-20 max-w-2xl mx-auto text-center">
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
