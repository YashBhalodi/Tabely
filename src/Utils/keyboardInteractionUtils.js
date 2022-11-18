import _ from "lodash";

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
  // cmd + shift + r -> delete row
  // cmd + shift + c -> delete column
  // cmd + delete -> delete cell
};

const handleMetaHoldKey = (e) => {
  // cmd + M --> toggle board mode
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
};
