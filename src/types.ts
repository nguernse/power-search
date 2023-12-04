import { ReactNode } from "react";

export type PropsWithChildren<T = ReactNode> = {
  children?: T;
};

export type TabPreference = "_self" | "_blank" | "_parent";
export type SearchSettings = {
  autoSaveHistory: boolean;
  tabPreference: TabPreference;
};

export type Shortcut = {
  id: string;
  name: string;
  url: string;
  isSelected: boolean;
};
export type ShortcutWithoutId = Omit<Shortcut, "id">;
export type ShortcutMap = Record<string, Shortcut>;
export type SearchItem = {
  query: string;
  url: Shortcut["url"];
};
