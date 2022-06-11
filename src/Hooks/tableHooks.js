import { useRecoilState, useResetRecoilState } from "recoil";
import { tableAtom } from "Atoms";
import _ from "lodash";

export const useTable = () => {
  const [allRows, setTableRows] = useRecoilState(tableAtom);
  const resetTableState = useResetRecoilState(tableAtom);

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

  // reset table to initial state
  const resetTable = () => {
    // TODO clear cellsFamily as well
    const cellIds = getAllCellIds();
    console.debug(cellIds);
    resetTableState();
  };

  const getAllCellIds = () => {
    const allCellIds = _.flatten(allRows);
    return allCellIds;
  };

  // TODO clear table data keeping the table layout intact

  return {
    allRows,
    addRow,
    addColumn,
    resetTable,
  };
};
