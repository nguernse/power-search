import { SearchSettings, Shortcut } from "@/types";

export const QUERY_SYMBOL = "%Q";
export const DEFAULT_SHORTCUTS: Shortcut[] = [
  {
    id: "google",
    name: "Google",
    url: `https://google.com/search?q=${QUERY_SYMBOL}`,
    isSelected: true,
  },
  {
    id: "duckduckgo",
    name: "DuckDuckGo",
    url: `https://duckduckgo.com/?q=${QUERY_SYMBOL}`,
    isSelected: false,
  },
  {
    id: "wikipedia",
    name: "Wikipedia",
    url: `https://wikipedia.org/w/index.php?search=${QUERY_SYMBOL}`,
    isSelected: false,
  },
  {
    id: "bing",
    name: "Bing",
    url: `https://www.bing.com/search?q=${QUERY_SYMBOL}`,
    isSelected: false,
  },
  {
    id: "youtube",
    name: "YouTube",
    url: `https://youtube.com/results?search_query=${QUERY_SYMBOL}`,
    isSelected: false,
  },
  {
    id: "reddit",
    name: "Reddit",
    url: `https://reddit.com/search?q=${QUERY_SYMBOL}`,
    isSelected: false,
  },
  {
    id: "hackernews",
    name: "Hacker News",
    url: `https://hn.algolia.com/?q=${QUERY_SYMBOL}`,
    isSelected: false,
  },
];

export const DEFAULT_SETTINGS: SearchSettings = {
  autoSaveHistory: false,
  tabPreference: "_blank",
};

export const LOCAL_STATE_NAME = "PSState";
