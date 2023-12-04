import TopNavigation from "@/components/TopNavigation";
import ShortcutsTable from "@/components/shortcuts-table";

export default function Shortcuts() {
  return (
    <main className="min-h-screen p-5">
      <div className="container mx-auto">
        <TopNavigation />
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
