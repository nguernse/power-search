import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import AddShortcutForm from "./add-shortcut-form";
import { PropsWithChildren } from "@/types";

type Props = {
  onCancel?: () => void;
} & PropsWithChildren;

export default function AddShortcutDialog({ children, onCancel }: Props) {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(false);

    onCancel?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="outline">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add shortcut
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Shortcut</DialogTitle>
        </DialogHeader>

        <AddShortcutForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
