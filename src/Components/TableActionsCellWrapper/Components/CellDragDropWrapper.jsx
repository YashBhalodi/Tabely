import React from "react";

import { useTable } from "Hooks";

import { FiPlusCircle } from "react-icons/fi";

const DRAG_DATA = {
  INCOMING_CELL_ID: "incomingCellId",
};

const CellEdgeDropZone = React.memo((props) => {
  const { cellId, onDrop, isBottom = false } = props;
  const [show, setShow] = React.useState(false);

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragEnter = (e) => {
    const incomingCellId = e.dataTransfer.getData(DRAG_DATA.INCOMING_CELL_ID);
    const isValid = incomingCellId !== cellId;
    // TODO validity logic, prevent cell being added below itself
    if (isValid) {
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
  const { swapCells, getCellEdgePosition, relocateCell } = useTable();

  const onDragOver = (e) => {
    e.preventDefault();
    return false;
  };
  const onDragStart = (e) => {
    e.dataTransfer.setData(DRAG_DATA.INCOMING_CELL_ID, cellId);
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
