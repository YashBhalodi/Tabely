import { atom, atomFamily, selector, selectorFamily } from "recoil";
import {
  initialCellState,
  initialTableState,
  initialBoardState,
  initialAppState,
} from "Utils/constants";
import { recoilPersist } from "Atoms/customAtomEffects";
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
  effects: [persistAtom],
});
