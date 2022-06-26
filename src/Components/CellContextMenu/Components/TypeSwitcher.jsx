import React from "react";
import { DropDownMenu } from "Components";
import { TbExchange } from "react-icons/tb";

import { useCell } from "Hooks";
import { USER_CELL_TYPES } from "Utils/constants";
import { COLOR_THEME } from "Utils/colors";
import _ from "lodash";

const TypeSwitcher = ({ cellId }) => {
  const { cellData, updateFields } = useCell({ id: cellId });
  const { colorTheme = "STONE", type } = cellData;
  const theme = COLOR_THEME[colorTheme];

  const buttonCommonClass = `hover:bg-slate-100 h-fit w-fit p-2 transition-colors border rounded-md cursor-pointer`;

  const handleMenuClick = (type) => {
    updateFields({ type: type });
  };

  return (
    <DropDownMenu
      TriggerComponent={() => {
        return (
          <abbr title="Switch type">
            <div className={buttonCommonClass}>
              <TbExchange className={`text-lg`} />
            </div>
          </abbr>
        );
      }}
      PopoverComponent={() => {
        return (
          <div
            className={`${theme.lightBgColor} mt-4 py-2 rounded-md shadow-md border-[0.5px] ${theme.lightBgBorderColor}`}
          >
            {_.map(USER_CELL_TYPES, (item) => {
              const { key, label } = item;
              const isActive = key === type;
              const className = isActive
                ? `${theme.bgColor} ${theme.textColor} cursor-auto`
                : `${theme.lightBgColor} ${theme.hoverBgColor}`;
              return (
                <div
                  key={key}
                  className={`px-4 py-2 cursor-pointer font-medium ${className} ${theme.textColor} ${theme.hoverTextColor} transition-colors`}
                  onClick={() => handleMenuClick(key)}
                >
                  {label}
                </div>
              );
            })}
          </div>
        );
      }}
    />
  );
};

export default TypeSwitcher;
