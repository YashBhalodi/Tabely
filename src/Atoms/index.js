import { atom, atomFamily, selector, selectorFamily } from "recoil";
import {
  initialCellState,
  initialTableState,
  initialBoardState,
  initialAppState,
} from "Utils/constants";

// to be deprecated
export const tableAtom = atom({
  key: "tableData",
  default: initialTableState,
});

export const cellsFamily = atomFamily({
  key: "cells",
  default: initialCellState,
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

// to be deprecated
export const boardAtom = atom({
  key: "board",
  default: initialBoardState,
});

export const tableFamily = atomFamily({
  key: "tables",
  default: initialTableState,
});

export const boardFamily = atomFamily({
  key: "boards",
  default: initialBoardState,
});

export const boardFamilySelector = selectorFamily({
  key: "boardFamilySelector",
  get:
    (params) =>
    ({ get }) => {
      const { boardIds = [] } = params;
      return boardIds.map((boardId) => {
        return {
          id: boardId,
          ...get(boardFamily(boardId)),
        };
      });
    },
});

export const appStateAtom = atom({
  key: "appState",
  default: initialAppState,
});
