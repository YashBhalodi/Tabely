import { atom, atomFamily, selector, selectorFamily } from "recoil";
import {
  initialCellState,
  initialTableState,
  initialBoardState,
  initialAppState,
} from "Utils/constants";
import { recoilPersist } from "recoil-persist";
import _ from "lodash";

const { persistAtom } = recoilPersist({
  key: "tabley",
});

const logger = ({ onSet, node, trigger, setSelf }) => {
  console.log(`trigger=${trigger} on ${node.key}`, { node });
  onSet((newValue, oldValue, isReset) => {
    console.log(`onSet=> trigger=${trigger} on ${node.key}`, {
      newValue,
      oldValue,
      node,
    });
  });
};

export const cellsFamily = atomFamily({
  key: "cells",
  default: initialCellState,
  effects: [persistAtom, logger],
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
  effects: [persistAtom, logger],
});

export const boardFamily = atomFamily({
  key: "boards",
  default: initialBoardState,
  effects: [persistAtom, logger],
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
  effects: [persistAtom, logger],
});
