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
import { Button } from "./ui/button";

export default function ShortcutsTable() {
  const { history } = useSearchContext();
  const dispatch = useSearchDispatch();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Query</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>
            <Button
              size="sm"
              variant="outline"
              onClick={() => dispatch({ type: "CLEAR_SEARCH_HISTORY" })}
            >
              Clear history
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.length > 0 ? (
          history.map((history, index) => (
            <TableRow key={index}>
              <TableCell>{history.query}</TableCell>
              <TableCell>{history.url}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2}>No history saved yet.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
