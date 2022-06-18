import React from "react";

import { TableActionsCellWrapper } from "Components";

import { useCell, useBoard } from "Hooks";

import { COLOR_THEME } from "Utils/colors";

const Basic = ({ cellId }) => {
  const { cellData, updateFields } = useCell({ id: cellId });
  const { isEditMode } = useBoard();
  const { title = "", colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const handleTextChange = (e) => {
    updateFields({
      title: e.target.value,
    });
  };

  const commonClass = `h-full w-full rounded-md font-medium text-lg p-4 ${themeItem.bgColor} ${themeItem.hoverBgColor} ${themeItem.textColor}`;

  return (
    <td>
      <TableActionsCellWrapper cellId={cellId}>
        {isEditMode ? (
          <textarea
            type={"text"}
            name="title"
            value={title}
            onChange={handleTextChange}
            className={`${commonClass} ${themeItem.placeholder} ${themeItem.focusOutline} min-h-6 scrollbar-hide outline-none`}
            placeholder=". . .  ✍🏻"
            autoFocus
          />
        ) : (
          <div
            className={`${commonClass} hover:shadow-md max-h-52 scrollbar-hide break-before-all overflow-auto whitespace-pre-line select-all`}
          >
            {title}
          </div>
        )}
      </TableActionsCellWrapper>
    </td>
  );
};

const BasicMemo = React.memo(Basic);
export default BasicMemo;
