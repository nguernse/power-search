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
} from "@/components/ui/Table";
import { Button } from "./ui/Button";
import { SearchItem } from "@/types";

type Props = {
  history: SearchItem[];
};

export default function HistoryTable({ history }: Props) {
  return (
    <Table data-testid="history-table">
      <TableHeader>
        <TableRow>
          <TableHead>Query</TableHead>
          <TableHead>URL</TableHead>
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
          <TableRow data-testid="empty-row">
            <TableCell colSpan={2}>No history saved yet.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
