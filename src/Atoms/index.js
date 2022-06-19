import { atom, atomFamily, selector, selectorFamily } from "recoil";
import {
  initialCellState,
  initialTableState,
  initialBoardState,
  initialAppState,
} from "Utils/constants";

import _ from "lodash";

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
  set:
    (params) =>
    ({ set, reset }, newValue) => {
      const { action, newBoardId } = newValue;
      if (action === "initialize_board") {
        // Serious hack here. This should not be needed ideally. Recoil should be able to handle this somehow.
        // When a new member of board family is created it doesn't get latest uniqueId for table,
        // similarly when a new table is created it doesn't get latest uniqueIds for its cells initialState.
        const tableId = _.uniqueId();
        set(boardFamily(newBoardId), (prevState) => {
          return {
            ...prevState,
            tableId,
          };
        });
        const tableInitialState = [
          [_.uniqueId(), _.uniqueId()],
          [_.uniqueId(), _.uniqueId()],
        ];
        set(tableFamily(tableId), tableInitialState);
      }
    },
});

export const appStateAtom = atom({
  key: "appState",
  default: initialAppState,
});
