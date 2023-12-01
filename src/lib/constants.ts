import { SearchSettings, ShortcutMap } from "@/types";

export const QUERY_SYMBOL = "%Q";
export const DEFAULT_SHORTCUT = "google";
export const DEFAULT_SHORTCUTS: ShortcutMap = {
  google: {
    name: "Google",
    url: `https://google.com/search?q=${QUERY_SYMBOL}`,
  },
  wikipedia: {
    name: "Wikipedia",
    url: `https://wikipedia.org/w/index.php?search=${QUERY_SYMBOL}`,
  },
  bing: {
    name: "Bing",
    url: `https://www.bing.com/search?q=${QUERY_SYMBOL}`,
  },
  youtube: {
    name: "YouTube",
    url: `https://youtube.com/results?search_query=${QUERY_SYMBOL}`,
  },
  reddit: {
    name: "Reddit",
    url: `https://reddit.com/search?q=${QUERY_SYMBOL}`,
  },
  hackernews: {
    name: "Hacker News",
    url: `https://hn.algolia.com/?q=${QUERY_SYMBOL}`,
  },
};
export const DEFAULT_SETTINGS: SearchSettings = {
  autoSaveHistory: false,
  tabPreference: "_blank",
};
