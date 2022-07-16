import React, { useRef } from "react";
import { useParams } from "react-router-dom";

import { TableActionsCellWrapper, CellContextMenu } from "Components";

import { useCell, useBoard } from "Hooks";

import { COLOR_THEME } from "Utils/colors";

const Basic = ({ cellId }) => {
  const { cellData, updateFields } = useCell({ id: cellId });
  const { boardId } = useParams();
  const { isEditMode } = useBoard({ id: boardId });
  const contextMenuRef = useRef(null);
  const containerRef = useRef(null);

  const { title = "", colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const handleTextChange = (e) => {
    updateFields({
      title: e.target.value,
    });
  };

  const commonClass = `flex w-full h-full rounded-md font-medium text-lg p-4 min-h-cell min-w-cell ${themeItem.bgColor} ${themeItem.hoverBgColor} ${themeItem.textColor} ${themeItem.scrollbar}`;

  const handleContextMenu = (event) => {
    contextMenuRef?.current?.toggleContextView(event);
  };

  return (
    <td key={cellId} id={cellId}>
      <TableActionsCellWrapper cellId={cellId}>
        <div
          className="focus:outline-offset-2 w-full h-full"
          ref={containerRef}
          onContextMenu={handleContextMenu}
          tabIndex={-1}
        >
          {isEditMode ? (
            <textarea
              type={"text"}
              name="title"
              value={title}
              onChange={handleTextChange}
              className={`${commonClass} ${themeItem.placeholder} outline-none resize-none border-0`}
              placeholder=". . .  ✍🏻"
              autoFocus
              tabIndex={-1}
            />
          ) : (
            <div
              className={`${commonClass} max-h-cell max-w-cell hover:shadow-md break-before-all overflow-auto whitespace-pre-line select-all`}
            >
              {title}
            </div>
          )}
        </div>
        <CellContextMenu
          ref={contextMenuRef}
          containerRef={containerRef}
          cellId={cellId}
        />
      </TableActionsCellWrapper>
    </td>
  );
};

const BasicMemo = React.memo(Basic);
export default BasicMemo;
