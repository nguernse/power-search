import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { QUERY_SYMBOL } from "./constants";
import { Shortcut } from "@/types";
import { sample } from "lodash";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSearchUrl(url: string, query: string): string {
  return url.replace(QUERY_SYMBOL, encodeURIComponent(query));
}

export function randomId(): string {
  return uuidv4();
}

export function saveLocalState(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalState(key: string): any {
  const value = localStorage.getItem(key);

  return value !== null ? JSON.parse(value) : null;
}

export function removeLocalState(key: string): void {
  localStorage.removeItem(key);
}

export function getShortcut(shortcuts: Shortcut[], id: string): Shortcut {
  return shortcuts.find((shortcut) => shortcut.id === id) as Shortcut;
}

export function getRandomShortcut(shortcuts: Shortcut[]): Shortcut {
  return sample(shortcuts) as Shortcut;
}

export function getRandomShortcutUrl(shortcuts: Shortcut[]): Shortcut["url"] {
  const shortcut = getRandomShortcut(shortcuts);

  return shortcut.url;
}
