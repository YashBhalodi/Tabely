import { useRecoilState, useResetRecoilState } from "recoil";
import { tableAtom, cellsSelector } from "Atoms";
import _ from "lodash";

export const useTable = () => {
  const [allRows, setTableRows] = useRecoilState(tableAtom);
  const resetTableState = useResetRecoilState(tableAtom);
  const [__, updateSelectedCells] = useRecoilState(cellsSelector);

  const getCellIds = () => {
    const allCellIds = _.flatten(allRows);
    return allCellIds;
  };

  // Add a new row to the table at the end of the table
  const addRow = () => {
    setTableRows((prevAllRows) => {
      const newAllRows = _.cloneDeep(prevAllRows);
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
      const newAllRows = _.cloneDeep(prevAllRows);
      newAllRows.forEach((row) => row.push(_.uniqueId()));
      return newAllRows;
    });
  };

  // clear table data keeping the table layout intact
  const clearTableData = () => {
    const cellIds = getCellIds();
    updateSelectedCells({ action: "reset", targetCells: cellIds });
  };

  // reset table to initial state
  const resetTable = () => {
    clearTableData();
    resetTableState();
  };

  return {
    allRows,
    addRow,
    addColumn,
    resetTable,
    clearTableData,
  };
};
