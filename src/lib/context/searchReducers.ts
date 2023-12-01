import { Shortcut } from "@/types";
import { randomId, removeLocalState, saveLocalState } from "../utils";
import { SearchState, initialSearchState } from "./searchContext";
import { LOCAL_STATE_NAME } from "../constants";

export type SearchActions =
  | { type: "SET_SELECTED_SHORTCUT"; payload: string }
  | { type: "UPDATE_QUERY"; payload: string }
  | { type: "ADD_SHORTCUT"; payload: Shortcut }
  | { type: "SET_INITIAL_STATE"; payload: SearchState }
  | { type: "RESET" };

export function searchReducer(
  state: SearchState,
  action: SearchActions
): SearchState {
  switch (action.type) {
    case "SET_SELECTED_SHORTCUT":
      state = setSelectedShortcut(state, action.payload);
      break;
    case "UPDATE_QUERY":
      state = updateQuery(state, action.payload);
      break;
    case "ADD_SHORTCUT":
      state = addShortcut(state, action.payload as Shortcut);
      break;
    case "SET_INITIAL_STATE":
      return action.payload;
    case "RESET":
      removeLocalState(LOCAL_STATE_NAME);
      return initialSearchState;
    default:
      return state;
  }

  // Save state to localStorage
  saveLocalState(LOCAL_STATE_NAME, state);

  return state;
}

function setSelectedShortcut(state: SearchState, payload: string): SearchState {
  return {
    ...state,
    selectedShortcut: payload,
    url: state.shortcuts[payload].url,
  };
}

function updateQuery(state: SearchState, payload: string): SearchState {
  return {
    ...state,
    query: payload,
  };
}

function addShortcut(state: SearchState, payload: Shortcut): SearchState {
  return {
    ...state,
    shortcuts: {
      ...state.shortcuts,
      [randomId()]: payload,
    },
  };
}
