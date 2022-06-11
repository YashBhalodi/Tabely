import { atom, atomFamily, selector } from "recoil";
import { initialCellState, initialTableState } from "Utils/constants";

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
