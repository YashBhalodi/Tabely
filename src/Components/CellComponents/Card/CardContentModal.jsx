import React from "react";
import { UIModal } from "Components";
import { useCell, useBoard } from "Hooks";

const CardContentModal = (props) => {
  const { isModalOpen, closeModal, cellId } = props;
  const { cellData, updateFields } = useCell({ id: cellId });

  return <UIModal isOpen={isModalOpen} onRequestClose={closeModal}></UIModal>;
};

export default CardContentModal;
