import { useRecoilState, useRecoilValue } from "recoil";
import { appStateAtom, boardFamilySelector } from "Atoms";
import { getUniqId } from "Utils/helpers";
import _ from "lodash";

export const useApp = () => {
  const [appState, setAppState] = useRecoilState(appStateAtom);
  const { boardIds } = appState;
  const [boardsData, updateBoardFamilyState] = useRecoilState(
    boardFamilySelector({ boardIds })
  );

  const createBoard = () => {
    const newBoardId = getUniqId();
    setAppState((prevState) => ({
      ...prevState,
      boardIds: [newBoardId, ...prevState.boardIds],
    }));
    return newBoardId;
  };

  const deleteBoard = ({ id }) => {
    setAppState((prevState) => {
      const newAppState = _.cloneDeep(prevState);
      const deletedBoardIndex = newAppState.boardIds.indexOf(id);
      newAppState.boardIds.splice(deletedBoardIndex, 1);
      return newAppState;
    });
    updateBoardFamilyState({ action: "delete", boardIds: [id] });
  };

  return {
    boardIds,
    boardsData,
    createBoard,
    deleteBoard,
  };
};
