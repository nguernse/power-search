import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useSearchContext } from "@/lib/context/searchContext";
import { getSelectedShortcut } from "@/lib/utils";

export const SearchSchema = z.object({
  query: z.string(),
});

type Props = {
  onSubmit: (query: string, isSurprise?: boolean) => void;
};

export default function SearchForm({ onSubmit }: Props) {
  const state = useSearchContext();
  const selectedShortcut = getSelectedShortcut(state.shortcuts);
  const searchPlaceholder = `What do you want to search for on ${selectedShortcut.name}?`;
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      query: "",
    },
  });

  const handleSubmit = ({ query }: z.infer<typeof SearchSchema>) => {
    onSubmit(query);
  };

  const onSurpriseMe = () => {
    onSubmit(form.getValues("query"), true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  required
                  className="rounded-full"
                  icon={<MagnifyingGlassIcon className="w-5 h-5" />}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <section className="flex gap-x-2 justify-center">
          <Button type="submit" variant="outline">
            Search
          </Button>
          <Button type="button" variant="outline" onClick={onSurpriseMe}>
            Surprise me
          </Button>
        </section>
      </form>
    </Form>
  );
}
