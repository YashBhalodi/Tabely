import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { useBoard, useCell, useTable } from "Hooks";
import { CELL_CONFIGS, FEATURES } from "Utils/constants";
import { CellActionStrip } from "Components";
import {
  CellDragDropWrapper,
  DeleteColumRowActions,
  AddColumnRowActions,
} from "./Components";

const TableActionsCellWrapper = (props) => {
  const { children, cellId } = props;
  const { boardId } = useParams();
  const { cellData } = useCell({ id: cellId });
  const { tableId, isEditMode } = useBoard({ id: boardId });
  const { addRow, addColumn, deleteRow, deleteColumn, getCellEdgePosition } =
    useTable({ id: tableId });

  const { row, column, edges } = getCellEdgePosition(cellId);
  const { type } = cellData;

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

  const showAddColumnActions =
    isEditMode &&
    CELL_CONFIGS[type].features.includes(FEATURES.ADD_TABLE_LAYOUT);
  const showDeleteColumnActions =
    isEditMode &&
    CELL_CONFIGS[type].features.includes(FEATURES.DELETE_TABLE_LAYOUT);
  const shouldShowCellActionStrip =
    CELL_CONFIGS[type].features.includes(FEATURES.CELL_ACTIONS) && !isEditMode;

  return (
    <div className="group relative w-full h-full">
      {showAddColumnActions && (
        <AddColumnRowActions onClickAction={handleClick} />
      )}
      {showDeleteColumnActions && (
        <DeleteColumRowActions cellEdges={edges} onClickAction={handleClick} />
      )}
      {shouldShowCellActionStrip && <CellActionStrip cellId={cellId} />}
      <CellDragDropWrapper cellId={cellId}>{children}</CellDragDropWrapper>
    </div>
  );
};

TableActionsCellWrapper.propTypes = {
  cellId: PropTypes.string.isRequired,
};

export default TableActionsCellWrapper;
