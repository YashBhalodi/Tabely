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

export const getActions = () => {
  const { boardIds = [] } = getRecoil(appStateAtom);
  const boardData = getRecoil(boardFamilySelector({ boardIds }));
  const parsedAction = [];
  _.forEach(boardData, (b) => {
    const actionObject = {
      id: `BOARD_${b.id}`,
      name: b.title,
      keywords: b.title,
      perform: () => {
        window.location.pathname = `boards/${b.id}`;
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
          window.location.href = `/boards/${b.id}?cell=${cellData.id}`;
        },
        section: b.title,
      };
      return actionObject;
    });
    parsedAction.push(...boardCellsActions);
  });
  return parsedAction;
};
