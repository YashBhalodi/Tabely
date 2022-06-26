import React from "react";
import PropTypes from "prop-types";

import { useCell } from "Hooks";
import { CELL_CONFIGS, FEATURES } from "Utils/constants";
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
      {isDragDropAllowed ? (
        <CellDragDropWrapper cellId={cellId}>{children}</CellDragDropWrapper>
      ) : (
        children
      )}
    </div>
  );
};

TableActionsCellWrapper.propTypes = {
  cellId: PropTypes.string.isRequired,
};

export default TableActionsCellWrapper;
