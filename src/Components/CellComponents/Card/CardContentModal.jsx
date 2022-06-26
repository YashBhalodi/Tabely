import React from "react";
import { UIModal } from "Components";
import { useCell, useBoard } from "Hooks";

import { COLOR_THEME } from "Utils/colors";
import { FiMinimize2 } from "react-icons/fi";

const CardContentModal = (props) => {
  const { isModalOpen, closeModal, cellId } = props;
  const { cellData, updateFields } = useCell({ id: cellId });
  const { title = "", content = "", colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  return (
    <UIModal isOpen={isModalOpen} onRequestClose={closeModal}>
      <div
        className={`relative w-modal h-modal py-8 px-6 border-4 shadow-md rounded-lg flex flex-col space-y-4 ${themeItem.lightBgBorderColor} ${themeItem.lightBgColor}`}
      >
        <div
          className={`absolute top-1 right-1 ${themeItem.lightBgColor} mix-blend-multiply hover:p-1.5 p-1 transition-all rounded-md cursor-pointer`}
          onClick={closeModal}
        >
          <FiMinimize2 className={`${themeItem.darkTextColor} text-xl`} />
        </div>
        <div
          className={`${themeItem.darkTextColor} text-xl font-medium break-words`}
        >
          {title}
        </div>
        <div
          className={`flex flex-1 p-4 rounded-md text-lg font-medium leading-8 ${themeItem.lightBgColor} ${themeItem.darkTextColor} mix-blend-multiply overflow-y-scroll ${themeItem.scrollbar}`}
        >
          {content || "asavsdas dasudgauisdgas dasdugasudasdvasyuv".repeat(10)}
        </div>
      </div>
    </UIModal>
  );
};

export default CardContentModal;
