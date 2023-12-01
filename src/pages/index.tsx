import EmptyShortcuts from "@/components/EmptyShortcuts";
import SearchForm from "@/components/search-form";
import SearchMenu from "@/components/search-menu";
import { useSearchContext } from "@/lib/context/searchContext";
import { createSearchUrl, getRandomShortcutUrl } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const state = useSearchContext();

  const handleSubmit = (query: string, isSurprise = false) => {
    const url = isSurprise ? getRandomShortcutUrl(state.shortcuts) : state.url;
    const searchUrl = createSearchUrl(url, query);

    window.open(searchUrl, state.settings.tabPreference);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center">
      <div className="container mx-auto max-w-screen-md">
        <header className="mb-3">
          <h1 className="mb-10 text-5xl font-bold text-center">
            Power <span className="text-orange-600">Search</span>
          </h1>
          {state.shortcuts.length > 0 ? (
            <section className="space-y-1">
              <div className="text-right">
                <SearchMenu />
              </div>
              <SearchForm onSubmit={handleSubmit} />
            </section>
          ) : (
            <EmptyShortcuts />
          )}
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
