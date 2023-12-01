import {
  useSearchContext,
  useSearchDispatch,
} from "@/lib/context/searchContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddShortcutDialog from "./add-shortcut-dialog";
import { Button } from "./ui/button";
import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import EmptyShortcuts from "./EmptyShortcuts";

export default function ShortcutsTable() {
  const { shortcuts } = useSearchContext();
  const dispatch = useSearchDispatch();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>
            <AddShortcutDialog>
              <Button variant="outline" size="sm">
                <PlusIcon className="inline-block w-5 h-5 mr-1 -mt-1" />
                Add Shortcut
              </Button>
            </AddShortcutDialog>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shortcuts.length > 0 ? (
          shortcuts.map((shortcut) => (
            <TableRow key={shortcut.id}>
              <TableCell>{shortcut.name}</TableCell>
              <TableCell>{shortcut.url}</TableCell>
              <TableCell className="space-x-2">
                <AddShortcutDialog shortcut={shortcut}>
                  <Button variant="outline" size="sm">
                    <Pencil1Icon className="w-5 h-5" />
                  </Button>
                </AddShortcutDialog>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    dispatch({ type: "DELETE_SHORTCUT", payload: shortcut.id })
                  }
                >
                  <TrashIcon className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2}>
              <EmptyShortcuts />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
