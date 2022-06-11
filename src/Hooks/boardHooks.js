import { useRecoilState } from "recoil";
import { boardAtom } from "Atoms";

import { BOARD_MODE } from "Utils/constants";

export const useBoard = () => {
  const [boardData, setBoardData] = useRecoilState(boardAtom);
  const { title } = boardData;
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
  };
};
