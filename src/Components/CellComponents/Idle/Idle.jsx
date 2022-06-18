import React from "react";
import { FiPlusCircle } from "react-icons/fi";

import { useCell, useBoard } from "Hooks";
import { CELL_TYPES } from "Utils/constants";
import { TableActionsCellWrapper } from "Components";

const Idle = ({ cellId }) => {
  const { updateFields } = useCell({ id: cellId });
  const { isEditMode } = useBoard();

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

  return (
    <td key={cellId}>
      <TableActionsCellWrapper cellId={cellId}>
        <div
          tabIndex={isEditMode ? 0 : -1}
          className={`group bg-slate-10 hover:border-2 flex flex-col items-center h-full w-full justify-center min-w-14 min-h-6 p-2 transition-all rounded-md shadow-sm border border-1 border-slate-200 ${
            isEditMode
              ? "hover:border-blue-300 hover:bg-slate-50 cursor-pointer"
              : ""
          }`}
          onClick={handleClick}
          onKeyDownCapture={handleKeyboardEvent}
        >
          {isEditMode && (
            <FiPlusCircle className="group-hover:visible invisible text-xl text-blue-300" />
          )}
        </div>
      </TableActionsCellWrapper>
    </td>
  );
};

const IdleMemo = React.memo(Idle);

export default IdleMemo;
