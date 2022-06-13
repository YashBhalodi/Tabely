import _ from "lodash";

export const CELL_TYPES = {
  IDLE: "IDLE",
  BASIC: "BASIC",
};

export const BOARD_MODE = {
  VIEW: "VIEW",
  EDIT: "EDIT",
};

export const initialCellState = {
  type: CELL_TYPES.IDLE,
  title: "",
  colorTheme: "STONE",
};

export const initialTableState = [
  [_.uniqueId(), _.uniqueId()],
  [_.uniqueId(), _.uniqueId()],
];

export const initialBoardState = {
  title: "",
  mode: BOARD_MODE.EDIT,
};
