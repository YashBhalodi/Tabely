import React from "react";

import { useCell } from "Hooks";

import { COLOR_THEME } from "Utils/colors";

import { CellDatePicker, CellThemeSwitcher } from "./Components";

const SidePanelComponent = (props) => {
  const { cellId } = props;
  const { cellData } = useCell({ id: cellId });
  const { colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  return (
    <div
      className={`flex-[2_2_0%] h-full rounded-md flex flex-col space-y-4 ${themeItem.lightBgColor} mix-blend-multiply p-2`}
    >
      <CellDatePicker cellId={cellId} />
      <CellThemeSwitcher cellId={cellId} />
    </div>
  );
};

export default React.memo(SidePanelComponent);
