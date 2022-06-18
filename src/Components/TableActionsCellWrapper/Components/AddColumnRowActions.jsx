import React from "react";
import { AddButtonBar } from "Components";

const AddColumnRowActions = (props) => {
  const { onClickAction } = props;

  const commonClass = `group-hover:visible hover:opacity-100 absolute invisible transition-all opacity-50 cursor-pointer z-10`;
  const horizontalCommonClass = `inset-x-0`;
  const verticalCommonClass = `inset-y-0`;

  return (
    <>
      <div
        className={`${commonClass} ${horizontalCommonClass} -top-2 group-hover:-top-3.5`}
      >
        <AddButtonBar
          isHorizontal={true}
          onClick={() => onClickAction("add_top")}
        />
      </div>
      <div
        className={`${commonClass} ${horizontalCommonClass} -bottom-2 group-hover:-bottom-3.5`}
      >
        <AddButtonBar
          isHorizontal={true}
          onClick={() => onClickAction("add_bottom")}
        />
      </div>
      <div
        className={`${commonClass} ${verticalCommonClass} -left-2 group-hover:-left-3.5`}
      >
        <AddButtonBar
          isHorizontal={false}
          onClick={() => onClickAction("add_left")}
        />
      </div>
      <div
        className={`${commonClass} ${verticalCommonClass} -right-2 group-hover:-right-3.5`}
      >
        <AddButtonBar
          isHorizontal={false}
          onClick={() => onClickAction("add_right")}
        />
      </div>
    </>
  );
};
export default AddColumnRowActions;
