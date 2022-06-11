import _ from "lodash";

export const CELL_TYPES = {
  IDLE: "IDLE",
  BASIC: "BASIC",
};

export const initialCellState = {
  type: CELL_TYPES.IDLE,
  title: "",
};

export const initialTableState = [
  [_.uniqueId(), _.uniqueId()],
  [_.uniqueId(), _.uniqueId()],
];
