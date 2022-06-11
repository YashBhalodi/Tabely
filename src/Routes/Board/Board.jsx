import { useTable } from "Hooks";
import { CellWrapper, BoardTopHeader } from "Components";

import _ from "lodash";

const Board = () => {
  const {
    allRows,
    addColumn,
    addRow,
    resetTable,
    clearTableData,
    deleteColumn,
    deleteRow,
  } = useTable();

  return (
    <>
      <div className="flex flex-col items-start justify-center flex-1 overflow-hidden">
        <BoardTopHeader />
        <div className="bg-slate-100 scrollbar flex w-full h-full overflow-auto">
          <table className="h-fit w-fit border-spacing-3 border-separate table-auto">
            <tbody>
              {_.map(allRows, (row, index) => {
                // TODO better way to assign key to each row
                const rowId = row.join("");

                return (
                  <tr key={rowId}>
                    {_.map(row, (cellId) => {
                      return <CellWrapper cellId={cellId} key={cellId} />;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-center w-full p-2 space-x-2">
          <div
            className="w-36 flex-1 p-4 m-0 bg-red-400 rounded-md"
            onClick={addColumn}
          >
            Add Column
          </div>
          <div
            className="w-36 flex-1 p-4 m-0 bg-blue-400 rounded-md"
            onClick={addRow}
          >
            Add Row
          </div>
          <div
            className="w-36 flex-1 p-4 bg-orange-400 rounded-md"
            onClick={resetTable}
          >
            Reset Table
          </div>
          <div
            className="w-36 flex-1 p-4 bg-red-400 rounded-md"
            onClick={deleteColumn}
          >
            Delete Column
          </div>
          <div
            className="w-36 flex-1 p-4 bg-blue-400 rounded-md"
            onClick={deleteRow}
          >
            Delete Row
          </div>
          <div
            className="w-36 flex-1 p-4 bg-orange-400 rounded-md"
            onClick={clearTableData}
          >
            Clear Table
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
