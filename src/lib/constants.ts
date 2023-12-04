import { SearchSettings, Shortcut } from "@/types";

export const QUERY_SYMBOL = "%Q";
export const DEFAULT_SHORTCUTS: Shortcut[] = [
  {
    id: "google",
    name: "Google",
    url: `https://google.com/search?q=${QUERY_SYMBOL}`,
  },
  {
    id: "duckduckgo",
    name: "DuckDuckGo",
    url: `https://duckduckgo.com/?q=${QUERY_SYMBOL}`,
  },
  {
    id: "wikipedia",
    name: "Wikipedia",
    url: `https://wikipedia.org/w/index.php?search=${QUERY_SYMBOL}`,
  },
  {
    id: "bing",
    name: "Bing",
    url: `https://www.bing.com/search?q=${QUERY_SYMBOL}`,
  },
  {
    id: "youtube",
    name: "YouTube",
    url: `https://youtube.com/results?search_query=${QUERY_SYMBOL}`,
  },
  {
    id: "reddit",
    name: "Reddit",
    url: `https://reddit.com/search?q=${QUERY_SYMBOL}`,
  },
  {
    id: "hackernews",
    name: "Hacker News",
    url: `https://hn.algolia.com/?q=${QUERY_SYMBOL}`,
  },
];
export const DEFAULT_SHORTCUT = DEFAULT_SHORTCUTS[0];

export const DEFAULT_SETTINGS: SearchSettings = {
  autoSaveHistory: false,
  tabPreference: "_blank",
};

export const LOCAL_STATE_NAME = "PSState";
