import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

import { useCell, useBoard } from "Hooks";
import { CELL_TYPES } from "Utils/constants";
import { TableActionsCellWrapper, CellContextMenu } from "Components";

const Idle = ({ cellId }) => {
  const { boardId } = useParams();
  const { updateFields } = useCell({ id: cellId });
  const { isEditMode } = useBoard({ id: boardId });
  const contextMenuRef = useRef(null);
  const containerRef = useRef(null);

  const handleClick = () => {
    isEditMode &&
      updateFields({
        type: CELL_TYPES.BASIC,
      });
  };

  const handleKeyboardEvent = (e) => {
    if (e.code === "Enter") {
      handleClick();
    }
  };

  const handleContextClick = (event) => {
    contextMenuRef?.current?.launchContextMenu(event);
  };

  return (
    <td key={cellId}>
      <TableActionsCellWrapper cellId={cellId}>
        <div
          tabIndex={isEditMode ? 0 : -1}
          className={`group bg-slate-10 hover:border-2 flex flex-col items-center h-full w-full justify-center min-w-cell min-h-cell p-2 transition-all rounded-md shadow-sm border border-1 border-slate-200 ${
            isEditMode
              ? "hover:border-blue-300 hover:bg-slate-50 cursor-pointer"
              : ""
          }`}
          onClick={handleClick}
          onKeyDownCapture={handleKeyboardEvent}
          onContextMenu={handleContextClick}
          ref={containerRef}
        >
          {isEditMode && (
            <FiPlusCircle className="group-hover:visible invisible text-xl text-blue-300" />
          )}
        </div>
        <CellContextMenu
          ref={contextMenuRef}
          cellId={cellId}
          containerRef={containerRef}
        />
      </TableActionsCellWrapper>
    </td>
  );
};

const IdleMemo = React.memo(Idle);

export default IdleMemo;
