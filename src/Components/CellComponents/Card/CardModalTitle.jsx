import React from "react";

import { useParams } from "react-router-dom";

import { useCell, useBoard } from "Hooks";

import { COLOR_THEME } from "Utils/colors";

const TitleComponent = (props) => {
  const { cellId } = props;
  const { cellData, updateFields } = useCell({ id: cellId });
  const { boardId } = useParams();
  const { isEditMode } = useBoard({ id: boardId });
  const { title = "", content = "", colorTheme } = cellData;
  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const handleTextChange = (e) => {
    updateFields({ [e.target.name]: e.target.value });
  };

  const commonTitleClass = `${themeItem.darkTextColor} ${themeItem.lightBgColor} text-xl font-medium break-words min-h-[2rem] rounded-md px-2 py-2 mix-blend-multiply`;

  const commonTextAreaClass = `${themeItem.lightBgColor} ${themeItem.scrollbar} rounded-md px-2 py-1 mix-blend-multiply outline-none resize-none border-0 min-h-[4rem]`;

  return !isEditMode ? (
    <div className={`${commonTitleClass}`}>{title}</div>
  ) : (
    <textarea
      type={"text"}
      name="title"
      value={title}
      rows={2}
      onChange={handleTextChange}
      autoFocus={true}
      className={`${commonTitleClass} ${commonTextAreaClass} px-2 py-1`}
      placeholder=". . .  ✍🏻"
    />
  );
};

export default React.memo(TitleComponent);
