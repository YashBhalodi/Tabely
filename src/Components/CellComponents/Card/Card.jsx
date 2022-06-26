import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { TableActionsCellWrapper, CellContextMenu } from "Components";

import { useCell, useBoard } from "Hooks";

import { COLOR_THEME } from "Utils/colors";
import CardContentModal from "./CardContentModal";

const Card = ({ cellId }) => {
  const { cellData, updateFields } = useCell({ id: cellId });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <td>
      <TableActionsCellWrapper cellId={cellId}>
        <div
          ref={containerRef}
          onContextMenu={handleContextMenu}
          onClick={() => setIsModalOpen(true)}
        >
          Card
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
