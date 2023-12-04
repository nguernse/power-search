import { Shortcut, ShortcutWithoutId } from "@/types";
import { randomId, removeLocalState, saveLocalState } from "../utils";
import { SearchState, initialSearchState } from "./searchContext";
import { DEFAULT_SHORTCUTS, LOCAL_STATE_NAME } from "../constants";

export type SearchActions =
  | { type: "SET_SELECTED_SHORTCUT"; payload: Shortcut }
  | {
      type: "ADD_SHORTCUT";
      payload: { shortcut: ShortcutWithoutId; isDefault: boolean };
    }
  | {
      type: "EDIT_SHORTCUT";
      payload: { shortcut: Shortcut; isDefault: boolean };
    }
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
  };
}

function addShortcut(
  state: SearchState,
  payload: {
    shortcut: ShortcutWithoutId;
    isDefault: boolean;
  }
): SearchState {
  let { selectedShortcut } = state;
  const newItem = {
    ...payload.shortcut,
    id: `${payload.shortcut.name}-${randomId()}`,
  };

  if (selectedShortcut === undefined || payload.isDefault) {
    selectedShortcut = newItem;
  }

  return {
    ...state,
    selectedShortcut,
    shortcuts: [...state.shortcuts, newItem],
  };
}

function editShortcut(
  state: SearchState,
  payload: { shortcut: Shortcut; isDefault: boolean }
): SearchState {
  let { selectedShortcut } = state;

  // if editing selected shortcut, update selectedShortcut
  if (payload.shortcut.id === selectedShortcut.id || payload.isDefault) {
    selectedShortcut = payload.shortcut;
  }

  return {
    ...state,
    selectedShortcut,
    shortcuts: state.shortcuts.map((item) => {
      if (item.id === payload.shortcut.id) {
        return payload.shortcut;
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
    shortcuts: state.shortcuts.filter((item) => item.id !== payload),
  };
}

function populateWithDefaults(state: SearchState): SearchState {
  const shortcuts = DEFAULT_SHORTCUTS;
  const selectedShortcut = shortcuts[0];

  return {
    ...state,
    shortcuts,
    selectedShortcut,
  };
}
