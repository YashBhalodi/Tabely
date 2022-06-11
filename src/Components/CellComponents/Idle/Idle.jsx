import React from "react";
import { useCell } from "Hooks";
import { CELL_TYPES } from "Utils/constants";

const Idle = ({ cellId }) => {
  const { cellData, updateFields } = useCell({ id: cellId });

  const handleClick = () => {
    updateFields({
      type:
        cellData.type === CELL_TYPES.IDLE ? CELL_TYPES.IDLE2 : CELL_TYPES.IDLE,
    });
  };
  return (
    <td key={cellId}>
      <div onClick={handleClick}>{cellData.type}</div>
    </td>
  );
};

export default Idle;
