import React from "react";
import { FiTrash } from "react-icons/fi";

import { useCell } from "Hooks";
import { ThemePicker } from "Components";

import { COLOR_THEME } from "Utils/colors";

const CellActionStrip = (props) => {
  const { cellId } = props;
  const { cellData, updateFields, clearCell } = useCell({ id: cellId });
  const { colorTheme } = cellData;
  const theme = COLOR_THEME[colorTheme];
  console.log({ theme });
  const setTheme = (theme) => {
    updateFields({
      colorTheme: theme,
    });
  };

  return (
    <div
      className={`invisible group-hover:visible absolute z-20 -bottom-0 opacity-0 group-hover:opacity-100 group-hover:-bottom-12 right-0 w-fit h-fit rounded-md grid grid-flow-col grid-rows-1 items-center justify-end flex-1 p-2 space-x-2 shadow-md transition-all ${theme.lightBgColor}`}
    >
      <ThemePicker onSelectTheme={setTheme} activeTheme={colorTheme} />

      <FiTrash
        className="hover:text-red-500 w-5 h-5 text-xl text-red-400 transition-all rounded-md cursor-pointer"
        onClick={clearCell}
      />
    </div>
  );
};

export default CellActionStrip;
