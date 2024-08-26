import Link from "next/link";
import NavigationBar from "./NavigationBar";
import { getMenuCollections } from "@/lib/queries";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default async function Header() {
  const menuCategories = await getMenuCollections();

  return (
    <header className="bg-white flex items-center gap-x-10 px-20 py-4">
      <div className="w-1/4">
        <Link
          href="/"
          className="text-black inline-flex items-center gap-x-4 tracking-tighter"
        >
          <BanknotesIcon className="w-8 h-8" />
          mock.shop
        </Link>
      </div>
      <NavigationBar categories={menuCategories} />
      <div className="w-1/4 text-right">
        <Link
          href="#"
          className="inline-flex items-center gap-x-2 px-4 py-2 text-sm rounded-lg bg-violet-500 transition-colors hover:bg-opacity-50"
        >
          Example CTA
          <PaperAirplaneIcon className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}