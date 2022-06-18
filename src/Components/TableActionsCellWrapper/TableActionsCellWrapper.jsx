import React from "react";
import PropTypes from "prop-types";

import { useBoard, useCell, useTable } from "Hooks";
import { CELL_CONFIGS, FEATURES } from "Utils/constants";
import { AddButtonBar, CellActionStrip } from "Components";

import { FiTrash } from "react-icons/fi";

const DeleteButton = (props) => {
  const { onClick } = props;
  return (
    <div
      className="hover:bg-red-100 bg-red-50 flex items-center justify-center p-2 rounded-md cursor-pointer"
      onClick={onClick}
    >
      <FiTrash className="text-sm text-red-400 transition-all" />
    </div>
  );
};

const AddColumnRowActions = (props) => {
  const { onClickAction } = props;

  const commonClass = `group-hover:visible hover:opacity-100 absolute invisible transition-all opacity-50 cursor-pointer z-10`;
  const horizontalCommonClass = `inset-x-0`;
  const verticalCommonClass = `inset-y-0`;

  return (
    <>
      <div
        className={`${commonClass} ${horizontalCommonClass} -top-2 group-hover:-top-3.5`}
      >
        <AddButtonBar
          isHorizontal={true}
          onClick={() => onClickAction("add_top")}
        />
      </div>
      <div
        className={`${commonClass} ${horizontalCommonClass} -bottom-2 group-hover:-bottom-3.5`}
      >
        <AddButtonBar
          isHorizontal={true}
          onClick={() => onClickAction("add_bottom")}
        />
      </div>
      <div
        className={`${commonClass} ${verticalCommonClass} -left-2 group-hover:-left-3.5`}
      >
        <AddButtonBar
          isHorizontal={false}
          onClick={() => onClickAction("add_left")}
        />
      </div>
      <div
        className={`${commonClass} ${verticalCommonClass} -right-2 group-hover:-right-3.5`}
      >
        <AddButtonBar
          isHorizontal={false}
          onClick={() => onClickAction("add_right")}
        />
      </div>
    </>
  );
};

const DeleteColumRowActions = (props) => {
  const { cellEdges, onClickAction } = props;

  const containerCommonClass = `group-hover:visible group-hover:opacity-100 absolute flex invisible transition-all opacity-0`;
  const verticalCommonClass = `inset-x-0 h-16 flex-row justify-center`;
  const horizontalCommonClass = `inset-y-0 w-16 flex-col justify-center`;
  return (
    <>
      {cellEdges.includes("top") && (
        <div
          className={`${containerCommonClass} ${verticalCommonClass} -top-2 group-hover:-top-12 items-start`}
        >
          <DeleteButton onClick={() => onClickAction("delete_column")} />
        </div>
      )}
      {cellEdges.includes("left") && (
        <div
          className={`${containerCommonClass} ${horizontalCommonClass} -left-2 group-hover:-left-12 items-start`}
        >
          <DeleteButton onClick={() => onClickAction("delete_row")} />
        </div>
      )}
      {cellEdges.includes("bottom") && (
        <div
          className={`${containerCommonClass} ${verticalCommonClass} -bottom-2 group-hover:-bottom-12 items-end`}
        >
          <DeleteButton onClick={() => onClickAction("delete_column")} />
        </div>
      )}
      {cellEdges.includes("right") && (
        <div
          className={`${containerCommonClass} ${horizontalCommonClass} -right-2 group-hover:-right-12 items-end`}
        >
          <DeleteButton onClick={() => onClickAction("delete_row")} />
        </div>
      )}
    </>
  );
};

const DragDropWrapper = (props) => {
  const { cellId, children } = props;
  const { swapCells } = useTable();

  const onDragOver = (e) => e.preventDefault();
  const onDragStart = (e) => {
    e.dataTransfer.setData("incomingCellId", cellId);
  };
  const onDrop = (e) => {
    const incomingCellId = e.dataTransfer.getData("incomingCellId");
    swapCells(cellId, incomingCellId);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={"cursor-grab active:cursor-grabbing h-full w-full"}
    >
      {children}
    </div>
  );
};

const TableActionsCellWrapper = (props) => {
  const { children, cellId } = props;
  const { cellData } = useCell({ id: cellId });
  const { addRow, addColumn, deleteRow, deleteColumn, getCellEdgePosition } =
    useTable();
  const { isEditMode } = useBoard();

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
      <DragDropWrapper cellId={cellId}>{children}</DragDropWrapper>
    </div>
  );
};

TableActionsCellWrapper.propTypes = {
  cellId: PropTypes.string.isRequired,
};

export default TableActionsCellWrapper;
