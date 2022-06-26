import React, { useRef } from "react";
import { useParams } from "react-router-dom";

import { TableActionsCellWrapper, CellContextMenu } from "Components";

import { useCell, useBoard } from "Hooks";

import { COLOR_THEME } from "Utils/colors";

const Card = ({ cellId }) => {
  const { cellData, updateFields } = useCell({ id: cellId });

  const contextMenuRef = useRef(null);
  const containerRef = useRef(null);

  const { title = "", colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const handleContextMenu = (event) => {
    contextMenuRef?.current?.launchContextMenu(event);
  };

  return (
    <td>
      <TableActionsCellWrapper cellId={cellId}>
        <div ref={containerRef} onContextMenu={handleContextMenu}>
          Card
        </div>
        <CellContextMenu
          cellId={cellId}
          ref={contextMenuRef}
          containerRef={containerRef}
        />
      </TableActionsCellWrapper>
    </td>
  );
};

const CardMemo = React.memo(Card);
export default CardMemo;
