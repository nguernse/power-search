import { Shortcut, ShortcutWithoutId } from "@/types";
import { randomId, removeLocalState, saveLocalState } from "../utils";
import { SearchState, initialSearchState } from "./searchContext";
import { DEFAULT_SHORTCUTS, LOCAL_STATE_NAME } from "../constants";

export type SearchActions =
  | { type: "SELECT_SHORTCUT"; payload: Shortcut }
  | {
      type: "ADD_SHORTCUT";
      payload: ShortcutWithoutId;
    }
  | {
      type: "EDIT_SHORTCUT";
      payload: Shortcut;
    }
  | { type: "SET_INITIAL_STATE"; payload: SearchState }
  | { type: "DELETE_SHORTCUT"; payload: Shortcut }
  | { type: "POPULATE_WITH_DEFAULTS" }
  | { type: "RESET" };

export function searchReducer(
  state: SearchState,
  action: SearchActions
): SearchState {
  switch (action.type) {
    case "SELECT_SHORTCUT":
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
    shortcuts: state.shortcuts.map((item) => ({
      ...item,
      isSelected: item.id === payload.id,
    })),
  };
}

function addShortcut(
  state: SearchState,
  payload: ShortcutWithoutId
): SearchState {
  const newItem = {
    ...payload,
    id: `${payload.name}-${randomId()}`,
  };

  const newItems = [...state.shortcuts, newItem].map((item) => ({
    ...item,
    isSelected: item.id === newItem.id,
  }));

  return {
    ...state,
    shortcuts: newItems,
  };
}

function editShortcut(state: SearchState, payload: Shortcut): SearchState {
  return {
    ...state,
    shortcuts: state.shortcuts.map((item) => {
      if (item.id === payload.id) {
        return payload;
      }

      return item;
    }),
  };
}

function deleteShortcut(state: SearchState, payload: Shortcut): SearchState {
  const newShortcuts = state.shortcuts.filter((item) => item.id !== payload.id);

  // if deleting selected shortcut, set selectedShortcut to another one
  if (payload.isSelected && newShortcuts.length > 0) {
    newShortcuts[0].isSelected = true;
  }

  return {
    ...state,
    shortcuts: newShortcuts,
  };
}

function populateWithDefaults(state: SearchState): SearchState {
  const shortcuts = DEFAULT_SHORTCUTS;

  return {
    ...state,
    shortcuts,
  };
}
