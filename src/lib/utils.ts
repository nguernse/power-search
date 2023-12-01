import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { QUERY_SYMBOL } from "./constants";
import { ShortcutMap } from "@/types";
import { sample } from "lodash";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSearchUrl(url: string, query: string): string {
  return url.replace(QUERY_SYMBOL, encodeURIComponent(query));
}

export function getRandomShortcut(shortcuts: ShortcutMap): string {
  const key = sample(Object.keys(shortcuts));

  return shortcuts[key as string].url;
}

export function randomId(): string {
  return uuidv4();
}
