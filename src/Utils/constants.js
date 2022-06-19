import _ from "lodash";

export const FEATURES = {
  CONVERT_TYPE: "CONVERT_TYPE",
  ADD_TABLE_LAYOUT: "ADD_TABLE_LAYOUT",
  DELETE_TABLE_LAYOUT: "DELETE_TABLE_LAYOUT",
  CELL_ACTIONS: "CELL_ACTIONS",
  DRAG_N_DROP: "DRAG_N_DROP",
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
      FEATURES.DRAG_N_DROP,
    ],
  },
  BLANK: {
    features: [
      FEATURES.CONVERT_TYPE,
      FEATURES.DELETE_TABLE_LAYOUT,
      FEATURES.DRAG_N_DROP,
    ],
  },
  BASIC: {
    features: [
      FEATURES.CONVERT_TYPE,
      FEATURES.CELL_ACTIONS,
      FEATURES.ADD_TABLE_LAYOUT,
      FEATURES.DELETE_TABLE_LAYOUT,
      FEATURES.DRAG_N_DROP,
    ],
  },
};

export const BOARD_MODE = {
  VIEW: "VIEW",
  EDIT: "EDIT",
};

export const initialCellState = () => {
  return {
    type: CELL_TYPES.IDLE,
    title: "",
    colorTheme: "STONE",
  };
};

export const initialTableState = () => {
  return [
    [_.uniqueId(), _.uniqueId()],
    [_.uniqueId(), _.uniqueId()],
  ];
};

export const initialBoardState = () => {
  return {
    title: "",
    mode: BOARD_MODE.EDIT,
    tableId: _.uniqueId(),
  };
};

export const initialAppState = {
  boardIds: [],
};
