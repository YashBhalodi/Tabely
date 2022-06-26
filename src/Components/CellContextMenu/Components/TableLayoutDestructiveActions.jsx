import React from "react";
import { useParams } from "react-router-dom";
import { useBoard, useTable } from "Hooks";

import { DeleteColumn, DeleteRow } from "Components/SvgComponents";

const TableLayoutDestructiveActions = (props) => {
  const { cellId } = props;
  const { boardId } = useParams();
  const { tableId } = useBoard({ id: boardId });
  const { getCellEdgePosition, deleteRow, deleteColumn } = useTable({
    id: tableId,
  });
  const { row, column } = getCellEdgePosition(cellId);

  const handleClick = (action) => {
    switch (action) {
      case "delete_row":
        deleteRow({ row });
        break;
      case "delete_column":
        deleteColumn({ column });
        break;
      default:
        console.log("Invalid action", action);
        break;
    }
  };

  const buttonCommonClass = `hover:bg-slate-100 h-fit w-fit p-1 transition-colors border rounded-md cursor-pointer`;

  return (
    <div className="flex flex-col gap-2">
      <abbr title="Delete column">
        <div
          onClick={() => handleClick("delete_column")}
          className={buttonCommonClass}
        >
          <DeleteColumn />
        </div>
      </abbr>
      <abbr title="Delete row">
        <div
          onClick={() => handleClick("delete_row")}
          className={buttonCommonClass}
        >
          <DeleteRow pathClass="fill-red-700" />
        </div>
      </abbr>
    </div>
  );
};

export default TableLayoutDestructiveActions;
