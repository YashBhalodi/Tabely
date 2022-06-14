import React from "react";
import { FiTrash } from "react-icons/fi";

import { useCell } from "Hooks";
import { ThemePicker } from "Components";

const CellActionStrip = (props) => {
  const { isVisible, cellId } = props;
  const { cellData, updateFields, clearCell } = useCell({ id: cellId });
  const { type, colorTheme } = cellData;

  const setTheme = (theme) => {
    updateFields({
      colorTheme: theme,
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`absolute z-20 -bottom-9 right-0 w-fit h-fit rounded-md grid grid-flow-col grid-rows-1 items-center justify-end flex-1 p-2 space-x-2 shadow-md bg-white`}
    >
      <ThemePicker onSelectTheme={setTheme} activeTheme={colorTheme} />

      <FiTrash
        className="hover:text-red-500 w-5 h-5 text-xl text-red-400 transition-all rounded-md"
        onClick={clearCell}
      />
    </div>
  );
};

export default CellActionStrip;
