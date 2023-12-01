import ShortcutsTable from "@/components/shortcuts-table";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Shortcuts() {
  return (
    <main className="min-h-screen p-5">
      <div className="container mx-auto">
        <Link
          href="/"
          className="underlined text-sm text-slate-500 hover:text-slate-600"
        >
          <ArrowLeftIcon className="inline-block w-5 h-5 mr-1 -mt-1" />
          Back to Search
        </Link>
        <header className="my-3">
          <h1 className="text-2xl font-bold">Shortcuts</h1>
          <p>Manage your shortcuts here.</p>
          <p>
            These shortcuts will show up in the More menu on the search page.
          </p>
        </header>

        <ShortcutsTable />
      </div>
    </main>
  );
}
