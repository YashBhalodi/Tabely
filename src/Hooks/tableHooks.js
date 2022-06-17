import { useRecoilState, useResetRecoilState } from "recoil";
import { tableAtom, cellsSelector } from "Atoms";
import _ from "lodash";

export const useTable = () => {
  const [allRows, setTableRows] = useRecoilState(tableAtom);
  const resetTableState = useResetRecoilState(tableAtom);
  const [__, updateSelectedCells] = useRecoilState(cellsSelector);

  const getCellIdPosition = (cellId) => {
    const rowArray = _.find(allRows, (row) => _.includes(row, cellId));
    const column = _.indexOf(rowArray, cellId);
    const row = _.indexOf(allRows, rowArray);
    return { row, column };
  };

  const getCellEdgePosition = (cellId) => {
    const { row, column } = getCellIdPosition(cellId);
    let edges = [];
    if (row === 0) {
      edges.push("top");
    }
    if (row === allRows.length - 1) {
      edges.push("bottom");
    }
    if (column === 0) {
      edges.push("left");
    }
    if (column === allRows[0].length - 1) {
      edges.push("right");
    }
    return {
      row,
      column,
      edges,
    };
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
  const deleteColumn = ({ column }) => {
    const cellsIds = _.map(allRows, (row) => row[column]);
    clearCells(cellsIds);
    setTableRows((prevAllRows) => {
      const newAllRows = _.cloneDeep(prevAllRows);
      newAllRows.forEach((row) => row.splice(column, 1));

      // if the new table is empty, set correct empty table state
      if (_.isEmpty(_.flatten(newAllRows))) {
        return [[]];
      }

      return newAllRows;
    });
  };

  const deleteRow = ({ row }) => {
    const cellIds = allRows[row];
    clearCells(cellIds);
    setTableRows((prevAllRows) => {
      const newAllRows = _.cloneDeep(prevAllRows);
      newAllRows.splice(row, 1);

      // if the new table is empty, set correct empty table state
      if (_.isEmpty(_.flatten(newAllRows))) {
        return [[]];
      }

      return newAllRows;
    });
  };

  // clear data of range of cells
  const clearCells = (cellIds) => {
    updateSelectedCells({ action: "reset", targetCells: cellIds });
  };

  // reset table to initial state
  const resetTable = () => {
    clearTableData();
    resetTableState();
  };

  const clearTableData = () => {
    clearCells(_.flatten(allRows));
  };

  return {
    allRows,
    addRow,
    addColumn,
    resetTable,
    clearTableData,
    deleteColumn,
    deleteRow,
    getCellEdgePosition,
  };
};
