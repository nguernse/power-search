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
import { useSearchDispatch } from "@/lib/context/searchContext";

export const AddShortcutSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
});

type Props = {
  onSubmit: () => void;
};

export default function AddShortcutForm({ onSubmit }: Props) {
  const dispatch = useSearchDispatch();
  const form = useForm<z.infer<typeof AddShortcutSchema>>({
    resolver: zodResolver(AddShortcutSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof AddShortcutSchema>) => {
    dispatch({ type: "ADD_SHORTCUT", payload: values });
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
                <strong>%Q</strong>. For example,
                https://www.google.com/search?q=<strong>%Q</strong>.
              </FormDescription>
              <FormMessage />
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
