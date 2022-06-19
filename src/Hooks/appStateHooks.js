import { useRecoilState } from "recoil";
import { appStateAtom, boardFamilySelector } from "Atoms";
import _ from "lodash";

export const useApp = () => {
  const [appState, setAppState] = useRecoilState(appStateAtom);
  const { boardIds } = appState;
  const [boardsData, setBoardData] = useRecoilState(
    boardFamilySelector({ boardIds })
  );

  const createBoard = () => {
    const newBoardId = _.uniqueId();
    setAppState((prevState) => ({
      ...prevState,
      boardIds: [newBoardId, ...prevState.boardIds],
    }));
    setBoardData({ action: "initialize_board", newBoardId });
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
