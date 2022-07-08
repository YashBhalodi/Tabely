import { atom, atomFamily, selector, selectorFamily } from "recoil";
import {
  initialCellState,
  initialTableState,
  initialBoardState,
  initialAppState,
  initialTagState,
} from "Utils/constants";
import { recoilPersist, syncCellTags } from "Atoms/customAtomEffects";
import _ from "lodash";

const { persistAtom } = recoilPersist({
  key: "tabley",
});

export const cellsFamily = atomFamily({
  key: "cells",
  default: initialCellState,
  effects: [persistAtom],
});

export const cellsSelector = selector({
  key: "cellsSelector",
  get: ({ get }) => {
    return null;
  },
  set: ({ reset }, newValue) => {
    const { action = "reset", targetCells = [] } = newValue;
    if (action === "reset") {
      targetCells.forEach((cell) => {
        reset(cellsFamily(cell));
      });
    }
  },
});

export const tableFamily = atomFamily({
  key: "tables",
  default: initialTableState,
  effects: [persistAtom],
});

export const boardFamily = atomFamily({
  key: "boards",
  default: initialBoardState,
  effects: [persistAtom],
});

export const tagsFamily = atomFamily({
  key: "tags",
  default: initialTagState,
  effects: [persistAtom],
});

export const tagsFamilySelector = selectorFamily({
  key: "tagsFamilySelector",
  get: (params) => {
    return ({ get }) => {
      const { ids = [] } = params;
      return ids.map((tagId) => {
        return {
          id: tagId,
          ...get(tagsFamily(tagId)),
        };
      });
    };
  },
});

export const boardFamilySelector = selectorFamily({
  key: "boardFamilySelector",
  get: (params) => {
    return ({ get }) => {
      const { boardIds = [] } = params;
      return boardIds.map((boardId) => {
        return {
          id: boardId,
          ...get(boardFamily(boardId)),
        };
      });
    };
  },
  set: (params) => {
    return ({ get, reset }, newValue) => {
      const { action = "delete", boardIds = [] } = newValue;
      if (action === "delete") {
        // clear tables for each board
        boardIds.forEach((id) => {
          const { tableId } = get(boardFamily(id));
          const tableData = get(tableFamily(tableId));
          const allCells = _.flatten(tableData);

          allCells.forEach((cellId) => {
            reset(cellsFamily(cellId));
          });
          reset(tableFamily(tableId));
          reset(boardFamily(id));
        });
      }
    };
  },
});

export const appStateAtom = atom({
  key: "appState",
  default: initialAppState,
  effects: [persistAtom],
});
