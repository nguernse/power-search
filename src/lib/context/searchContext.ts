import { SearchSettings, Shortcut } from "@/types";
import { useContext, createContext } from "react";
import {
  DEFAULT_SETTINGS,
  DEFAULT_SHORTCUT,
  DEFAULT_SHORTCUTS,
  LOCAL_STATE_NAME,
} from "../constants";
import { SearchActions } from "./searchReducers";
import { getLocalState } from "../utils";

export type SearchState = {
  selectedShortcut: Shortcut;
  shortcuts: Shortcut[];
  settings: SearchSettings;
};

export const getInitialSearchState = (): SearchState => {
  return getLocalState(LOCAL_STATE_NAME) || initialSearchState;
};
export const initialSearchState: SearchState = {
  selectedShortcut: DEFAULT_SHORTCUT,
  settings: DEFAULT_SETTINGS,
  shortcuts: DEFAULT_SHORTCUTS,
};

export const SearchContext = createContext<SearchState>(initialSearchState);
export const useSearchContext = () => useContext(SearchContext);

export const SearchDispatchContext = createContext<
  React.Dispatch<SearchActions>
>(() => {});
export const useSearchDispatch = () => useContext(SearchDispatchContext);
