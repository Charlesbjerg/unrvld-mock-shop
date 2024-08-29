import Link from "next/link";

export default function NavigationBar({ categories }: { categories: any[] }) {
  return (
    <nav className="text-black md:flex-1 order-2 sm:order-[unset] overflow-auto w-full">
      <ul className="flex items-center md:justify-center gap-x-8 overflow-auto">
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
