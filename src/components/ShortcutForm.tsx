import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useSearchDispatch } from "@/lib/context/searchContext";
import { Switch } from "./ui/Switch";
import { QUERY_SYMBOL } from "@/lib/constants";
import { Shortcut } from "@/types";

const ShortcutSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
  isSelected: z.boolean(),
});

type Props = {
  onSubmit: () => void;
  shortcut?: Shortcut;
};

export default function ShortcutForm({ onSubmit, shortcut }: Props) {
  const dispatch = useSearchDispatch();

  const form = useForm<z.infer<typeof ShortcutSchema>>({
    resolver: zodResolver(ShortcutSchema),
    defaultValues: {
      name: shortcut?.name ?? "",
      url: shortcut?.url ?? "",
      isSelected: shortcut?.isSelected || false,
    },
  });

  const handleSubmit = (values: z.infer<typeof ShortcutSchema>) => {
    if (shortcut) {
      dispatch({
        type: "EDIT_SHORTCUT",
        payload: {
          ...shortcut,
          ...values,
        },
      });
    } else {
      dispatch({
        type: "ADD_SHORTCUT",
        payload: values,
      });
    }

    form.reset();
    onSubmit();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
        data-testid="shortcut-form"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  required
                  {...field}
                  data-testid="name-input"
                />
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
                <Input
                  type="text"
                  required
                  {...field}
                  data-testid="url-input"
                />
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
          name="isSelected"
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
                  disabled={shortcut?.isSelected}
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
            data-testid="form-cancel-button"
          >
            Cancel
          </Button>
          <Button type="submit" data-testid="form-submit-button">
            Save
          </Button>
        </section>
      </form>
    </Form>
  );
}
