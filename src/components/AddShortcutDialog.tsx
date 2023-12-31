import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { PropsWithChildren, Shortcut } from "@/types";
import ShortcutForm from "./ShortcutForm";

type Props = {
  onCancel?: () => void;
  shortcut?: Shortcut;
} & PropsWithChildren;

export default function AddShortcutDialog({
  children,
  onCancel,
  shortcut,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(false);

    onCancel?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="outline" size="sm" data-testid="dialog-button">
            {shortcut ? (
              <>
                <Pencil1Icon className="h-4 w-4 mr-2" />
                Edit shortcut
              </>
            ) : (
              <>
                <PlusIcon className="h-4 w-4 mr-2" />
                Add shortcut
              </>
            )}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent data-testid="dialog-content" className="sm:max-w-[425px]">
        <DialogHeader data-testid="dialog-header">
          <DialogTitle data-testid="dialog-title">
            {shortcut ? "Edit" : "Add"} Shortcut
          </DialogTitle>
        </DialogHeader>

        <ShortcutForm onSubmit={handleSubmit} shortcut={shortcut} />
      </DialogContent>
    </Dialog>
  );
}
