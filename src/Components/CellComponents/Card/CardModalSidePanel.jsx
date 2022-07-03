import React, { forwardRef } from "react";

import { useParams } from "react-router-dom";

import { useCell, useBoard } from "Hooks";

import { COLOR_THEME } from "Utils/colors";

import { CellDatePicker } from "./Components";

const SidePanelComponent = (props) => {
  const { cellId } = props;
  const { cellData, updateFields } = useCell({ id: cellId });
  const { boardId } = useParams();
  const { isEditMode } = useBoard({ id: boardId });
  const { colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  return (
    <div
      className={`flex-[2_2_0%] h-full rounded-md flex flex-col ${themeItem.lightBgColor} mix-blend-multiply p-2`}
    >
      <CellDatePicker cellId={cellId} />
    </div>
  );
};

export default React.memo(SidePanelComponent);
