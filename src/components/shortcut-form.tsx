import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useSearchContext,
  useSearchDispatch,
} from "@/lib/context/searchContext";
import { Switch } from "./ui/switch";
import { QUERY_SYMBOL } from "@/lib/constants";
import { Shortcut } from "@/types";

const ShortcutSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
  isDefault: z.boolean(),
});

type Props = {
  onSubmit: () => void;
  shortcut?: Shortcut;
};

export default function ShortcutForm({ onSubmit, shortcut }: Props) {
  const dispatch = useSearchDispatch();
  const { selectedShortcut } = useSearchContext();
  const isSelectedShortcut = selectedShortcut.id === shortcut?.id;

  const form = useForm<z.infer<typeof ShortcutSchema>>({
    resolver: zodResolver(ShortcutSchema),
    defaultValues: {
      name: shortcut?.name ?? "",
      url: shortcut?.url ?? "",
      isDefault: isSelectedShortcut,
    },
  });

  const handleSubmit = (values: z.infer<typeof ShortcutSchema>) => {
    const { isDefault, ...newShortcut } = values;

    if (shortcut) {
      dispatch({
        type: "EDIT_SHORTCUT",
        payload: {
          shortcut: {
            ...shortcut,
            ...newShortcut,
          },
          isDefault,
        },
      });
    } else {
      dispatch({
        type: "ADD_SHORTCUT",
        payload: { shortcut: newShortcut as Shortcut, isDefault },
      });
    }

    form.reset();
    onSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input type="text" required {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                When adding a URL, replace the search query with{" "}
                <strong>{QUERY_SYMBOL}</strong>. For example,
                https://www.google.com/search?q=<strong>{QUERY_SYMBOL}</strong>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel className="text-base">Default shortcut</FormLabel>
                <FormDescription>
                  Make this the default shortcut.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  disabled={isSelectedShortcut}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <section className="flex gap-x-2 justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              form.reset();
              onSubmit();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </section>
      </form>
    </Form>
  );
}
