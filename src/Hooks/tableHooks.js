import { useRecoilState, useResetRecoilState } from "recoil";
import { tableAtom, cellsSelector } from "Atoms";
import _ from "lodash";

const getColumnBasedLayout = (allRows) => {
  const result = [];
  for (let i = 0; i < allRows[0].length; i++) {
    const currentColumn = [];
    allRows.forEach((row) => currentColumn.push(row[i]));
    result.push(currentColumn);
  }
  return result;
};

const getRowBasedLayout = (allColumns) => {
  const result = [];
  for (let i = 0; i < allColumns[0].length; i++) {
    const currentRow = [];
    allColumns.forEach((column) => currentRow.push(column[i]));
    result.push(currentRow);
  }
  return result;
};

const getCellIdPosition = ({ layout, cellId }) => {
  const rowArray = _.find(layout, (row) => _.includes(row, cellId));
  const column = _.indexOf(rowArray, cellId);
  const row = _.indexOf(layout, rowArray);
  return { row, column };
};

const getCellRelocatedLayout = ({
  initialLayout,
  cellId,
  targetCellId,
  direction = "above",
}) => {
  const columnLayout = getColumnBasedLayout(initialLayout);
  const { row, column } = getCellIdPosition({ layout: columnLayout, cellId });
  const { row: targetRow, column: targetColumn } = getCellIdPosition({
    layout: columnLayout,
    cellId: targetCellId,
  });

  if (targetRow === row) {
    // same column relocation
    // no need to add new row to table
    const indexOfCellId = columnLayout[row].indexOf(cellId);
    columnLayout[targetRow].splice(indexOfCellId, 1);
    const indexOfTargetCellId = columnLayout[row].indexOf(targetCellId);
    const splicedInIndex =
      direction === "above" ? indexOfTargetCellId : indexOfTargetCellId + 1;
    columnLayout[targetRow].splice(splicedInIndex, 0, cellId);
    const rowLayout = getRowBasedLayout(columnLayout);
    return rowLayout;
  } else {
    const indexOfCellId = columnLayout[row].indexOf(cellId);
    columnLayout[row].splice(indexOfCellId, 1);
    const indexOfTargetCellId = columnLayout[targetRow].indexOf(targetCellId);
    const splicedInIndex =
      direction === "above" ? indexOfTargetCellId : indexOfTargetCellId + 1;
    columnLayout[targetRow].splice(splicedInIndex, 0, cellId);

    columnLayout.forEach((column, index) => {
      if (index !== targetRow) {
        if (index === row) {
          column.push(_.uniqueId(), _.uniqueId());
        } else {
          column.push(_.uniqueId());
        }
      }
    });
    const rowLayout = getRowBasedLayout(columnLayout);
    return rowLayout;
  }
};

export const useTable = () => {
  const [allRows, setTableRows] = useRecoilState(tableAtom);
  const resetTableState = useResetRecoilState(tableAtom);
  const [__, updateSelectedCells] = useRecoilState(cellsSelector);

  const getCellEdgePosition = (cellId) => {
    const { row, column } = getCellIdPosition({ layout: allRows, cellId });
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
        const { row } = getCellIdPosition({ layout: prevAllRows, cellId });
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
        const { column } = getCellIdPosition({ layout: prevAllRows, cellId });
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

  const swapCells = (cellId1, cellId2) => {
    setTableRows((prevAllRows) => {
      const { row: row1, column: column1 } = getCellIdPosition({
        layout: prevAllRows,
        cellId: cellId1,
      });
      const { row: row2, column: column2 } = getCellIdPosition({
        layout: prevAllRows,
        cellId: cellId2,
      });
      const newAllRows = _.cloneDeep(prevAllRows);
      const temp = newAllRows[row1][column1];
      newAllRows[row1][column1] = newAllRows[row2][column2];
      newAllRows[row2][column2] = temp;
      return newAllRows;
    });
  };

  const relocateCell = ({ cellId, targetCellId, direction = "above" }) => {
    setTableRows((prevAllRows) => {
      const updatedLayout = getCellRelocatedLayout({
        initialLayout: prevAllRows,
        cellId,
        targetCellId,
        direction,
      });
      return updatedLayout;
    });
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
    swapCells,
    relocateCell,
  };
};
