import React from "react";
import { useParams } from "react-router-dom";

import { useBoard, useCell, useTable } from "Hooks";
import {
  AddColumnLeft,
  AddColumnRight,
  AddRowAbove,
  AddRowBelow,
} from "Components/SvgComponents";

const TableLayoutActions = (props) => {
  const { cellId } = props;
  const { boardId } = useParams();
  const { cellData } = useCell({ id: cellId });
  const { tableId } = useBoard({ id: boardId });
  const { addRow, addColumn } = useTable({ id: tableId });

  const handleClick = (action) => {
    switch (action) {
      case "add_bottom":
        addRow({ cellId: cellId, position: "below" });
        break;
      case "add_top":
        addRow({ cellId: cellId, position: "above" });
        break;
      case "add_left":
        addColumn({ cellId: cellId, position: "left" });
        break;
      case "add_right":
        addColumn({ cellId: cellId, position: "right" });
        break;
      default:
        console.log("Invalid action", action);
        break;
    }
  };

  const buttonCommonClass = `hover:bg-slate-100 h-fit w-fit p-1 transition-colors border rounded-md cursor-pointer`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <abbr title="Add column left">
          <div
            onClick={() => handleClick("add_left")}
            className={buttonCommonClass}
          >
            <AddColumnLeft />
          </div>
        </abbr>
        <abbr title="Add column right">
          <div
            onClick={() => handleClick("add_right")}
            className={buttonCommonClass}
          >
            <AddColumnRight />
          </div>
        </abbr>
      </div>
      <div className="flex flex-row gap-2">
        <abbr title="Add row above">
          <div
            onClick={() => handleClick("add_top")}
            className={buttonCommonClass}
          >
            <AddRowAbove />
          </div>
        </abbr>
        <abbr title="Add row below">
          <div
            onClick={() => handleClick("add_bottom")}
            className={buttonCommonClass}
          >
            <AddRowBelow />
          </div>
        </abbr>
      </div>
    </div>
  );
};

export default TableLayoutActions;
