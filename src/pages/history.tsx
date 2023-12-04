import AutoSaveHistorySwitch from "@/components/AutoSaveHistorySwitch";
import TopNavigation from "@/components/TopNavigation";
import HistoryTable from "@/components/history-table";
import PageMetadata from "@/components/page-metadata";
import { useSearchContext } from "@/lib/context/searchContext";

export default function History() {
  const { settings } = useSearchContext();

  return (
    <>
      <PageMetadata title="History" />
      <main className="min-h-screen p-5">
        <div className="container mx-auto">
          <TopNavigation />
          <header className="my-3">
            <h1 className="text-2xl font-bold">History</h1>
            <p>View your search history here.</p>
            <p>These are all your previous searches.</p>
          </header>

          {settings.autoSaveHistory ? (
            <HistoryTable />
          ) : (
            <section className="">
              <h2 className="text-xl font-semibold">
                You do not have auto-save searches turned on.
              </h2>
              <p className="mb-2">Would you like to auto-save searches?</p>

              <AutoSaveHistorySwitch asButton />
            </section>
          )}
        </div>
      </main>
    </>
  );
}
