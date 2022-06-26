import React from "react";
import { UIModal } from "Components";
import { useCell, useBoard } from "Hooks";

import { COLOR_THEME } from "Utils/colors";

const CardContentModal = (props) => {
  const { isModalOpen, closeModal, cellId } = props;
  const { cellData, updateFields } = useCell({ id: cellId });
  const { title = "", content = "", colorTheme } = cellData;

  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  return <UIModal isOpen={isModalOpen} onRequestClose={closeModal}></UIModal>;
};

export default CardContentModal;
