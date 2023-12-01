import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export const SearchSchema = z.object({
  query: z.string(),
});

type Props = {
  onSubmit: (values: z.infer<typeof SearchSchema>) => void;
};

export default function SearchForm({ onSubmit }: Props) {
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      query: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="search"
                  placeholder="What do you want to search for?"
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
          <Button type="button" variant="outline">
            Surprise me
          </Button>
        </section>
      </form>
    </Form>
  );
}