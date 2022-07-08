import { useRecoilState } from "recoil";
import { boardFamily } from "Atoms";

import { BOARD_MODE } from "Utils/constants";
import { getUniqId } from "Utils/helpers";

export const useBoard = ({ id }) => {
  const [boardData, setBoardData] = useRecoilState(boardFamily(id));

  const { title, mode, tableId, tagIds } = boardData;
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

  const createTag = () => {
    const tagId = getUniqId();
    setBoardData((prevState) => {
      return {
        ...prevState,
        tagIds: [...prevState.tagIds, tagId],
      };
    });
    return tagId;
  };

  return {
    mode,
    title,
    tagIds,
    tableId,
    isEditMode,
    toggleBoardMode,
    updateBoard,
    createTag,
  };
};
