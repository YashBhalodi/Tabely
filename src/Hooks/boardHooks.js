import { useRecoilState } from "recoil";
import { boardFamily } from "Atoms";

import { BOARD_MODE } from "Utils/constants";

export const useBoard = ({ id }) => {
  const [boardData, setBoardData] = useRecoilState(boardFamily(id));
  const { title, tableId } = boardData;
  const isEditMode = boardData.mode === BOARD_MODE.EDIT;

  const toggleBoardMode = () => {
    setBoardData((prevState) => ({
      ...prevState,
      mode: isEditMode ? BOARD_MODE.VIEW : BOARD_MODE.EDIT,
    }));
  };

  const updateBoard = (newBoardData) => {
    setBoardData((prevState) => ({
      ...prevState,
      ...newBoardData,
    }));
  };

  return {
    isEditMode,
    title,
    toggleBoardMode,
    updateBoard,
    tableId,
  };
};
