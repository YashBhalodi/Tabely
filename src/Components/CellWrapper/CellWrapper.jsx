import React from "react";

import { useRecoilState } from "recoil";

import { cellDataSelector } from "@/Atoms";

import { Idle } from "@/Components/CellComponents";

const MAP_TYPE_COMPONENT = {
  IDLE: Idle,
};

const CellWrapper = (props) => {
  const { cellId } = props;
  const [cellData, setCellData] = useRecoilState(cellDataSelector(cellId));
  const { type } = cellData || {};

  const CellComponent = MAP_TYPE_COMPONENT[type];

  if (!type || !CellComponent) {
    return null;
  }

  return <CellComponent />;
};

export default CellWrapper;
