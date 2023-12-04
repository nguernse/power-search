import AutoSaveHistorySwitch from "@/components/AutoSaveHistorySwitch";
import TopNavigation from "@/components/TopNavigation";

export default function Settings() {
  return (
    <main className="min-h-screen p-5">
      <div className="container mx-auto">
        <TopNavigation />
        <header className="my-3">
          <h1 className="text-2xl font-bold">Settings</h1>
        </header>
        <ul>
          <li className="flex items-center gap-x-2">
            <AutoSaveHistorySwitch />
          </li>
        </ul>
      </div>
    </main>
  );
}
