import React from "react";
import PropTypes from "prop-types";

import { useBoard, useCell, useTable } from "Hooks";
import { COLOR_THEME } from "Utils/colors";
import { CELL_TYPES } from "Utils/constants";
import { AddButtonBar } from "Components";

const AddColumnRowActions = (props) => {
  const { onClickAction } = props;

  const commonClass = `group-hover:visible hover:opacity-100 absolute invisible transition-all opacity-50 cursor-pointer`;
  const horizontalCommonClass = `inset-x-0`;
  const verticalCommonClass = `inset-y-0`;

  return (
    <>
      <div
        className={`${commonClass} ${horizontalCommonClass} -top-2 group-hover:-top-3.5 `}
      >
        <AddButtonBar
          isHorizontal={true}
          onClick={() => onClickAction("top")}
        />
      </div>
      <div
        className={`${commonClass} ${horizontalCommonClass} -bottom-2 group-hover:-bottom-3.5`}
      >
        <AddButtonBar
          isHorizontal={true}
          onClick={() => onClickAction("bottom")}
        />
      </div>
      <div
        className={`${commonClass} ${verticalCommonClass} -left-2 group-hover:-left-3.5`}
      >
        <AddButtonBar
          isHorizontal={false}
          onClick={() => onClickAction("left")}
        />
      </div>
      <div
        className={`${commonClass} ${verticalCommonClass} -right-2 group-hover:-right-3.5`}
      >
        <AddButtonBar
          isHorizontal={false}
          onClick={() => onClickAction("right")}
        />
      </div>
    </>
  );
};

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

  if (!isEditMode || [CELL_TYPES.BLANK, CELL_TYPES.IDLE].includes(type)) {
    return <div>{children}</div>;
  }

  const theme = [CELL_TYPES.BLANK, CELL_TYPES.IDLE].includes(type)
    ? COLOR_THEME["BLUE"]
    : COLOR_THEME[colorTheme];

  return (
    <div className="group relative w-full h-full">
      <AddColumnRowActions onClickAction={handleClick} />
      {children}
    </div>
  );
};

TableActionsCellWrapper.propTypes = {
  cellId: PropTypes.string.isRequired,
};

export default TableActionsCellWrapper;
