import EmptyShortcuts from "@/components/EmptyShortcuts";
import PageMetadata from "@/components/PageMetadata";
import SearchForm from "@/components/SearchForm";
import SearchMenu from "@/components/SearchMenu";
import {
  useSearchContext,
  useSearchDispatch,
} from "@/lib/context/searchContext";
import {
  createSearchUrl,
  getRandomShortcutUrl,
  getSelectedShortcut,
} from "@/lib/utils";
import Link from "@/components/Link";

export default function Home() {
  const state = useSearchContext();
  const dispatch = useSearchDispatch();
  const selectedShortcut = getSelectedShortcut(state.shortcuts);
  const isAutoSave = state.settings.autoSaveHistory;

  const handleSubmit = (query: string, isSurprise = false) => {
    const url = isSurprise
      ? getRandomShortcutUrl(state.shortcuts)
      : selectedShortcut.url;
    const searchUrl = createSearchUrl(url, query);

    window.open(searchUrl, state.settings.tabPreference);

    if (isAutoSave) {
      dispatch({
        type: "SAVE_SEARCH_HISTORY",
        payload: { query, url: searchUrl },
      });
    }
  };

  return (
    <>
      <PageMetadata />
      <main className="min-h-screen flex flex-col justify-center">
        <div className="container mx-auto max-w-screen-md">
          <header className="mb-3">
            <h1 className="mb-10 text-5xl font-bold text-center">
              Power{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-600">
                Search
              </span>
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

          <section className="text-center space-x-2">
            <Link href="/shortcuts">Manage shortcuts</Link>
          </section>
        </div>
      </main>
    </>
  );
}
