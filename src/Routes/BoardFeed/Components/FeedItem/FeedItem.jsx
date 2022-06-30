import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { FiChevronRight, FiTrash } from "react-icons/fi";

import { useDrag, useDrop } from "react-dnd";

import { useApp } from "Hooks";

const FeedItem = (props) => {
  const { board } = props;
  const { title, id } = board;
  const { deleteBoard, reorderBoards } = useApp();
  const navigate = useNavigate();
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "BOARD_CARD",
    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
    item: () => {
      return {
        id,
      };
    },
  });

  const [{ isOver }, drop] = useDrop({
    accept: "BOARD_CARD",
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
      };
    },
    hover: (incomingBoard, monitor) => {
      reorderBoards({ movingBoardId: incomingBoard.id, targetBoardId: id });
    },
  });

  const handleClick = () => {
    navigate(`${id}`);
  };

  const handleDeleteBoard = () => {
    deleteBoard({ id });
  };

  return (
    <div className={`group relative ${isDragging ? "opacity-0" : ""}`}>
      <div
        className={`shadow-blue-100 hover:bg-blue-50 hover:border hover:border-blue-200 bg-blue-100/50 flex flex-row items-center justify-center px-8 py-4 space-x-4 text-lg text-blue-900 transition-all duration-200 border border-transparent rounded-md shadow-sm cursor-pointer`}
        onClick={handleClick}
        ref={drag(drop(ref))}
      >
        <div className="flex-1 truncate">{title || "Untitled board"}</div>
        <FiChevronRight className="text-2xl" />
      </div>
      <div className="group-hover:visible group-hover:opacity-100 group-hover:-translate-x-12 top-1/2 absolute flex flex-row-reverse items-center justify-center invisible h-full pr-8 space-x-4 transition-all transform -translate-y-1/2 opacity-0">
        <FiTrash
          className="hover:text-red-700 text-xl text-red-300 transition-colors cursor-pointer"
          onClick={handleDeleteBoard}
        />
      </div>
    </div>
  );
};

export default FeedItem;
