import React, { useState } from "react";

import { ThemePicker } from "Components";

import { useCell, useBoard } from "Hooks";
import { FiTrash } from "react-icons/fi";

import { COLOR_THEME } from "Utils/colors";

const Basic = ({ cellId }) => {
  const { cellData, updateFields, clearCell } = useCell({ id: cellId });
  const { isEditMode } = useBoard();
  const [isHover, setIsHover] = useState(false);
  const { title = "", colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const handleTextChange = (e) => {
    updateFields({
      title: e.target.value,
    });
  };

  const setTheme = (theme) => {
    updateFields({
      colorTheme: theme,
    });
  };

  const setMouseEnter = () => setIsHover(true);
  const setMouseLeave = () => setIsHover(false);

  return (
    <td>
      <div
        className={`hover:shadow-xl relative flex flex-col items-start justify-center w-56 h-24 px-4 py-4 rounded-md font-medium ${themeItem.class}`}
        onMouseEnter={setMouseEnter}
        onMouseLeave={setMouseLeave}
      >
        {isEditMode ? (
          <textarea
            type={"text"}
            name="title"
            value={title}
            onChange={handleTextChange}
            rows={2}
            className={`scrollbar outline-none resize-none bg-transparent hover:bg-transparent`}
            autoFocus
          />
        ) : (
          <div className="scrollbar-hide w-full h-full overflow-auto whitespace-pre-line select-all">
            {title}
          </div>
        )}
        {isEditMode && isHover && (
          <FiTrash
            className="top-2 right-2 hover:text-red-300 absolute text-xl text-red-400 transition-all rounded-md"
            onClick={clearCell}
          />
        )}
        {isEditMode && isHover && (
          <div className="bottom-1 right-1 absolute">
            <ThemePicker onSelectTheme={setTheme} activeTheme={colorTheme} />
          </div>
        )}
      </div>
    </td>
  );
};
export default Basic;
