import React from "react";
import { useBoard } from "Hooks";
import { FiEdit3, FiLock } from "react-icons/fi";

const BoardTopHeader = () => {
  const { isEditMode, toggleBoardMode } = useBoard();

  const iconClass = "text-xl text-blue-900";
  const iconButtonClass =
    "hover:border-blue-300 hover:border flex flex-col items-center justify-center w-12 h-12 bg-blue-100 rounded-md";

  return (
    <div className=" bg-blue-50 flex flex-row-reverse justify-start w-full h-20 p-4 border-b-2 border-blue-100">
      <div className={iconButtonClass} onClick={toggleBoardMode}>
        {isEditMode ? (
          <FiLock className={iconClass} />
        ) : (
          <FiEdit3 className={iconClass} />
        )}
      </div>
    </div>
  );
};
export default BoardTopHeader;
