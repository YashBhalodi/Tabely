import React, { useRef } from "react";

import { useParams } from "react-router-dom";

import { TableActionsCellWrapper, CellContextMenu } from "Components";

import { useCell, useBoard } from "Hooks";

import { COLOR_THEME } from "Utils/colors";

const DualField = ({ cellId }) => {
  const { cellData, updateFields } = useCell({ id: cellId });
  const { boardId } = useParams();
  const { isEditMode } = useBoard({ id: boardId });

  const contextMenuRef = useRef(null);
  const containerRef = useRef(null);

  const { title, subtitle, colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const containerClass = `group flex flex-col justify-center items-start space-y-1 rounded-md py-4 h-full min-h-cell max-w-cell max-h-cell ${themeItem.bgColor} ${themeItem.hoverBgColor} ${themeItem.textColor} ${themeItem.scrollbar}`;
  const commonFieldClass = `scrollbar-hide flex-1 overflow-x-auto whitespace-nowrap w-cell px-4`;
  const commonInputClass = `${themeItem.bgColor} ${themeItem.placeholder} group-hover:bg-transparent outline-none`;
  const commonTitleClass = `text-xl font-medium`;
  const commonSubtitleClass = `text-base opacity-70 font-medium`;

  const handleInput = (e) => {
    updateFields({ [e.target.name]: e.target.value });
  };

  const handleContextMenu = (event) => {
    contextMenuRef?.current?.toggleContextView(event);
  };

  return (
    <td id={cellId} key={cellId}>
      <TableActionsCellWrapper cellId={cellId}>
        <div
          className="focus:outline-offset-2 w-full h-full"
          onContextMenu={handleContextMenu}
          ref={containerRef}
          tabIndex={0}
        >
          {isEditMode ? (
            <div className={containerClass}>
              <input
                className={`${commonFieldClass} ${commonInputClass} ${commonTitleClass}`}
                placeholder={". . . ✍🏻"}
                autoFocus
                type={"text"}
                name="title"
                value={title}
                onChange={handleInput}
                tabIndex={-1}
              />
              <input
                className={`${commonFieldClass} ${commonInputClass} ${commonSubtitleClass}`}
                placeholder={". . . ✍🏻"}
                type={"text"}
                name="subtitle"
                value={subtitle}
                onChange={handleInput}
                tabIndex={-1}
              />
            </div>
          ) : (
            <div className={containerClass}>
              <div className={`${commonFieldClass} ${commonTitleClass}`}>
                {title}
              </div>
              <div className={`${commonFieldClass} ${commonSubtitleClass}`}>
                {subtitle}
              </div>
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

const DualFieldMemo = React.memo(DualField);
export default DualFieldMemo;
