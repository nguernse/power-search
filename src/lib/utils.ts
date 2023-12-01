import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { QUERY_SYMBOL } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSearchUrl(url: string, query: string): string {
  return url.replace(QUERY_SYMBOL, encodeURIComponent(query));
}
