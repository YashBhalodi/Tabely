import { atom, atomFamily } from "recoil";
import { initialCellState, initialTableState } from "@/Utils/constants";

export const tableAtom = atom({
  key: "tableData",
  default: initialTableState,
});

export const cellsFamily = atomFamily({
  key: "cells",
  default: initialCellState,
});
