import React from "react";

import { useCell } from "Hooks";

import { COLOR_THEME } from "Utils/colors";

import { CellDatePicker, CellThemeSwitcher, CellTagFeed } from "./Components";

const SidePanelComponent = (props) => {
  const { cellId } = props;
  const { cellData } = useCell({ id: cellId });
  const { colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  return (
    <div
      className={`flex-[2_2_0%] h-full rounded-md flex flex-col gap-4 ${themeItem.lightBgColor} mix-blend-multiply p-4`}
    >
      <CellDatePicker cellId={cellId} />
      <CellThemeSwitcher cellId={cellId} />
      <CellTagFeed cellId={cellId} />
    </div>
  );
};

export default React.memo(SidePanelComponent);
