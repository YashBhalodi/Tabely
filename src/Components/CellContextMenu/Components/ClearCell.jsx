import React from "react";
import { useCell } from "Hooks";

import { FiTrash } from "react-icons/fi";

const ClearCell = (props) => {
  const { cellId } = props;
  const { clearCell } = useCell({ id: cellId });

  return (
    <FiTrash
      className={`text-red-700 text-xl hover:text-red-400 transition-colors`}
      onClick={clearCell}
    />
  );
};

export default ClearCell;
