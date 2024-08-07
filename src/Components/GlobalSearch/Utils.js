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

export const getActions = ({ navigate, createBoard, deleteBoard }) => {
  const { boardIds = [] } = getRecoil(appStateAtom);
  const boardData = getRecoil(boardFamilySelector({ boardIds }));
  const parsedAction = [];

  const appActions = [
    {
      id: "VIEW_BOARDS",
      name: "View all boards",
      keywords: ["View", "board", "home"],
      perform: () => {
        navigate(`/`);
      },
      section: "Application actions...",
      type: "ACTION",
    },
    {
      id: "CREATE_BOARD",
      name: "Create a new board",
      keywords: ["Create", "board", "new"],
      perform: () => {
        const boardId = createBoard();
        setTimeout(() => {
          navigate(`/${boardId}`);
        }, 10);
      },
      section: "Application actions...",
      type: "ACTION",
    },
  ];

  parsedAction.push(...appActions);

  // add boards to actions
  _.forEach(boardData, (b) => {
    const actionObjects = [
      {
        id: `BOARD_${b.id}`,
        name: b.title,
        keywords: b.title,
        section: "Boards...",
        type: "ACTION",
      },
      {
        id: `BOARD_${b.id}_NAVIGATE`,
        name: `Navigate to ${b.title}`,
        keywords: b.title,
        perform: () => {
          const targetRoute = `/${b.id}`;
          navigate(targetRoute);
        },
        parent: `BOARD_${b.id}`,
        type: "BOARD",
      },
      {
        id: `BOARD_${b.id}_DELETE`,
        name: `Delete ${b.title}`,
        keywords: b.title,
        perform: () => {
          deleteBoard({ id: b.id });
          navigate("/");
        },
        parent: `BOARD_${b.id}`,
        type: "ACTION",
        actionType: "DELETE",
      },
    ];
    if (b.title) {
      parsedAction.push(...actionObjects);
    }
  });

  // add cells of each boards to board sections actions
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
          const targetRoute = `/${b.id}?cell=${cellData.id}`;
          navigate(targetRoute);
        },
        section: b.title,
        theme: cellData.colorTheme,
        type: "CELL",
      };
      return actionObject;
    });
    parsedAction.push(...boardCellsActions);
  });

  return _.filter(parsedAction, (action) => Boolean(action.name));
};
