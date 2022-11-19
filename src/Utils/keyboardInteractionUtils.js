import _ from "lodash";
import { CELL_TYPES } from "./constants";
import { COLOR_SHORTCUT_MAP } from "./colors";
import { updateCellState } from "Hooks";

const TARGET_CELL_TYPE = {
  1: CELL_TYPES.BASIC,
  2: CELL_TYPES.DUAL_FIELD,
  3: CELL_TYPES.CARD,
};

const getCurrentFocusedCellId = () => {
  return document.querySelector(":focus")?.closest("td")?.id;
};

const focusCellId = (cellId) => {
  if (!cellId) return;

  const elem = document.getElementById(cellId);
  const targetElem = elem?.querySelector('[tabIndex="-1"]');
  targetElem?.focus();
  targetElem?.scrollIntoView({ behavior: "smooth" });
};

const focusCellsInputElement = (cellId) => {
  focusCellId(cellId);
  const focusedCellElement = document.querySelector(":focus")?.closest("td");
  const focusedCellInputElements =
    focusedCellElement.querySelectorAll("input, textarea");
  if (focusedCellInputElements) {
    focusedCellInputElements[0].focus();
  }
};

const isCurrentFocusAnInput = () => {
  const elem = document.querySelector(":focus");
  const isInputField = _.includes(["TEXTAREA", "INPUT"], elem?.tagName);
  return isInputField;
};

const handleArrowKey = (e, allRows, getNeighboringCells) => {
  const { key } = e;
  if (isCurrentFocusAnInput()) {
    return;
  }

  const currentFocusedCellId = getCurrentFocusedCellId();
  if (!currentFocusedCellId) {
    const firstCell = allRows[0][0];
    focusCellId(firstCell);
    return;
  }

  const { top, bottom, right, left } =
    getNeighboringCells(currentFocusedCellId);

  e.preventDefault(); // default behavior is to scroll active container
  switch (key) {
    case "ArrowUp":
      top && focusCellId(top);
      break;
    case "ArrowDown":
      bottom && focusCellId(bottom);
      break;
    case "ArrowLeft":
      left && focusCellId(left);
      break;
    case "ArrowRight":
      right && focusCellId(right);
      break;
    default:
      break;
  }
};

const handleEscape = (e) => {
  const currentFocusedCellId = getCurrentFocusedCellId();

  if (currentFocusedCellId) {
    focusCellId(currentFocusedCellId);
  }
};

const handleEnter = (e) => {
  e.preventDefault();
  const currentFocusedCellId = getCurrentFocusedCellId();
  if (currentFocusedCellId) {
    focusCellsInputElement(currentFocusedCellId);
  }
};

const handleMetaHoldArrowKey = (e) => {
  const { key, metaKey } = e;
  // cmd + ->  ==> add column to right
  // cmd + <-  ==> add column to left
  // cmd + up arrow ==> add row above
  // cmd + down arrow ==> add row below
};

const handleMetaShiftHoldKey = (e) => {
  const { key, metaKey, shiftKey } = e;

  // cmd + shift + r -> delete row --> browser refresh key
  // cmd + shift + c -> delete column
  // cmd + delete -> delete cell
};

const handleMetaHoldKey = (e) => {
  // cmd + M --> toggle board mode ---> window minimize key
  const { key, metaKey } = e;
  if (isCurrentFocusAnInput()) {
    return;
  }

  const currentFocusedCellId = getCurrentFocusedCellId();
  if (!currentFocusedCellId) {
    return;
  }

  // cmd + number 1,2,3,... -> change cell type
  if (_.includes(_.keys(TARGET_CELL_TYPE), key)) {
    e.preventDefault();
    updateCellState({ id: currentFocusedCellId, type: TARGET_CELL_TYPE[key] });
    setTimeout(() => {
      focusCellId(currentFocusedCellId);
    }, 10);
  }
};

const handleCtrlHoldKey = (e) => {
  const { key, ctrlKey } = e;
  if (isCurrentFocusAnInput()) {
    return;
  }

  const currentFocusedCellId = getCurrentFocusedCellId();
  if (!currentFocusedCellId) {
    return;
  }

  if (_.includes(_.values(COLOR_SHORTCUT_MAP), key)) {
    updateCellState({
      id: currentFocusedCellId,
      colorTheme: _.findKey(
        COLOR_SHORTCUT_MAP,
        (shortcutKey) => shortcutKey == key
      ),
    });
  }
};

export {
  focusCellId,
  handleArrowKey,
  handleEscape,
  handleEnter,
  handleMetaHoldArrowKey,
  isCurrentFocusAnInput,
  handleMetaShiftHoldKey,
  handleMetaHoldKey,
  handleCtrlHoldKey,
  TARGET_CELL_TYPE,
};
