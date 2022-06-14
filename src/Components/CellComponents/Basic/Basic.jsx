import React, { useState } from "react";

import { ThemePicker } from "Components";

import { useCell, useBoard } from "Hooks";
import { FiTrash } from "react-icons/fi";

import { COLOR_THEME } from "Utils/colors";
import { CellActionStrip } from "Components";

const Basic = ({ cellId }) => {
  const { cellData, updateFields } = useCell({ id: cellId });
  const { isEditMode } = useBoard();
  const [isHover, setIsHover] = useState(false);
  const { title = "", colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const handleTextChange = (e) => {
    updateFields({
      title: e.target.value,
    });
  };

  const setMouseEnter = () => setIsHover(true);
  const setMouseLeave = () => setIsHover(false);

  return (
    <td>
      <div
        onMouseEnter={setMouseEnter}
        onMouseLeave={setMouseLeave}
        className={"relative"}
      >
        <div
          className={`hover:shadow-xl relative flex flex-col items-start justify-center w-56 h-24 px-4 py-4 rounded-md font-medium text-lg ${themeItem.class}`}
        >
          {isEditMode ? (
            <textarea
              type={"text"}
              name="title"
              value={title}
              onChange={handleTextChange}
              rows={2}
              className={`scrollbar outline-none resize-none bg-transparent h-full w-full hover:bg-transparent`}
              autoFocus
            />
          ) : (
            <div className="scrollbar-hide w-full h-full overflow-auto whitespace-pre-line select-all">
              {title}
            </div>
          )}
        </div>
        <CellActionStrip isVisible={isEditMode && isHover} cellId={cellId} />
      </div>
    </td>
  );
};
export default Basic;
