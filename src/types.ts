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
  name: string;
  url: string;
};
export type ShortcutMap = Record<string, Shortcut>;
