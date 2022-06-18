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

  return (
    <td>
      <TableActionsCellWrapper cellId={cellId}>
        <div
          className={`hover:shadow-xl relative flex flex-col items-start justify-center w-56 h-24 px-4 py-4 rounded-md font-medium text-lg ${themeItem.bgColor} ${themeItem.hoverBgColor} ${themeItem.textColor}`}
        >
          {isEditMode ? (
            <textarea
              type={"text"}
              name="title"
              value={title}
              onChange={handleTextChange}
              rows={2}
              className={`scrollbar outline-none resize-none bg-transparent h-full w-full hover:bg-transparent`}
              autoFocus
              placeholder="Anything..."
            />
          ) : (
            <div className="scrollbar-hide w-full h-full overflow-auto whitespace-pre-line select-all">
              {title}
            </div>
          )}
        </div>
      </TableActionsCellWrapper>
    </td>
  );
};

const BasicMemo = React.memo(Basic);
export default BasicMemo;
