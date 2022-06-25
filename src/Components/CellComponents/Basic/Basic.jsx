import React from "react";
import { useParams } from "react-router-dom";

import { TableActionsCellWrapper } from "Components";

import { useCell, useBoard } from "Hooks";

import { COLOR_THEME } from "Utils/colors";

const Basic = ({ cellId }) => {
  const { cellData, updateFields } = useCell({ id: cellId });
  const { boardId } = useParams();
  const { isEditMode } = useBoard({ id: boardId });
  const { title = "", colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const handleTextChange = (e) => {
    updateFields({
      title: e.target.value,
    });
  };

  const commonClass = `flex w-full h-full rounded-md font-medium text-lg p-4 min-h-cell min-w-cell ${themeItem.bgColor} ${themeItem.hoverBgColor} ${themeItem.textColor} ${themeItem.scrollbar}`;

  return (
    <td>
      <TableActionsCellWrapper cellId={cellId}>
        {isEditMode ? (
          <textarea
            type={"text"}
            name="title"
            value={title}
            onChange={handleTextChange}
            className={`${commonClass} ${themeItem.placeholder} outline-none resize-none border-0`}
            placeholder=". . .  ✍🏻"
            autoFocus
          />
        ) : (
          <div
            className={`${commonClass} max-h-40 max-w-cell hover:shadow-md break-before-all overflow-auto whitespace-pre-line select-all`}
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
