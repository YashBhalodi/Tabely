import React, { useState } from "react";
import { CgAdd } from "react-icons/cg";

import { useCell } from "Hooks";
import { CELL_TYPES } from "Utils/constants";

const Idle = ({ cellId }) => {
  const { cellData, updateFields } = useCell({ id: cellId });
  const [shouldShowText, setShouldShowText] = useState(false);

  const handleClick = () => {
    updateFields({
      type:
        cellData.type === CELL_TYPES.IDLE ? CELL_TYPES.IDLE2 : CELL_TYPES.IDLE,
    });
  };

  const showText = () => {
    setShouldShowText(true);
  };
  const hideText = () => {
    setShouldShowText(false);
  };

  return (
    <td key={cellId}>
      <div
        className="bg-slate-200 hover:border-blue-300 hover:bg-slate-100 hover:border-2 flex flex-col items-center justify-center w-32 h-24 p-2 transition-all rounded-md cursor-pointer"
        onMouseEnter={showText}
        onMouseLeave={hideText}
        onClick={handleClick}
      >
        {shouldShowText && <CgAdd className="text-xl text-blue-300" />}
      </div>
    </td>
  );
};

export default Idle;
