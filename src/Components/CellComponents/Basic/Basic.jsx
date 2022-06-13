import React, { useState } from "react";

import { useCell, useBoard } from "Hooks";
import { FiTrash } from "react-icons/fi";

import { COLOR_THEME } from "Utils/colors";

const Basic = ({ cellId }) => {
  const { cellData, updateFields, clearCell } = useCell({ id: cellId });
  const { isEditMode } = useBoard();
  const [showResetButton, setShowResetButton] = useState(false);
  const { title = "", colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

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
        className={`group hover:shadow-xl relative flex flex-col items-start justify-center w-56 h-24 px-4 py-4 rounded-md ${themeItem.class}`}
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
            className={`scrollbar outline-none resize-none ${themeItem.class}`}
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
