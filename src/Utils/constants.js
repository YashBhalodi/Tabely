import { getUniqId } from "Utils/helpers";

export const FEATURES = {
  CONVERT_TYPE: "CONVERT_TYPE",
  ADD_TABLE_LAYOUT: "ADD_TABLE_LAYOUT",
  DELETE_TABLE_LAYOUT: "DELETE_TABLE_LAYOUT",
  CELL_ACTIONS: "CELL_ACTIONS",
  DRAG_N_DROP: "DRAG_N_DROP",
  CHANGE_THEME: "CHANGE_THEME",
  CONTEXT_MENU: "CONTEXT_MENU",
  CLEAR_CELL: "CLEAR_CELL",
};

export const CELL_TYPES = {
  IDLE: "IDLE",
  BLANK: "BLANK",
  BASIC: "BASIC",
  DUAL_FIELD: "DUAL_FIELD",
  CARD: "CARD",
};

export const USER_CELL_TYPES = [
  { key: CELL_TYPES.BASIC, label: "Basic" },
  { key: CELL_TYPES.DUAL_FIELD, label: "Dual Field" },
  { key: CELL_TYPES.CARD, label: "Card" },
];

export const BOARD_MODE = {
  VIEW: "VIEW",
  EDIT: "EDIT",
};

export const CELL_CONFIGS_VIEW = {
  IDLE: {
    features: [FEATURES.CONTEXT_MENU],
    contextMenuFeatures: [
      FEATURES.ADD_TABLE_LAYOUT,
      FEATURES.DELETE_TABLE_LAYOUT,
    ],
  },
  BLANK: {
    features: [],
    contextMenuFeatures: [],
  },
  BASIC: {
    features: [FEATURES.CONTEXT_MENU],
    contextMenuFeatures: [
      FEATURES.ADD_TABLE_LAYOUT,
      FEATURES.DELETE_TABLE_LAYOUT,
    ],
  },
  DUAL_FIELD: {
    features: [FEATURES.CONTEXT_MENU],
    contextMenuFeatures: [
      FEATURES.ADD_TABLE_LAYOUT,
      FEATURES.DELETE_TABLE_LAYOUT,
    ],
  },
  CARD: {
    features: [FEATURES.CONTEXT_MENU],
    contextMenuFeatures: [
      FEATURES.ADD_TABLE_LAYOUT,
      FEATURES.DELETE_TABLE_LAYOUT,
    ],
  },
};

export const CELL_CONFIGS_EDIT = {
  IDLE: {
    features: [FEATURES.CONTEXT_MENU, FEATURES.DRAG_N_DROP],
    contextMenuFeatures: [
      FEATURES.ADD_TABLE_LAYOUT,
      FEATURES.DELETE_TABLE_LAYOUT,
      FEATURES.CLEAR_CELL,
    ],
  },
  BLANK: {
    features: [FEATURES.DRAG_N_DROP],
    contextMenuFeatures: [],
  },
  BASIC: {
    features: [FEATURES.CONTEXT_MENU, FEATURES.DRAG_N_DROP],
    contextMenuFeatures: [
      FEATURES.ADD_TABLE_LAYOUT,
      FEATURES.DELETE_TABLE_LAYOUT,
      FEATURES.CONVERT_TYPE,
      FEATURES.CHANGE_THEME,
      FEATURES.CLEAR_CELL,
    ],
  },
  DUAL_FIELD: {
    features: [FEATURES.CONTEXT_MENU, FEATURES.DRAG_N_DROP],
    contextMenuFeatures: [
      FEATURES.ADD_TABLE_LAYOUT,
      FEATURES.DELETE_TABLE_LAYOUT,
      FEATURES.CONVERT_TYPE,
      FEATURES.CHANGE_THEME,
      FEATURES.CLEAR_CELL,
    ],
  },
  CARD: {
    features: [FEATURES.CONTEXT_MENU, FEATURES.DRAG_N_DROP],
    contextMenuFeatures: [
      FEATURES.ADD_TABLE_LAYOUT,
      FEATURES.DELETE_TABLE_LAYOUT,
      FEATURES.CONVERT_TYPE,
      FEATURES.CHANGE_THEME,
      FEATURES.CLEAR_CELL,
    ],
  },
};

export const CELL_CONFIGS = {
  [BOARD_MODE.VIEW]: CELL_CONFIGS_VIEW,
  [BOARD_MODE.EDIT]: CELL_CONFIGS_EDIT,
};

export const initialCellState = () => {
  return {
    type: CELL_TYPES.IDLE,
    colorTheme: "STONE",
    title: "",
    subtitle: "",
    content: "",
    date: null,
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
