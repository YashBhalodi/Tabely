import React, { useState, useEffect, useRef } from "react";

import { useTag } from "Hooks";
import { DropDownMenu, ColorPalette } from "Components";
import { COLOR_THEME } from "Utils/colors";
import { FiX, FiCheck, FiEdit2 } from "react-icons/fi";

import _ from "lodash";

const Tag = (props) => {
  const {
    id,
    onRemoveClick,
    readOnly = false,
    onClick,
    initialData,
    mode = "",
  } = props;
  const { data, updateTag } = useTag({ id });
  const { title, colorTheme } = data;
  const [isEditMode, setIsEditMode] = useState(false);
  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;
  const dropdownRef = useRef();

  useEffect(() => {
    if (_.isEmpty(title) && !readOnly) {
      setIsEditMode(true);
    }
  }, [title]);

  useEffect(() => {
    if (initialData && !_.isEmpty(initialData)) {
      updateTag(initialData);
      setIsEditMode(true);
    }
  }, []);

  const updateTitle = (e) => {
    updateTag({ title: e.target.value });
  };
  const updateTheme = (theme) => {
    dropdownRef.current?.togglePopOverComponent?.();
    updateTag({ colorTheme: theme });
  };

  const toggleMode = () => {
    !readOnly && setIsEditMode((prev) => !prev);
  };

  const handleTagClick = () => {
    onClick?.({ id });
  };

  const handleRemove = () => {
    onRemoveClick?.({ id });
  };

  const onInputKeyDown = (e) => {
    if (e.key === "Enter") {
      toggleMode();
    }
  };

  const iconClass = `text-xs ${themeItem.darkTextColor} cursor-pointer`;

  return (
    <div
      className={`relative group flex flex-row gap-1 items-center text-sm rounded-full w-max py-1 px-2 border shadow-sm mix-blend-multiply hover:mix-blend-normal ${themeItem.lightBgColor} ${themeItem.lightBgBorderColor} transition`}
    >
      {!readOnly && isEditMode ? (
        <DropDownMenu
          ref={dropdownRef}
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
          <div
            className={`max-w-[120px] truncate ${
              readOnly ? "cursor-pointer" : ""
            }`}
            onClick={handleTagClick}
          >
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
          onKeyDown={onInputKeyDown}
        />
      )}

      {readOnly ? null : isEditMode ? (
        <FiCheck onClick={toggleMode} className={iconClass} />
      ) : (
        <div
          className={`group-hover:scale-100 invisible group-hover:visible w-fit absolute inset-y-0 right-0 flex flex-row gap-1 px-1 items-center transition origin-right scale-x-0 ${themeItem.lightBgColor} rounded-r-full`}
        >
          <FiEdit2
            className={`${iconClass} invisible group-hover:visible w-0 group-hover:w-fit`}
            onClick={toggleMode}
          />
          {mode !== "CREATE" ? (
            <FiX
              className={`${iconClass} invisible group-hover:visible w-0 group-hover:w-fit`}
              onClick={handleRemove}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Tag;
