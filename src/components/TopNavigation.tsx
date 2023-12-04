import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function TopNavigation() {
  return (
    <Link
      href="/"
      className="underlined text-sm text-slate-500 hover:text-slate-600"
    >
      <ArrowLeftIcon className="inline-block w-5 h-5 mr-1 -mt-1" />
      Back to Search
    </Link>
  );
}
