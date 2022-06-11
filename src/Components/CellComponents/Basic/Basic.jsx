import React, { useState } from "react";

import { useCell, useBoard } from "Hooks";
import { FiTrash } from "react-icons/fi";

const Basic = ({ cellId }) => {
  const { cellData, updateFields, clearCell } = useCell({ id: cellId });
  const { isEditMode } = useBoard();
  const [showResetButton, setShowResetButton] = useState(false);
  const { title = "" } = cellData;

  const handleTextChange = (e) => {
    updateFields({
      title: e.target.value,
    });
  };

  const setMouseEnter = () => setShowResetButton(true);
  const setMouseLeave = () => setShowResetButton(false);

  return (
    <td>
      <div
        className="group hover:bg-blue-800 hover:shadow-xl relative flex flex-col items-start justify-center w-56 h-24 px-4 py-4 text-gray-100 transition-all bg-blue-900 rounded-md"
        onMouseEnter={setMouseEnter}
        onMouseLeave={setMouseLeave}
      >
        {isEditMode ? (
          <textarea
            type={"text"}
            name="title"
            value={title}
            onChange={handleTextChange}
            rows={3}
            className="group-hover:bg-blue-800 scrollbar text-gray-100 transition-all bg-blue-900 outline-none resize-none"
          />
        ) : (
          <div className="scrollbar overflow-auto whitespace-pre-line select-all">
            {title}
          </div>
        )}
        {isEditMode && showResetButton && (
          <FiTrash
            className="top-2 right-2 hover:text-red-300 absolute text-xl text-red-100 transition-all rounded-md"
            onClick={clearCell}
          />
        )}
      </div>
    </td>
  );
};

export default Basic;
