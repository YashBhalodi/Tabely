import React from "react";
import PropTypes from "prop-types";

import { useBoard, useCell, useTable } from "Hooks";
import { COLOR_THEME } from "Utils/colors";
import { CELL_TYPES } from "Utils/constants";

const TableActionsCellWrapper = (props) => {
  const { children, cellId } = props;
  const { cellData } = useCell({ id: cellId });
  const { addRow, addColumn } = useTable();
  const { isEditMode } = useBoard();
  const { colorTheme, type } = cellData;

  const handleClick = (position) => {
    switch (position) {
      case "bottom":
        addRow({ cellId: cellId, position: "below" });
        break;
      case "top":
        addRow({ cellId: cellId, position: "above" });
        break;
      case "left":
        addColumn({ cellId: cellId, position: "left" });
        break;
      case "right":
        addColumn({ cellId: cellId, position: "right" });
        break;
      default:
        break;
    }
  };

  if (!isEditMode) {
    return <div>{children}</div>;
  }
  const theme = [CELL_TYPES.BLANK, CELL_TYPES.IDLE].includes(type)
    ? COLOR_THEME["BLUE"]
    : COLOR_THEME[colorTheme];

  const commonClass = `group-hover:visible absolute items-center justify-center flex invisible z-10 cursor-pointer p-1 text-xs ${theme.lightClass}`;

  return (
    <div className="group relative">
      <div
        className={`${commonClass} -top-6 rounded-t-lg inset-x-0 flex-row`}
        onClick={() => handleClick("top")}
      >
        +
      </div>
      <div
        className={`${commonClass} -left-4 rounded-l-lg inset-y-0 flex-col`}
        onClick={() => handleClick("left")}
      >
        +
      </div>
      <div
        className={`${commonClass} -bottom-6 rounded-b-lg inset-x-0 flex-row`}
        onClick={() => handleClick("bottom")}
      >
        +
      </div>
      <div
        className={`${commonClass} -right-4 rounded-r-lg inset-y-0 flex-col`}
        onClick={() => handleClick("right")}
      >
        +
      </div>
      {children}
    </div>
  );
};

TableActionsCellWrapper.propTypes = {
  cellId: PropTypes.string.isRequired,
};

export default TableActionsCellWrapper;
