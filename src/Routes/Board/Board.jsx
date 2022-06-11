import { useTable } from "Hooks";
import { CellWrapper } from "Components";

import _ from "lodash";

const Board = () => {
  const { allRows, addColumn, addRow, resetTable } = useTable();

  return (
    <>
      <table className="border-separate border-spacing-2">
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
      <div className="h-fit w-fit p-4 bg-red-400" onClick={addColumn}>
        Add Column
      </div>
      <div className="h-fit w-fit p-4 bg-blue-400" onClick={addRow}>
        Add Row
      </div>
      <div className="h-fit w-fit p-4 bg-orange-400" onClick={resetTable}>
        Reset Table
      </div>
    </>
  );
};

export default Board;
