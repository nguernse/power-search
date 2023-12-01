import { Shortcut, ShortcutWithoutId } from "@/types";
import { randomId, removeLocalState, saveLocalState } from "../utils";
import { SearchState, initialSearchState } from "./searchContext";
import { LOCAL_STATE_NAME } from "../constants";

export type SearchActions =
  | { type: "SET_SELECTED_SHORTCUT"; payload: Shortcut }
  | { type: "ADD_SHORTCUT"; payload: ShortcutWithoutId }
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
    case "ADD_SHORTCUT":
      state = addShortcut(state, action.payload);
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

function setSelectedShortcut(
  state: SearchState,
  payload: Shortcut
): SearchState {
  return {
    ...state,
    selectedShortcut: payload,
    url: payload.url,
  };
}

function addShortcut(
  state: SearchState,
  payload: ShortcutWithoutId
): SearchState {
  return {
    ...state,
    shortcuts: [
      ...state.shortcuts,
      {
        ...payload,
        id: `${payload.name}-${randomId()}`,
      },
    ],
  };
}
