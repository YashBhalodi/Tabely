import React from "react";
import { useParams } from "react-router-dom";

import { useTable, useBoard } from "Hooks";

import { FiPlusCircle } from "react-icons/fi";

const DRAG_DATA = {
  INCOMING_CELL_ID: "incomingCellId",
};

const CellEdgeDropZone = React.memo((props) => {
  const { cellId, onDrop, isBottom = false } = props;
  const [show, setShow] = React.useState(false);

  const isValidDropZone = (e) => {
    // hack to get the incoming cellId
    // refer for necessity of hack: https://stackoverflow.com/a/40940963
    const incomingCellId = e.dataTransfer.types[1];
    const bottomNeighboringCellId = e.dataTransfer.types[2];

    const isInValid =
      incomingCellId === cellId || bottomNeighboringCellId === cellId;
    return !isInValid;
  };

  const onDragOver = (e) => {
    if (isValidDropZone(e)) {
      e.preventDefault();
    }
  };

  const onDragEnter = (e) => {
    if (isValidDropZone(e)) {
      e.preventDefault();
      setShow(true);
    }
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setShow(false);
    onDrop(e);
  };

  const positionClass = isBottom ? "-bottom-6" : "-top-6";

  return (
    <div
      className={`absolute ${positionClass} inset-x-0 h-8 bg-blue-100 px-2 rounded-md flex flex-row justify-center items-center ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onDrop={handleDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <div className="flex flex-1 h-0.5 bg-blue-800 rounded-md"></div>
      <FiPlusCircle className="mx-1 text-sm text-blue-800" />
      <div className="flex flex-1 h-0.5 bg-blue-800 rounded-sm"></div>
    </div>
  );
});

const DragDropWrapper = (props) => {
  const { cellId, children } = props;
  const { boardId } = useParams();
  const { tableId } = useBoard({ id: boardId });
  const { swapCells, getCellEdgePosition, relocateCell, getNeighboringCells } =
    useTable({ id: tableId });
  const bottomNeighboringCellId = getNeighboringCells(cellId).bottom;
  const onDragOver = (e) => {
    e.preventDefault();
    return false;
  };

  const onDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData(DRAG_DATA.INCOMING_CELL_ID, cellId);
    e.dataTransfer.setData(cellId, cellId); // dragging cell
    e.dataTransfer.setData(bottomNeighboringCellId, bottomNeighboringCellId); // bottom neighboring cell of the dragging cell
  };

  const handleDropAction = ({ e, action }) => {
    const incomingCellId = e.dataTransfer.getData(DRAG_DATA.INCOMING_CELL_ID);
    if (incomingCellId !== cellId) {
      if (action === "swap") {
        swapCells(cellId, incomingCellId);
        return;
      }
      if (action === "add_above") {
        relocateCell({
          cellId: incomingCellId,
          targetCellId: cellId,
          direction: "above",
        });
        return;
      }
      if (action === "add_below") {
        relocateCell({
          cellId: incomingCellId,
          targetCellId: cellId,
          direction: "below",
        });
        return;
      }
    }
  };

  const showBottomDropZone =
    getCellEdgePosition(cellId).edges.includes("bottom");

  return (
    <>
      <CellEdgeDropZone
        cellId={cellId}
        onDrop={(e) => handleDropAction({ e, action: "add_above" })}
      />
      {showBottomDropZone && (
        <CellEdgeDropZone
          cellId={cellId}
          isBottom={true}
          onDrop={(e) => handleDropAction({ e, action: "add_below" })}
        />
      )}
      <div
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={(e) => handleDropAction({ e, action: "swap" })}
        className={"cursor-grab active:cursor-grabbing h-full w-full"}
      >
        {children}
      </div>
    </>
  );
};

export default DragDropWrapper;
