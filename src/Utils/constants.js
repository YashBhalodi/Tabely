import { getUniqId } from "Utils/helpers";

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
  DUAL_FIELD: "DUAL_FIELD",
};

export const CELL_CONFIGS = {
  IDLE: {
    features: [
      FEATURES.ADD_TABLE_LAYOUT,
      FEATURES.DELETE_TABLE_LAYOUT,
      FEATURES.DRAG_N_DROP,
    ],
  },
  BLANK: {
    features: [FEATURES.DELETE_TABLE_LAYOUT, FEATURES.DRAG_N_DROP],
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
  DUAL_FIELD: {
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
    colorTheme: "STONE",
    title: "",
    subtitle: "",
  };
};

export const initialTableState = () => {
  return [
    [getUniqId(), getUniqId()],
    [getUniqId(), getUniqId()],
  ];
};

export const initialBoardState = () => {
  return {
    title: "",
    mode: BOARD_MODE.EDIT,
    tableId: getUniqId(),
  };
};

export const initialAppState = {
  boardIds: [],
};
