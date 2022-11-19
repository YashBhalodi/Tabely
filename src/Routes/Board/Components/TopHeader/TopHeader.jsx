import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { FiEdit3, FiLock, FiChevronLeft, FiMoreVertical } from "react-icons/fi";

import { useBoard, useTable } from "Hooks";

import { DropDownMenu, Button, GlobalSearchButton } from "Components";
import { focusFirstCell } from "Utils/keyboardInteractionUtils";
import _ from "lodash";

const BoardTitleEditableField = () => {
  const { boardId } = useParams();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { isEditMode, title, updateBoard } = useBoard({ id: boardId });

  useEffect(() => {
    if (_.isEmpty(title) && isEditMode) {
      setIsEditingTitle(true);
    }
  }, [isEditMode]);

  const updateBoardTitle = (e) => {
    updateBoard({ title: e.target.value });
  };

  const toggleEditMode = () => {
    isEditMode && setIsEditingTitle((prevState) => !prevState);
  };

  const handleEnterKeyPress = (e) => {
    const { key } = e;
    if (key === "Enter") {
      focusFirstCell({ boardId });
    }
  };

  return (
    <>
      {(isEditingTitle && isEditMode) || (isEditMode && _.isEmpty(title)) ? (
        <input
          name={"title"}
          value={title}
          onChange={updateBoardTitle}
          className="bg-blue-50 flex-1 text-xl font-medium text-blue-900 placeholder-blue-400 border-none outline-none"
          placeholder={"Board Title"}
          onBlur={toggleEditMode}
          autoFocus={_.isEmpty(title) || isEditingTitle}
          onKeyDown={handleEnterKeyPress}
        />
      ) : (
        <div
          className="text-xl font-medium text-blue-900 select-all"
          onClick={toggleEditMode}
        >
          {title}
        </div>
      )}
    </>
  );
};

const TableActionDropDown = () => {
  const { boardId } = useParams();
  const { tableId } = useBoard({ id: boardId });
  const { resetTable, clearTableData } = useTable({ id: tableId });

  const MAP_KEY_ACTION = {
    RESET_TABLE: resetTable,
    CLEAR_TABLE: clearTableData,
  };

  const TABLE_ACTIONS = [
    { key: "CLEAR_TABLE", label: "Clear Table", isDestructive: true },
    { key: "RESET_TABLE", label: "Reset Table", isDestructive: true },
  ];

  return (
    <DropDownMenu
      menu={TABLE_ACTIONS}
      onItemClick={(key) => {
        MAP_KEY_ACTION[key]?.();
      }}
      TriggerComponent={() => {
        return (
          <Button
            variant={"primary-plain"}
            shape={"square"}
            size={"md"}
            tooltip={"More board actions"}
          >
            <FiMoreVertical />
          </Button>
        );
      }}
    />
  );
};

const TopHeader = () => {
  const { boardId } = useParams();
  const { isEditMode, toggleBoardMode } = useBoard({ id: boardId });

  return (
    <div className=" bg-blue-50 flex flex-row items-center justify-between w-full h-20 p-4 space-x-4 border-b-2 border-blue-100">
      <div className="flex flex-row items-center justify-start flex-1 space-x-4">
        <NavLink to={"/"}>
          <Button
            variant={"primary-plain"}
            shape={"square"}
            size={"md"}
            tooltip={"Back to all boards"}
          >
            <FiChevronLeft />
          </Button>
        </NavLink>
        <BoardTitleEditableField />
      </div>
      <GlobalSearchButton />
      <Button
        variant={"primary-plain"}
        shape={"square"}
        size={"md"}
        onClick={toggleBoardMode}
        tooltip={isEditMode ? "Switch to View Mode" : "Switch to Edit Mode"}
      >
        {isEditMode ? <FiLock /> : <FiEdit3 />}
      </Button>
      <TableActionDropDown />
    </div>
  );
};
export default TopHeader;
