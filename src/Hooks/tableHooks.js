import { useRecoilState } from "recoil";
import { tableAtom } from "Atoms";
import { initialTableState } from "Utils/constants";
import _ from "lodash";

export const useTable = () => {
  const [allRows, setTableRows] = useRecoilState(tableAtom);

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
    setTableRows(initialTableState);
    // TODO clear cellsFamily as well
  };

  // TODO clear table data keeping the table layout intact

  return {
    allRows,
    addRow,
    addColumn,
    resetTable,
  };
};
