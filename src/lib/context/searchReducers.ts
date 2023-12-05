import {
  SearchItem,
  SearchSettings,
  Shortcut,
  ShortcutWithoutId,
} from "@/types";
import { randomId, removeLocalState, saveLocalState } from "../utils";
import { SearchState, initialSearchState } from "./searchContext";
import { DEFAULT_SHORTCUTS, LOCAL_STATE_NAME } from "../constants";

export type SearchActions =
  | { type: "SELECT_SHORTCUT"; payload: Shortcut["id"] }
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
  | {
      type: "UPDATE_AUTO_SAVE_SETTING";
      payload: SearchSettings["autoSaveHistory"];
    }
  | { type: "SAVE_SEARCH_HISTORY"; payload: SearchItem }
  | { type: "CLEAR_SEARCH_HISTORY" }
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
    case "UPDATE_AUTO_SAVE_SETTING":
      state = updateAutoSaveHistory(state, action.payload);
      break;
    case "SAVE_SEARCH_HISTORY":
      state = saveSearchHistory(state, action.payload);
      break;
    case "CLEAR_SEARCH_HISTORY":
      state = clearSearchHistory(state);
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
  payload: Shortcut["id"]
): SearchState {
  return {
    ...state,
    shortcuts: state.shortcuts.map((item) => ({
      ...item,
      isSelected: item.id === payload,
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

function updateAutoSaveHistory(
  state: SearchState,
  payload: SearchSettings["autoSaveHistory"]
): SearchState {
  const history = payload ? state.history : [];

  return {
    ...state,
    history,
    settings: {
      ...state.settings,
      autoSaveHistory: payload,
    },
  };
}

function saveSearchHistory(
  state: SearchState,
  payload: SearchItem
): SearchState {
  return {
    ...state,
    history: [...state.history, payload],
  };
}

function clearSearchHistory(state: SearchState): SearchState {
  return {
    ...state,
    history: [],
  };
}
