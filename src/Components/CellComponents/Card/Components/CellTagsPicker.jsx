import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useBoard } from "Hooks";

import { Tag } from "Components";

import { FiPlusSquare } from "react-icons/fi";
import _ from "lodash";
import { useEffect } from "react";

const BoardTagList = (props) => {
  const {
    onTagSelect,
    themeItem,
    omitTags = [],
    onOutsideClick = () => {},
  } = props;
  const { boardId } = useParams();
  const [searchText, setSearchText] = useState("");
  const { tagsData, createTag } = useBoard({ id: boardId });
  const [newTags, setNewTags] = useState([]);
  const pickerContainerRef = useRef();

  const getFilteredTags = () => {
    const validTags = _.filter(
      tagsData,
      (tag) => !_.includes(omitTags, tag.id)
    );

    if (searchText === "") {
      return validTags;
    }
    const filteredTags = _.filter(validTags, (tag) => {
      if (tag.title) {
        return _.includes(tag.title, searchText);
      } else {
        return true;
      }
    });
    return filteredTags;
  };

  const filteredTagsData = getFilteredTags();

  const showCreateTagButton = filteredTagsData.length < 3;

  const handleTagSelect = ({ id }) => {
    onTagSelect({ id });
    const isNewTag = _.includes(_.map(newTags, "id"), id);
    if (isNewTag) {
      setNewTags((prev) => {
        return _.filter(prev, (newTag) => {
          return newTag.id !== id;
        });
      });
    }
  };

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddTag = () => {
    const newTagId = createTag();
    setNewTags((prev) => {
      return [...prev, { id: newTagId, initialTitle: searchText }];
    });
    setSearchText("");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (e) => {
    if (!pickerContainerRef.current.contains(e.target)) {
      onOutsideClick();
    }
  };

  return (
    <div
      ref={pickerContainerRef}
      className={`p-2 rounded-md max-h-[180px] overflow-auto flex gap-2 flex-col ${themeItem.scrollbar} ${themeItem.lightBgColor} ${themeItem.lightBgBorderColor} border`}
    >
      <input
        type={"search"}
        placeholder={"search tags . . ."}
        value={searchText}
        onChange={handleSearchInput}
        className={`border-b-2 outline-none ${themeItem.lightBgColor} ${themeItem.lightBgBorderColor} mb-2 p-1 text-sm font-normal`}
        autoFocus
      />
      {filteredTagsData.map((tag) => {
        const { id } = tag;
        const isNewTag = _.includes(_.map(newTags, "id"), id);
        const { initialTitle } = _.find(newTags, { id }) || {};
        return (
          <Tag
            key={id}
            id={id}
            readOnly={isNewTag ? false : true}
            onClick={handleTagSelect}
            mode={isNewTag ? "CREATE" : ""}
            initialData={isNewTag ? { title: initialTitle } : {}}
          />
        );
      })}
      {showCreateTagButton && (
        <div
          className={`rounded-full p-1 flex flex-row justify-center text-sm truncate ${themeItem.bgColor} ${themeItem.textColor} ${themeItem.hoverBgColor} ${themeItem.hoverTextColor} transition-colors cursor-pointer`}
          onClick={handleAddTag}
        >
          {searchText === "" ? "Add tag" : `Add "${searchText}" tag`}
        </div>
      )}
    </div>
  );
};

const TagPickerTrigger = (props) => {
  const { themeItem, onClick } = props;
  return (
    <FiPlusSquare
      className={`${themeItem.darkTextColor} text-2xl opacity-40 cursor-pointer`}
      onClick={onClick}
    />
  );
};

export { TagPickerTrigger, BoardTagList };
