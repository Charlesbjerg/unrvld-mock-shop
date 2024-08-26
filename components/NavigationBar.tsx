import Link from "next/link";

export default function NavigationBar({ categories }: { categories: any[] }) {
  return (
    <nav className="text-black flex-1">
      <ul className="flex items-center justify-center gap-x-8">
        {categories.map((category: any) => (
          <li key={category.node.id}>
            <Link
              href={`/categories/${category.node.handle}`}
              className="transition-opacity hover:opacity-50"
            >
              {category.node.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
