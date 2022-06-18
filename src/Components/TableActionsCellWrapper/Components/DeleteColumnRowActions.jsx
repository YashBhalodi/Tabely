import React from "react";

import { FiTrash } from "react-icons/fi";

const DeleteButton = (props) => {
  const { onClick } = props;
  return (
    <div
      className="hover:bg-red-100 bg-red-50 flex items-center justify-center p-2 rounded-md cursor-pointer"
      onClick={onClick}
    >
      <FiTrash className="text-sm text-red-400 transition-all" />
    </div>
  );
};

const DeleteColumRowActions = (props) => {
  const { cellEdges, onClickAction } = props;

  const containerCommonClass = `group-hover:visible group-hover:opacity-100 absolute flex invisible transition-all opacity-0`;
  const verticalCommonClass = `inset-x-0 h-16 flex-row justify-center`;
  const horizontalCommonClass = `inset-y-0 w-16 flex-col justify-center`;
  return (
    <>
      {cellEdges.includes("top") && (
        <div
          className={`${containerCommonClass} ${verticalCommonClass} -top-2 group-hover:-top-12 items-start`}
        >
          <DeleteButton onClick={() => onClickAction("delete_column")} />
        </div>
      )}
      {cellEdges.includes("left") && (
        <div
          className={`${containerCommonClass} ${horizontalCommonClass} -left-2 group-hover:-left-12 items-start`}
        >
          <DeleteButton onClick={() => onClickAction("delete_row")} />
        </div>
      )}
      {cellEdges.includes("bottom") && (
        <div
          className={`${containerCommonClass} ${verticalCommonClass} -bottom-2 group-hover:-bottom-12 items-end`}
        >
          <DeleteButton onClick={() => onClickAction("delete_column")} />
        </div>
      )}
      {cellEdges.includes("right") && (
        <div
          className={`${containerCommonClass} ${horizontalCommonClass} -right-2 group-hover:-right-12 items-end`}
        >
          <DeleteButton onClick={() => onClickAction("delete_row")} />
        </div>
      )}
    </>
  );
};

export default DeleteColumRowActions;
