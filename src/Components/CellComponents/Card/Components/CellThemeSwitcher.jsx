import React from "react";
import { useParams } from "react-router-dom";
import { useCell, useBoard } from "Hooks";
import { COLOR_THEME } from "Utils/colors";

import { ColorPalette, DropDownMenu } from "Components";

import _ from "lodash";

const CellThemeSwitcher = (props) => {
  const { cellId } = props;
  const { cellData, updateFields } = useCell({ id: cellId });
  const { boardId } = useParams();
  const { isEditMode } = useBoard({ id: boardId });
  const { colorTheme } = cellData;
  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const handleThemeChange = (theme) => {
    updateFields({ colorTheme: theme });
  };

  const themeDisplayName = _.upperFirst(_.lowerCase(colorTheme));

  const ThemeTrigger = () => {
    return (
      <div
        className={`p-2 flex flex-row space-x-2 items-center ${
          themeItem.lightBgBorderColor
        } ${
          themeItem.lightBgColor
        } border rounded-md mix-blend-multiply hover:mix-blend-normal transition ${
          isEditMode ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        <div className={`h-5 w-5 rounded-full ${themeItem.bgColor}`}></div>
        <div className={`${themeItem.darkTextColor}`}>{themeDisplayName}</div>
      </div>
    );
  };

  return (
    <div>
      {isEditMode ? (
        <DropDownMenu
          TriggerComponent={() => {
            return <ThemeTrigger />;
          }}
          PopoverComponent={() => {
            return (
              <div className={`bg-white shadow-md rounded-md`}>
                <ColorPalette
                  activeTheme={colorTheme}
                  onClickTheme={handleThemeChange}
                />
              </div>
            );
          }}
        />
      ) : (
        <ThemeTrigger />
      )}
    </div>
  );
};

export default CellThemeSwitcher;
