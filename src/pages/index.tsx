import SearchForm, { SearchSchema } from "@/components/search-form";
import { useSearchContext } from "@/lib/context/SearchProvider";
import { createSearchUrl } from "@/lib/utils";
import Link from "next/link";
import * as z from "zod";

export default function Home() {
  const state = useSearchContext();

  const handleSubmit = ({ query }: z.infer<typeof SearchSchema>) => {
    const url = createSearchUrl(state.url, query);

    window.open(url, state.settings.tabPreference);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center">
      <div className="container mx-auto max-w-screen-md">
        <header className="mb-3">
          <h1 className="mb-10 text-5xl font-bold text-center">
            Power <span className="text-orange-600">Search</span>
          </h1>
          <section>
            <SearchForm onSubmit={handleSubmit} />
          </section>
        </header>

        <section className="text-center">
          <Link
            className="underline text-blue-500 hover:text-blue-600"
            href="/shortcuts"
          >
            Manage shortcuts
          </Link>
        </section>
      </div>
    </main>
  );
}
