import React, { useEffect } from "react";
import { useKey } from "react-use";
import { useParams } from "react-router-dom";
import { useTable, useBoard } from "Hooks";
import { CellWrapper } from "Components";
import _ from "lodash";

const BoardTable = (props) => {
  const { boardId } = useParams();
  const { tableId } = useBoard({ id: boardId });
  const { allRows, getNeighboringCells } = useTable({ id: tableId });

  const getCurrentFocusedCellId = () => {
    return document.querySelector(":focus")?.closest("td")?.id;
  };

  const focusCellId = (cellId) => {
    if (!cellId) return;

    const elem = document.getElementById(cellId);
    const targetElem = elem?.querySelector('[tabIndex="0"]');
    targetElem?.focus();
    targetElem?.scrollIntoView({ behavior: "smooth" });
  };

  const handleArrowKey = (e) => {
    const { key } = e;
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

  useKey(
    (e) => {
      const { key } = e;
      return _.includes(
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
        key
      );
    },
    handleArrowKey,
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
