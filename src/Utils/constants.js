import _ from "lodash";

export const CELL_TYPES = {
  IDLE: "IDLE",
  IDLE2: "IDLE2",
};

export const initialCellState = {
  type: CELL_TYPES.IDLE,
};

export const initialTableState = [
  [_.uniqueId(), _.uniqueId()],
  [_.uniqueId(), _.uniqueId()],
];
