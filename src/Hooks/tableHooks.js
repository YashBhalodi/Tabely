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

  // Add a new row to the table at the end of the table
  const addRow = () => {
    setTableRows((prevAllRows) => {
      const newAllRows = _.isEmpty(prevAllRows)
        ? [[]]
        : _.cloneDeep(prevAllRows);

      const newRow = [];
      for (let i = 0; i < newAllRows[0].length; i++) {
        newRow.push(_.uniqueId());
      }
      newAllRows.push(newRow);
      return newAllRows;
    });
  };

  // Add a new column to the table at the end of the table
  const addColumn = () => {
    setTableRows((prevAllRows) => {
      const newAllRows = _.isEmpty(prevAllRows)
        ? [[]]
        : _.cloneDeep(prevAllRows);

      newAllRows.forEach((row) => row.push(_.uniqueId()));
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
