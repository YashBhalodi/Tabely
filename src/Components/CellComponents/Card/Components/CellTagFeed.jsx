import React, { useState } from "react";

import { useCell } from "Hooks";

import { Tag } from "Components";
import { COLOR_THEME } from "Utils/colors";

import { TagPickerTrigger, BoardTagList } from "./CellTagsPicker";

const CellTagFeed = (props) => {
  const { cellId } = props;
  const { cellData, toggleTagId } = useCell({ id: cellId });
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
        <TagPickerTrigger themeItem={themeItem} onClick={toggleTagPicker} />
      </div>
      {showTagPicker && (
        <BoardTagList
          themeItem={themeItem}
          omitTags={tagIds}
          onTagSelect={toggleTagId}
          onOutsideClick={toggleTagPicker}
        />
      )}
      <div className="min-h-[24px] w-full rounded-md flex-wrap flex flex-row gap-2">
        {tagIds.map((id) => (
          <Tag key={id} id={id} onRemoveClick={toggleTagId} />
        ))}
      </div>
    </div>
  );
};

export default CellTagFeed;
