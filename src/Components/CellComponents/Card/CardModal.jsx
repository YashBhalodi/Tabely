import React from "react";

import { UIModal } from "Components";
import { useCell } from "Hooks";

import { COLOR_THEME } from "Utils/colors";
import { FiMinimize2 } from "react-icons/fi";

import TitleComponent from "./CardModalTitle";
import ContentComponent from "./CardModalContent";
import SidePanelComponent from "./CardModalSidePanel";
import { useKey } from "react-use";

const CardContentModal = (props) => {
  const { isModalOpen, closeModal, cellId } = props;
  const { cellData } = useCell({ id: cellId });
  const { colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  useKey("Esc", closeModal, {}, []);

  return (
    <UIModal isOpen={isModalOpen} onRequestClose={closeModal}>
      <div
        className={`relative w-modal h-modal py-8 px-6 border-4 shadow-md rounded-lg flex flex-col space-y-4 ${themeItem.lightBgBorderColor} ${themeItem.lightBgColor}`}
      >
        <div
          className={`absolute top-1 right-1 hover:p-1.5 p-1 transition-all rounded-md cursor-pointer ${themeItem.lightBgColor} mix-blend-multiply`}
          onClick={closeModal}
        >
          <FiMinimize2 className={`${themeItem.darkTextColor} text-xl`} />
        </div>

        <TitleComponent cellId={cellId} />

        <div className="flex flex-row items-stretch justify-start h-full space-x-4 overflow-hidden">
          <ContentComponent cellId={cellId} />
          <SidePanelComponent cellId={cellId} />
        </div>
      </div>
    </UIModal>
  );
};

export default CardContentModal;
