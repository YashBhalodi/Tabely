import React from "react";
import { useParams } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

import { useCell, useBoard } from "Hooks";
import { CELL_TYPES } from "Utils/constants";
import { TableActionsCellWrapper } from "Components";

const Blank = ({ cellId }) => {
  const { updateFields } = useCell({ id: cellId });
  const { boardId } = useParams();
  const { isEditMode } = useBoard({ id: boardId });

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
          className={`group bg-transparent hover:border-2 flex flex-col items-center h-full w-full justify-center min-w-14 min-h-6 p-2 transition-all rounded-md hover:shadow-sm ${
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

const BlankMemo = React.memo(Blank);
export default BlankMemo;
