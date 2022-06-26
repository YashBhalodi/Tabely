import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { TableActionsCellWrapper, CellContextMenu } from "Components";

import { useCell, useBoard } from "Hooks";
import { FiMaximize2 } from "react-icons/fi";

import { COLOR_THEME } from "Utils/colors";
import CardContentModal from "./CardContentModal";

const Card = ({ cellId }) => {
  const { cellData, updateFields } = useCell({ id: cellId });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { boardId } = useParams();
  const { isEditMode } = useBoard({ id: boardId });

  const contextMenuRef = useRef(null);
  const containerRef = useRef(null);

  const { title = "", colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const handleContextMenu = (event) => {
    contextMenuRef?.current?.launchContextMenu(event);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const launchModal = () => {
    setIsModalOpen(true);
  };

  const handleKeyboardEvent = (e) => {
    if (e.code === "Enter") {
      launchModal();
    }
  };

  const handleTitleChange = (e) => {
    updateFields({ title: e.target.value });
  };

  const containerClass = `relative flex w-full h-full rounded-md font-medium text-lg min-h-cell min-w-cell max-w-cell max-h-cell ${themeItem.bgColor} ${themeItem.hoverBgColor} ${themeItem.textColor} ${themeItem.scrollbar}`;
  const titleInputClass = `${themeItem.bgColor} w-full h-full rounded-md min-h-cell hover:bg-transparent p-4 ${themeItem.scrollbar}`;

  return (
    <td>
      <TableActionsCellWrapper cellId={cellId}>
        <div
          ref={containerRef}
          onContextMenu={handleContextMenu}
          className={containerClass}
          tabIndex={0}
          onKeyDownCapture={handleKeyboardEvent}
        >
          {isEditMode ? (
            <textarea
              type={"text"}
              name="title"
              value={title}
              onChange={handleTitleChange}
              className={`${titleInputClass} ${themeItem.placeholder} outline-none resize-none border-0`}
              placeholder=". . .  ✍🏻"
              autoFocus
            />
          ) : (
            <div
              className={`h-full w-full p-4 max-h-cell overflow-y-auto overflow-x-hidden break-words ${themeItem.scrollbar}`}
            >
              {title}
            </div>
          )}
          <div
            className={`bottom-2 right-2 ${themeItem.bgColor} mix-blend-hard-light hover:p-1.5 absolute p-1 transition-all rounded-md cursor-pointer`}
            onClick={launchModal}
          >
            <FiMaximize2 className={`${themeItem.textColor} text-lg`} />
          </div>
        </div>
        <CellContextMenu
          cellId={cellId}
          ref={contextMenuRef}
          containerRef={containerRef}
        />
        <CardContentModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          cellId={cellId}
        />
      </TableActionsCellWrapper>
    </td>
  );
};

const CardMemo = React.memo(Card);
export default CardMemo;
