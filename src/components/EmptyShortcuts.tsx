import { useSearchDispatch } from "@/lib/context/searchContext";
import AddShortcutDialog from "./AddShortcutDialog";
import { Button } from "./ui/Button";

export default function EmptyShortcuts() {
  const dispatch = useSearchDispatch();

  return (
    <section className="text-center" data-testid="empty-shortcuts">
      <h2 className="text-xl font-semibold">You have no shortcuts.</h2>
      <p className="mb-2">
        You can add custom shortcuts, or use our predefined ones to get started.
      </p>

      <div className="flex items-center justify-center gap-x-2">
        <Button
          data-testid="predefined-shortcuts-button"
          variant="outline"
          size="sm"
          onClick={() => dispatch({ type: "POPULATE_WITH_DEFAULTS" })}
        >
          Use predefined shortcuts
        </Button>

        <AddShortcutDialog />
      </div>
    </section>
  );
}
