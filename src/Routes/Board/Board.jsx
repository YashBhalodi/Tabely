import { useTable } from "Hooks";
import { CellWrapper, BoardTopHeader } from "Components";

import _ from "lodash";

const Board = () => {
  const { allRows } = useTable();

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
      </div>
    </>
  );
};

export default Board;
