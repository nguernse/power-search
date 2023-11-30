import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center">
      <div className="container mx-auto max-w-screen-md">
        <header className="mb-3">
          <h1 className="mb-10 text-5xl font-bold text-center">
            Power <span className="text-emerald-600">Search</span>
          </h1>
          <section>
            <div className="mb-2">
              <select
                className="py-1 px-3"
                name="shortcut-select"
                id="shortcut-select"
              >
                <option value="google">Google</option>
                <option value="bing">Bing</option>
                <option value="wikipedia">Wikipedia</option>
              </select>
            </div>

            <div>
              <input
                className="w-full border rounded-full py-2 px-3"
                type="search"
                placeholder="What do you want to search?"
              />
            </div>
          </section>

          <section className="flex gap-x-2 justify-center my-5">
            <Button size="sm" variant="secondary">
              Power search
            </Button>
            <Button size="sm" variant="secondary">
              Surprise me
            </Button>
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
