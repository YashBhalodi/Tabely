import { useRecoilState, useRecoilValue } from "recoil";
import { appStateAtom, boardFamilySelector } from "Atoms";
import { getUniqId } from "Utils/helpers";
import _ from "lodash";

export const useApp = () => {
  const [appState, setAppState] = useRecoilState(appStateAtom);
  const { boardIds } = appState;
  const boardsData = useRecoilValue(boardFamilySelector({ boardIds }));

  const createBoard = () => {
    const newBoardId = getUniqId();
    setAppState((prevState) => ({
      ...prevState,
      boardIds: [newBoardId, ...prevState.boardIds],
    }));
    return newBoardId;
  };

  // TODO delete a board

  // TODO get list of board items

  return {
    boardIds,
    boardsData,
    createBoard,
  };
};
