import React, { useState } from "react";

import { useTag } from "Hooks";
import { DropDownMenu, ColorPalette } from "Components";
import { COLOR_THEME } from "Utils/colors";
import { FiX, FiCheck, FiEdit2 } from "react-icons/fi";

const Tag = (props) => {
  const { id, onRemoveClick } = props;
  const { data, updateTag } = useTag({ id });
  const [isEditMode, setIsEditMode] = useState(false);
  const { title, colorTheme } = data;
  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const updateTitle = (e) => {
    updateTag({ title: e.target.value });
  };
  const updateTheme = (theme) => {
    updateTag({ colorTheme: theme });
  };

  const toggleMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleRemove = () => {
    onRemoveClick?.({ id });
  };

  const iconClass = `text-xs ${themeItem.darkTextColor} cursor-pointer`;

  return (
    <div
      className={`group flex flex-row gap-1 items-center text-sm rounded-full w-max py-1 px-2 border shadow-sm mix-blend-multiply hover:mix-blend-normal ${themeItem.lightBgColor} ${themeItem.lightBgBorderColor} transition`}
    >
      {isEditMode ? (
        <DropDownMenu
          TriggerComponent={() => {
            return (
              <div
                className={`h-4 w-4 rounded-full ${themeItem.bgColor}`}
              ></div>
            );
          }}
          PopoverComponent={() => {
            return (
              <div className={`bg-white shadow-md rounded-md`}>
                <ColorPalette
                  activeTheme={colorTheme}
                  onClickTheme={updateTheme}
                  size={"sm"}
                />
              </div>
            );
          }}
        />
      ) : null}

      {!isEditMode ? (
        <abbr title={title}>
          <div className={`max-w-[120px] truncate`} onClick={toggleMode}>
            {title}
          </div>
        </abbr>
      ) : (
        <input
          type={"text"}
          value={title}
          onChange={updateTitle}
          className={`bg-transparent outline-none ${themeItem.placeholder}`}
          autoFocus
          placeholder=". . . ✍🏻"
        />
      )}

      {isEditMode ? (
        <FiCheck onClick={toggleMode} className={iconClass} />
      ) : null}

      <div className="group-hover:scale-100 w-fit flex flex-row items-center transition origin-left scale-x-0">
        {!isEditMode ? (
          <FiEdit2
            className={`${iconClass} invisible group-hover:visible w-0 group-hover:w-fit`}
            onClick={toggleMode}
          />
        ) : null}
        {!isEditMode ? (
          <FiX
            className={`${iconClass} invisible group-hover:visible w-0 group-hover:w-fit`}
            onClick={handleRemove}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Tag;
