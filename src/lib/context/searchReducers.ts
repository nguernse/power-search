import { Shortcut, ShortcutWithoutId } from "@/types";
import { randomId, removeLocalState, saveLocalState } from "../utils";
import { SearchState, initialSearchState } from "./searchContext";
import { DEFAULT_SHORTCUTS, LOCAL_STATE_NAME } from "../constants";

export type SearchActions =
  | { type: "SET_SELECTED_SHORTCUT"; payload: Shortcut }
  | { type: "ADD_SHORTCUT"; payload: ShortcutWithoutId }
  | { type: "EDIT_SHORTCUT"; payload: Shortcut }
  | { type: "SET_INITIAL_STATE"; payload: SearchState }
  | { type: "DELETE_SHORTCUT"; payload: Shortcut["id"] }
  | { type: "POPULATE_WITH_DEFAULTS" }
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
    case "EDIT_SHORTCUT":
      state = editShortcut(state, action.payload);
      break;
    case "SET_INITIAL_STATE":
      return action.payload;
    case "DELETE_SHORTCUT":
      state = deleteShortcut(state, action.payload);
      break;
    case "POPULATE_WITH_DEFAULTS":
      state = populateWithDefaults(state);
      break;
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
  let { selectedShortcut } = state;
  const newItem = {
    ...payload,
    id: `${payload.name}-${randomId()}`,
  };

  if (selectedShortcut === undefined) {
    selectedShortcut = newItem;
  }

  return {
    ...state,
    selectedShortcut,
    url: selectedShortcut.url,
    shortcuts: [...state.shortcuts, newItem],
  };
}

function editShortcut(state: SearchState, payload: Shortcut): SearchState {
  let { selectedShortcut } = state;

  // if editing selected shortcut, update selectedShortcut
  if (payload.id === selectedShortcut.id) {
    selectedShortcut = payload;
  }

  return {
    ...state,
    selectedShortcut,
    url: selectedShortcut.url,
    shortcuts: state.shortcuts.map((item) => {
      if (item.id === payload.id) {
        return payload;
      }

      return item;
    }),
  };
}

function deleteShortcut(
  state: SearchState,
  payload: Shortcut["id"]
): SearchState {
  let { selectedShortcut, shortcuts } = state;

  // if deleting selected shortcut, set selectedShortcut to another one
  if (payload === selectedShortcut.id) {
    selectedShortcut = shortcuts.find(
      (item) => item.id !== payload
    ) as Shortcut;
  }

  return {
    ...state,
    selectedShortcut,
    url: selectedShortcut?.url,
    shortcuts: state.shortcuts.filter((item) => item.id !== payload),
  };
}

function populateWithDefaults(state: SearchState): SearchState {
  const shortcuts = DEFAULT_SHORTCUTS;
  const selectedShortcut = shortcuts[0];
  const url = selectedShortcut.url;

  return {
    ...state,
    shortcuts,
    selectedShortcut,
    url,
  };
}
