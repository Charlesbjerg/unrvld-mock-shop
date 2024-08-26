import { getCategory } from "@/lib/queries";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  // TODO: Update to pull through products
  const category = await getCategory(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <header className="my-20 max-w-2xl mx-auto text-center">
        <h1 className="text-white text-4xl -tracking-widest mb-4">
          {category.collection.title}
        </h1>
        {category.collection.description !== "" && (
          <p>{category.collection.description}</p>
        )}
      </header>
    </div>
  );
}
