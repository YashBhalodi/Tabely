import { useRecoilState } from "recoil";
import { appStateAtom, boardFamilySelector } from "Atoms";
import _ from "lodash";

export const useApp = () => {
  const [appState, setAppState] = useRecoilState(appStateAtom);
  const { boardIds } = appState;
  const [boardsData, __] = useRecoilState(boardFamilySelector({ boardIds }));

  const createBoard = () => {
    const newId = _.uniqueId();
    setAppState((prevState) => ({
      ...prevState,
      boardIds: [newId, ...prevState.boardIds],
    }));
    return newId;
  };

  // TODO delete a board

  // TODO get list of board items

  return {
    boardIds,
    boardsData,
    createBoard,
  };
};
