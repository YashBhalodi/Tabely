import React from "react";
import { useCell } from "Hooks";

import { FiTrash } from "react-icons/fi";

const ClearCell = (props) => {
  const { cellId } = props;
  const { clearCell } = useCell({ id: cellId });

  const buttonCommonClass = `group bg-red-500 hover:bg-red-600 h-fit w-fit p-2 transition-colors border rounded-md cursor-pointer`;

  return (
    <abbr title="Clear cell">
      <div className={buttonCommonClass} onClick={clearCell}>
        <FiTrash
          className={`text-red-50 text-lg group-hover:text-red-100 transition-colors`}
        />
      </div>
    </abbr>
  );
};

export default ClearCell;
