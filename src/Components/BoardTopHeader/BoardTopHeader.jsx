import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { FiEdit3, FiLock, FiChevronLeft, FiMoreVertical } from "react-icons/fi";

import { useBoard, useTable } from "Hooks";

import { DropDownMenu, Button } from "Components";
import _ from "lodash";

const BoardTitleEditableField = () => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { isEditMode, title, updateBoard } = useBoard();

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
  const { resetTable, clearTableData } = useTable();

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
          <Button variant={"primary-plain"} shape={"square"} size={"md"}>
            <FiMoreVertical />
          </Button>
        );
      }}
    />
  );
};

const BoardTopHeader = () => {
  const { isEditMode, toggleBoardMode } = useBoard();

  return (
    <div className=" bg-blue-50 flex flex-row items-center justify-between w-full h-20 p-4 space-x-4 border-b-2 border-blue-100">
      <div className="flex flex-row items-center justify-start flex-1 space-x-4">
        <Button variant={"primary-plain"} shape={"square"} size={"md"}>
          <NavLink to={-1}>
            <FiChevronLeft />
          </NavLink>
        </Button>
        <BoardTitleEditableField />
      </div>
      <Button
        variant={"primary-plain"}
        shape={"square"}
        size={"md"}
        onClick={toggleBoardMode}
      >
        {isEditMode ? <FiLock /> : <FiEdit3 />}
      </Button>
      <TableActionDropDown />
    </div>
  );
};
export default BoardTopHeader;
