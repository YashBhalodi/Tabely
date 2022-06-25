import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { useBoard, useCell, useTable } from "Hooks";
import { CELL_CONFIGS, FEATURES } from "Utils/constants";
import { CellContextMenu } from "Components";
import { CellDragDropWrapper } from "./Components";

const TableActionsCellWrapper = (props) => {
  const { children, cellId } = props;
  const { cellData } = useCell({ id: cellId });

  const { type } = cellData;

  const isDragDropAllowed = CELL_CONFIGS[type].features.includes(
    FEATURES.DRAG_N_DROP
  );

  return (
    <div className="group relative w-full h-full">
      <CellContextMenu cellId={cellId}>
        {isDragDropAllowed ? (
          <CellDragDropWrapper cellId={cellId}>{children}</CellDragDropWrapper>
        ) : (
          children
        )}
      </CellContextMenu>
    </div>
  );
};

TableActionsCellWrapper.propTypes = {
  cellId: PropTypes.string.isRequired,
};

export default TableActionsCellWrapper;
