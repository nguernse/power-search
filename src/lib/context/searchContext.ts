import { SearchItem, SearchSettings, Shortcut } from "@/types";
import { useContext, createContext } from "react";
import {
  DEFAULT_SETTINGS,
  DEFAULT_SHORTCUTS,
  LOCAL_STATE_NAME,
} from "../constants";
import { SearchActions } from "./searchReducers";
import { getLocalState } from "../utils";

export type SearchState = {
  shortcuts: Shortcut[];
  settings: SearchSettings;
  history: SearchItem[];
};

export const getInitialSearchState = (): SearchState => {
  return getLocalState(LOCAL_STATE_NAME) || initialSearchState;
};
export const initialSearchState: SearchState = {
  settings: DEFAULT_SETTINGS,
  shortcuts: DEFAULT_SHORTCUTS,
  history: [],
};

export const SearchContext = createContext<SearchState>(initialSearchState);
export const useSearchContext = () => useContext(SearchContext);

export const SearchDispatchContext = createContext<
  React.Dispatch<SearchActions>
>(() => {});
export const useSearchDispatch = () => useContext(SearchDispatchContext);
