import React from "react";
import { useParams } from "react-router-dom";

import { useBoard, useCell, useTable } from "Hooks";

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

  return <div>Plus</div>;
};

export default TableLayoutActions;
