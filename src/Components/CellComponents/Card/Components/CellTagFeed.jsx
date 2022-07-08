import React from "react";
import { useParams } from "react-router-dom";
import { useBoard, useCell } from "Hooks";

import { Tag } from "Components";
import { COLOR_THEME } from "Utils/colors";

const CellTagFeed = (props) => {
  const { cellId } = props;
  const { boardId } = useParams();
  const { cellData, toggleTagId } = useCell({ id: cellId });
  const { createTag } = useBoard({ id: boardId });
  const { tagIds } = cellData;

  const handleRemoveTag = ({ id }) => {
    toggleTagId({ id });
  };

  return (
    <div className="bg-slate-50 min-h-[24px] w-full rounded-md flex-wrap flex flex-row gap-2">
      {tagIds.map((id) => (
        <Tag key={id} id={id} onRemoveClick={handleRemoveTag} />
      ))}
    </div>
  );
};

export default CellTagFeed;
