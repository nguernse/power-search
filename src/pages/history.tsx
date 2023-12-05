import AutoSaveHistorySwitch from "@/components/AutoSaveHistorySwitch";
import TopNavigation from "@/components/TopNavigation";
import HistoryTable from "@/components/HistoryTable";
import PageMetadata from "@/components/PageMetadata";
import { Button } from "@/components/ui/button";
import {
  useSearchContext,
  useSearchDispatch,
} from "@/lib/context/searchContext";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import Link from "@/components/Link";

export default function History() {
  const { settings, history } = useSearchContext();
  const dispatch = useSearchDispatch();

  return (
    <>
      <PageMetadata title="History" />
      <main className="min-h-screen p-5">
        <div className="container mx-auto">
          <TopNavigation />
          <header className="my-3">
            <h1 className="text-2xl font-bold">History</h1>
            <p>View your previous searches here.</p>
            <p>
              If you would like to not track your searches, update your{" "}
              <Link href="/settings">settings</Link>.
            </p>
          </header>

          {settings.autoSaveHistory ? (
            <>
              {history.length > 0 && (
                <Button
                  className="mb-2"
                  size="sm"
                  variant="outline"
                  onClick={() => dispatch({ type: "CLEAR_SEARCH_HISTORY" })}
                >
                  <CounterClockwiseClockIcon className="w-4 h-4 mr-2" />
                  Clear history
                </Button>
              )}
              <div className="rounded-md border">
                <HistoryTable history={history} />
              </div>
            </>
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
