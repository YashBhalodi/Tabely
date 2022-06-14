import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

import { useCell, useBoard } from "Hooks";
import { CELL_TYPES } from "Utils/constants";

const Blank = ({ cellId }) => {
  const { updateFields } = useCell({ id: cellId });
  const [shouldShowText, setShouldShowText] = useState(false);
  const { isEditMode } = useBoard();

  const handleClick = () => {
    isEditMode &&
      updateFields({
        type: CELL_TYPES.BASIC,
      });
  };

  const handleMouseEnter = () => {
    isEditMode && setShouldShowText(true);
  };
  const handleMouseLeave = () => {
    isEditMode && setShouldShowText(false);
  };

  const handleKeyboardEvent = (e) => {
    if (e.code === "Enter") {
      handleClick();
    }
  };

  return (
    <td key={cellId}>
      <div
        tabIndex={isEditMode ? 0 : -1}
        className={`bg-transparent hover:border-2 flex flex-col items-center h-full w-full justify-center min-w-[14rem] min-h-[6rem] p-2 transition-all rounded-md hover:shadow-sm ${
          isEditMode
            ? "hover:border-blue-300 hover:bg-slate-50 cursor-pointer"
            : "cursor-not-allowed"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDownCapture={handleKeyboardEvent}
      >
        {shouldShowText && <FiPlusCircle className="text-xl text-blue-300" />}
      </div>
    </td>
  );
};

export default Blank;
