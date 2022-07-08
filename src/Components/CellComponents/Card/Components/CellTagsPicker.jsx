import React from "react";
import { useParams } from "react-router-dom";
import { useBoard, useCell } from "Hooks";

import { Tag, DropDownMenu } from "Components";
import { COLOR_THEME } from "Utils/colors";

import { FiPlusSquare } from "react-icons/fi";

const BoardTagList = (props) => {
  const { onTagSelect } = props;
  const { boardId } = useParams();
  const { tagsData, createTag } = useBoard({ id: boardId });

  const handleTagSelect = ({ id }) => {
    onTagSelect({ id });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md max-h-[150px] overflow-auto flex flex-col gap-1">
      {tagsData.map((tag) => {
        const { id } = tag;
        return (
          <Tag key={id} id={id} readOnly={true} onClick={handleTagSelect} />
        );
      })}
    </div>
  );
};

const TagPickerTrigger = (props) => {
  const { themeItem } = props;
  return (
    <FiPlusSquare
      className={`${themeItem.darkTextColor} text-2xl opacity-40 cursor-pointer`}
    />
  );
};

const CellTagsPicker = (props) => {
  const { cellId } = props;
  const { cellData, toggleTagId } = useCell({ id: cellId });
  const { tagIds, colorTheme } = cellData;
  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  return (
    <DropDownMenu
      TriggerComponent={() => {
        return <TagPickerTrigger themeItem={themeItem} />;
      }}
      PopoverComponent={() => {
        return <BoardTagList onTagSelect={toggleTagId} />;
      }}
    />
  );
};

export default CellTagsPicker;
