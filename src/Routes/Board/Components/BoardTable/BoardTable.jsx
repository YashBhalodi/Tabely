import React, { useEffect } from "react";
import { useKey } from "react-use";
import { useParams, useSearchParams } from "react-router-dom";
import { useTable, useBoard } from "Hooks";
import { CellWrapper } from "Components";
import {
  handleEnter,
  handleEscape,
  handleArrowKey,
  handleMetaHoldArrowKey,
  focusCellId,
} from "./keyboardInteractionUtils";
import _ from "lodash";

const BoardTable = (props) => {
  const { boardId } = useParams();
  const { tableId } = useBoard({ id: boardId });
  const { allRows, getNeighboringCells } = useTable({ id: tableId });

  const [searchParams, setSearchParams] = useSearchParams();
  const targetCellId = searchParams.get("cell");

  useEffect(() => {
    if (targetCellId) {
      focusCellId(targetCellId);
      searchParams.delete("cell");
      setSearchParams(searchParams);
    }
  }, [targetCellId]);

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
      return _.includes(["Enter"], key);
    },
    handleEnter,
    {},
    []
  );

  return (
    <table className="h-fit w-fit border-spacing-3 p-12 border-separate table-auto">
      <tbody>
        {_.map(allRows, (row, index) => {
          // TODO better way to assign key to each row
          const rowId = row.join("");

          return (
            <tr key={rowId}>
              {_.map(row, (cellId) => {
                return <CellWrapper cellId={cellId} key={cellId} />;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BoardTable;
