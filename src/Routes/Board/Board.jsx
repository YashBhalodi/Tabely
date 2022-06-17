import { useTable } from "Hooks";
import { BoardTopHeader, BoardTable } from "Components";

import _ from "lodash";

const BoardTableEmptyState = () => {
  const { resetTable } = useTable();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
      <div className="font-regular text-2xl text-blue-900">
        Start organizing your thoughts with table
      </div>
      <div
        className="text-blue-50 tex-2xl hover:bg-blue-600 hover:scale-110 shadow-blue-500 px-6 py-2 font-medium transition-all bg-blue-500 rounded-lg shadow-sm cursor-pointer"
        onClick={resetTable}
      >
        Create Table
      </div>
    </div>
  );
};

const Board = () => {
  const { allRows } = useTable();
  const isTableEmpty = _.isEmpty(_.flatten(allRows));

  return (
    <>
      <div className="flex flex-col items-start justify-center flex-1 overflow-hidden">
        <BoardTopHeader />
        <div className="bg-slate-100 scrollbar flex w-full h-full overflow-auto">
          {!isTableEmpty ? <BoardTable /> : <BoardTableEmptyState />}
        </div>
      </div>
    </>
  );
};

export default Board;
