import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { FiEdit3, FiLock, FiChevronLeft } from "react-icons/fi";

import { useBoard, useTable } from "Hooks";

import { DropDownMenu } from "Components";
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
      {isEditingTitle && isEditMode ? (
        <input
          name={"title"}
          value={title}
          onChange={updateBoardTitle}
          className="bg-blue-50 flex-1 text-xl font-medium text-blue-900 placeholder-blue-400 border-none outline-none"
          onBlur={() => setIsEditingTitle(false)}
          placeholder={"Board Title"}
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
  const {
    addColumn,
    addRow,
    resetTable,
    clearTableData,
    deleteColumn,
    deleteRow,
  } = useTable();

  const MAP_KEY_ACTION = {
    ADD_COLUMN: addColumn,
    ADD_ROW: addRow,
    RESET_TABLE: resetTable,
    CLEAR_TABLE: clearTableData,
    DELETE_COLUMN: deleteColumn,
    DELETE_ROW: deleteRow,
  };

  const TABLE_ACTIONS = [
    {
      key: "ADD_COLUMN",
      label: "Add Column",
    },
    {
      key: "ADD_ROW",
      label: "Add Row",
    },
    {
      key: "DELETE_COLUMN",
      label: "Delete Column",
    },
    {
      key: "DELETE_ROW",
      label: "Delete Row",
    },
    { key: "CLEAR_TABLE", label: "Clear Table" },
    { key: "RESET_TABLE", label: "Reset Table" },
  ];

  return (
    <DropDownMenu
      menu={TABLE_ACTIONS}
      onItemClick={(key) => {
        MAP_KEY_ACTION[key]?.();
      }}
    />
  );
};

const BoardTopHeader = () => {
  const { isEditMode, toggleBoardMode } = useBoard();

  const iconClass = "text-xl text-blue-900";
  const iconButtonClass =
    "hover:border-blue-300 hover:border flex flex-col items-center justify-center w-12 h-12 bg-blue-100 rounded-md cursor-pointer";

  return (
    <div className=" bg-blue-50 flex flex-row justify-between w-full h-20 p-4 space-x-4 border-b-2 border-blue-100">
      <div className="flex flex-row items-center justify-start flex-1 space-x-4">
        <NavLink to="/" className={iconButtonClass}>
          <FiChevronLeft className={"text-blue-900 text-2xl"} />
        </NavLink>
        <BoardTitleEditableField />
      </div>
      <div className={iconButtonClass} onClick={toggleBoardMode}>
        {isEditMode ? (
          <FiLock className={iconClass} />
        ) : (
          <FiEdit3 className={iconClass} />
        )}
      </div>
      <TableActionDropDown />
    </div>
  );
};
export default BoardTopHeader;
