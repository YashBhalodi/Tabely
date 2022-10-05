import { getRecoil } from "recoil-nexus";
import {
  cellsFamily,
  tagsFamilySelector,
  tagsFamily,
  appStateAtom,
  boardFamilySelector,
  tableFamily,
} from "Atoms";
import _ from "lodash";

export const getActions = ({ navigate }) => {
  const { boardIds = [] } = getRecoil(appStateAtom);
  const boardData = getRecoil(boardFamilySelector({ boardIds }));
  const parsedAction = [];
  _.forEach(boardData, (b) => {
    const actionObject = {
      id: `BOARD_${b.id}`,
      name: b.title,
      keywords: b.title,
      perform: () => {
        const targetRoute = `/boards/${b.id}`;
        navigate(targetRoute);
      },
      section: "Boards",
    };
    parsedAction.push(actionObject);
  });

  _.forEach(boardData, (b) => {
    const boardCellsId = _.flatten(getRecoil(tableFamily(b.tableId)));
    const boardCellsData = _.map(boardCellsId, (cellId) => ({
      id: cellId,
      ...getRecoil(cellsFamily(cellId)),
    }));
    const boardCellsActions = _.map(boardCellsData, (cellData) => {
      const actionObject = {
        id: `CELL_${cellData.id}`,
        name: cellData.title || cellData.subtitle,
        keywords: cellData.title || cellData.subtitle,
        perform: () => {
          const targetRoute = `/boards/${b.id}?cell=${cellData.id}`;
          navigate(targetRoute);
        },
        section: b.title,
      };
      return actionObject;
    });
    parsedAction.push(...boardCellsActions);
  });
  return _.filter(parsedAction, (action) => Boolean(action.name));
};
