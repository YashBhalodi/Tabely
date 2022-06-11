import { useTable } from "Hooks";
import { CellWrapper } from "Components";

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
      <div className="flex flex-1 flex-col justify-center items-start overflow-hidden">
        <div className="flex h-full w-full overflow-auto bg-slate-100 scrollbar">
          <table className="table-auto h-fit w-fit border-separate border-spacing-3">
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
        <div className="flex flex-row space-x-2 w-full justify-center p-2">
          <div
            className="p-4 bg-red-400 w-36 m-0 rounded-md flex-1"
            onClick={addColumn}
          >
            Add Column
          </div>
          <div
            className="p-4 bg-blue-400 w-36 m-0 rounded-md flex-1"
            onClick={addRow}
          >
            Add Row
          </div>
          <div
            className="p-4 bg-orange-400 w-36 rounded-md flex-1"
            onClick={resetTable}
          >
            Reset Table
          </div>
          <div
            className="p-4 bg-red-400 w-36 rounded-md flex-1"
            onClick={deleteColumn}
          >
            Delete Column
          </div>
          <div
            className="p-4 bg-blue-400 w-36 rounded-md flex-1"
            onClick={deleteRow}
          >
            Delete Row
          </div>
          <div
            className="p-4 bg-orange-400 w-36 rounded-md flex-1"
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
