import { useRecoilState, useResetRecoilState } from "recoil";
import { tableAtom, cellsSelector } from "Atoms";
import _ from "lodash";

export const useTable = () => {
  const [allRows, setTableRows] = useRecoilState(tableAtom);
  const resetTableState = useResetRecoilState(tableAtom);
  const [__, updateSelectedCells] = useRecoilState(cellsSelector);

  const getCellIds = (range) => {
    switch (range) {
      case "last-row":
        return _.last(allRows);
        break;
      case "last-column":
        return _.map(allRows, (row) => row[row.length - 1]);
        break;
      case "all":
      default:
        return _.flatten(allRows);
    }
  };

  const getCellIdPosition = (cellId) => {
    const rowArray = _.find(allRows, (row) => _.includes(row, cellId));
    const column = _.indexOf(rowArray, cellId);
    const row = _.indexOf(allRows, rowArray);
    return { row, column };
  };

  // Add a new row "above"/"below" the selected cell row if provided,
  // otherwise add row to the end of the table
  const addRow = ({ cellId, position }) => {
    setTableRows((prevAllRows) => {
      if (_.isEmpty(prevAllRows)) {
        return [[_.uniqueId()]];
      }

      const newAllRows = _.cloneDeep(prevAllRows);

      const newRow = [];
      for (let i = 0; i < newAllRows[0].length; i++) {
        newRow.push(_.uniqueId());
      }

      let splicedInIndex = newAllRows.length;
      if (cellId) {
        const { row } = getCellIdPosition(cellId);
        splicedInIndex = position === "below" ? row + 1 : row;
      }

      newAllRows.splice(splicedInIndex, 0, newRow);
      return newAllRows;
    });
  };

  // Add a new column "left"/"right" the selected cell column if provided,
  // otherwise add column to the end of the table
  const addColumn = ({ cellId, position }) => {
    setTableRows((prevAllRows) => {
      if (_.isEmpty(prevAllRows)) {
        return [[_.uniqueId()]];
      }

      const newAllRows = _.cloneDeep(prevAllRows);

      let splicedInIndex = newAllRows[0].length;
      if (cellId) {
        const { column } = getCellIdPosition(cellId);
        splicedInIndex = position === "left" ? column : column + 1;
      }
      newAllRows.forEach((row) => {
        row.splice(splicedInIndex, 0, _.uniqueId());
      });

      return newAllRows;
    });
  };

  // Delete last colum of the table
  const deleteColumn = () => {
    clearRangeCells("last-column");
    setTableRows((prevAllRows) => {
      const newAllRows = _.cloneDeep(prevAllRows);
      newAllRows.forEach((row) => row.pop());
      return newAllRows;
    });
  };

  const deleteRow = () => {
    clearRangeCells("last-row");
    setTableRows((prevAllRows) => {
      const newAllRows = _.cloneDeep(prevAllRows);
      newAllRows.pop();
      return newAllRows;
    });
  };

  // clear data of range of cells
  const clearRangeCells = (range) => {
    const cellIds = getCellIds(range);
    updateSelectedCells({ action: "reset", targetCells: cellIds });
  };

  // reset table to initial state
  const resetTable = () => {
    clearRangeCells("all");
    resetTableState();
  };

  return {
    allRows,
    addRow,
    addColumn,
    resetTable,
    clearTableData: () => clearRangeCells("all"),
    deleteColumn,
    deleteRow,
  };
};
