import _ from "lodash";

export const FEATURES = {
  CONVERT_TYPE: "CONVERT_TYPE",
  ADD_TABLE_LAYOUT: "ADD_TABLE_LAYOUT",
  DELETE_TABLE_LAYOUT: "DELETE_TABLE_LAYOUT",
  CELL_ACTIONS: "CELL_ACTIONS",
};

export const CELL_TYPES = {
  IDLE: "IDLE",
  BLANK: "BLANK",
  BASIC: "BASIC",
};

export const CELL_CONFIGS = {
  IDLE: {
    features: [
      FEATURES.CONVERT_TYPE,
      FEATURES.ADD_TABLE_LAYOUT,
      FEATURES.DELETE_TABLE_LAYOUT,
    ],
  },
  BLANK: {
    features: [FEATURES.CONVERT_TYPE, FEATURES.DELETE_TABLE_LAYOUT],
  },
  BASIC: {
    features: [
      FEATURES.CONVERT_TYPE,
      FEATURES.CELL_ACTIONS,
      FEATURES.ADD_TABLE_LAYOUT,
      FEATURES.DELETE_TABLE_LAYOUT,
    ],
  },
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
