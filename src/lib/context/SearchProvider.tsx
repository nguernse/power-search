import {
  PropsWithChildren,
  SearchSettings,
  Shortcut,
  ShortcutMap,
} from "@/types";
import { useContext, createContext } from "react";
import {
  DEFAULT_SETTINGS,
  DEFAULT_SHORTCUT,
  DEFAULT_SHORTCUTS,
} from "../constants";
import { randomId } from "../utils";

type SearchState = {
  selectedShortcut: string;
  settings: SearchSettings;
  shortcuts: ShortcutMap;
  query: string;
  url: string;
};

export const initialState: SearchState = {
  selectedShortcut: DEFAULT_SHORTCUT,
  url: DEFAULT_SHORTCUTS[DEFAULT_SHORTCUT].url,
  settings: DEFAULT_SETTINGS,
  shortcuts: DEFAULT_SHORTCUTS,
  query: "",
};

const SearchContext = createContext<SearchState>(initialState);
export const useSearchContext = () => useContext(SearchContext);

type DispatchActions =
  | { type: "SET_SELECTED_SHORTCUT"; payload: string }
  | { type: "UPDATE_QUERY"; payload: string }
  | { type: "ADD_SHORTCUT"; payload: Shortcut };

const SearchDispatchContext = createContext<React.Dispatch<DispatchActions>>(
  () => {}
);
export const useSearchDispatch = () => useContext(SearchDispatchContext);

export function searchReducer(
  state: SearchState,
  action: DispatchActions
): SearchState {
  switch (action.type) {
    case "SET_SELECTED_SHORTCUT":
      return {
        ...state,
        selectedShortcut: action.payload,
        url: state.shortcuts[action.payload].url,
      };
    case "UPDATE_QUERY":
      return {
        ...state,
        query: action.payload,
      };
    case "ADD_SHORTCUT":
      return {
        ...state,
        shortcuts: {
          ...state.shortcuts,
          [randomId()]: action.payload,
        },
      };
    default:
      return state;
  }
}

type SearchProviderProps = {
  state: SearchState;
  dispatch: React.Dispatch<DispatchActions>;
} & PropsWithChildren;

export default function SearchProvider({
  state,
  dispatch,
  children,
}: SearchProviderProps) {
  return (
    <SearchContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}
