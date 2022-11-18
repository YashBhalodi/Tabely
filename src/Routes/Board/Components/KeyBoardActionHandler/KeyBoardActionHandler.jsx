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
} from "Utils/keyboardInteractionUtils";
import _ from "lodash";

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

  return null;
};

export default KeyBoardActionHandler;
