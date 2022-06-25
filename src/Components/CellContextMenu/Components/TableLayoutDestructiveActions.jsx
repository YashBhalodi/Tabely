import React from "react";
import { useParams } from "react-router-dom";
import { useBoard, useTable } from "Hooks";

const TableLayoutDestructiveActions = (props) => {
  const { cellId } = props;
  const { boardId } = useParams();
  const { tableId } = useBoard({ id: boardId });
  const { getCellEdgePosition } = useTable({ id: tableId });
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

  return <div>Delete</div>;
};

export default TableLayoutDestructiveActions;
