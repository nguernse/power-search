import { PropsWithChildren } from "@/types";
import {
  SearchContext,
  SearchDispatchContext,
  SearchState,
  initialSearchState,
} from "./searchContext";
import { searchReducer } from "./searchReducers";
import { useEffect, useReducer } from "react";
import { getLocalState } from "../utils";
import { LOCAL_STATE_NAME } from "../constants";

type SearchProviderProps = {
  initialState?: SearchState;
} & PropsWithChildren;

export default function SearchProvider({
  children,
  initialState,
}: SearchProviderProps) {
  const [state, dispatch] = useReducer(
    searchReducer,
    initialState || initialSearchState
  );

  useEffect(() => {
    const initState = getLocalState(LOCAL_STATE_NAME);

    if (initState) {
      dispatch({ type: "SET_INITIAL_STATE", payload: initState });
    }
  }, []);

  return (
    <SearchContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}
