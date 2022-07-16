import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCell, useBoard } from "Hooks";

import { Tag } from "Components";
import { COLOR_THEME } from "Utils/colors";

import { TagPickerTrigger, BoardTagList } from "./CellTagsPicker";

const CellTagFeed = (props) => {
  const { cellId } = props;
  const { cellData, toggleTagId } = useCell({ id: cellId });
  const { boardId } = useParams();
  const { isEditMode } = useBoard({ id: boardId });
  const [showTagPicker, setShowTagPicker] = useState(false);
  const { tagIds = [], colorTheme } = cellData;
  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const toggleTagPicker = () => {
    setShowTagPicker((prev) => !prev);
  };

  return (
    <div className={`flex flex-col gap-2`}>
      <div className="flex flex-row items-center justify-between">
        <div
          className={`text-base ${themeItem.darkTextColor} opacity-40 font-medium`}
        >
          Tags
        </div>
        {isEditMode && (
          <TagPickerTrigger themeItem={themeItem} onClick={toggleTagPicker} />
        )}
      </div>
      {showTagPicker && (
        <BoardTagList
          themeItem={themeItem}
          omitTags={tagIds}
          onTagSelect={toggleTagId}
          onClickOutside={toggleTagPicker}
        />
      )}
      <div className="min-h-[24px] w-full rounded-md flex-wrap flex flex-row gap-2">
        {tagIds.map((id) => (
          <Tag
            key={id}
            id={id}
            onRemoveClick={toggleTagId}
            readOnly={!isEditMode}
          />
        ))}
      </div>
    </div>
  );
};

export default CellTagFeed;
