import React from "react";
import { useKey } from "react-use";
import { useParams } from "react-router-dom";
import { useTable, useBoard } from "Hooks";
import {
  handleEnter,
  handleEscape,
  handleArrowKey,
  handleMetaHoldArrowKey,
  isCurrentFocusAnInput,
  handleMetaShiftHoldKey,
  handleMetaHoldKey,
  handleCtrlHoldKey,
  TARGET_CELL_TYPE,
} from "Utils/keyboardInteractionUtils";
import _ from "lodash";
import KeyBoardToolTipButton from "./KeyBoardActionTooltip";
import { COLOR_SHORTCUT_MAP } from "Utils/colors";

const KeyBoardActionHandler = (props) => {
  const { boardId } = useParams();
  const { tableId } = useBoard({ id: boardId });
  const { allRows, getNeighboringCells } = useTable({ id: tableId });

  useKey(
    (e) => {
      const { key, metaKey } = e;
      return (
        _.includes(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], key) &&
        !metaKey
      );
    },
    (e) => {
      handleArrowKey(e, allRows, getNeighboringCells);
    },
    {},
    []
  );

  useKey(
    (e) => {
      const { key, metaKey } = e;
      return (
        _.includes(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], key) &&
        metaKey
      );
    },
    (e) => {
      handleMetaHoldArrowKey(e, allRows, getNeighboringCells);
    },
    {},
    []
  );

  useKey(
    (e) => {
      const { key, metaKey } = e;
      return (
        _.includes(["M", "m", "Delete", ..._.keys(TARGET_CELL_TYPE)], key) &&
        metaKey
      );
    },
    handleMetaHoldKey,
    {},
    []
  );

  useKey(
    (e) => {
      const { key, ctrlKey } = e;
      return _.includes(_.values(COLOR_SHORTCUT_MAP), key) && ctrlKey;
    },
    handleCtrlHoldKey,
    {},
    []
  );

  useKey(
    (e) => {
      const { key, metaKey, shiftKey } = e;
      return _.includes(["r", "c"], key) && metaKey && shiftKey;
    },
    (e) => {
      handleMetaShiftHoldKey(e, allRows, getNeighboringCells);
    },
    {},
    []
  );

  useKey(
    (e) => {
      const { key } = e;
      return _.includes(["Escape"], key);
    },
    handleEscape,
    {},
    []
  );

  useKey(
    (e) => {
      const { key } = e;
      return _.includes(["Enter"], key) && !isCurrentFocusAnInput();
    },
    handleEnter,
    {},
    []
  );

  return <KeyBoardToolTipButton />;
};

export default KeyBoardActionHandler;
