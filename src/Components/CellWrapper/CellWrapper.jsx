import React from "react";

import { useRecoilValue } from "recoil";

import { cellsFamily } from "@/Atoms";

import { Idle } from "@/Components/CellComponents";
import { CELL_TYPES } from "@/Utils/constants";

const MAP_TYPE_COMPONENT = {
  [CELL_TYPES.IDLE]: Idle,
};

const CellWrapper = ({ cellId }) => {
  const cellData = useRecoilValue(cellsFamily(cellId));
  const { type } = cellData || {};

  const CellComponent = MAP_TYPE_COMPONENT[type];

  if (!type || !CellComponent) {
    console.warn("invalid cell type found:", { type, cellId });
    return null;
  }

  return <CellComponent cellId={cellId} />;
};

export default CellWrapper;
