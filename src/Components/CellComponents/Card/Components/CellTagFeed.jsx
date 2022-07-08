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
  const { tagIds, colorTheme } = cellData;
  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const handleRemoveTag = ({ id }) => {
    toggleTagId({ id });
  };

  const handleCreateTag = () => {
    const newTagId = createTag();
    toggleTagId({ id: newTagId });
  };

  return (
    <div className={`flex flex-col gap-2`}>
      <div className="flex flex-row items-center justify-between">
        <div
          className={`text-base ${themeItem.darkTextColor} opacity-40 font-medium`}
        >
          Tags
        </div>
        <div onClick={handleCreateTag}>Create</div>
      </div>
      <div className="min-h-[24px] w-full rounded-md flex-wrap flex flex-row gap-2">
        {tagIds.map((id) => (
          <Tag key={id} id={id} onRemoveClick={handleRemoveTag} />
        ))}
      </div>
    </div>
  );
};

export default CellTagFeed;
