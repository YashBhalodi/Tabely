import React from "react";
import { useParams } from "react-router-dom";
import { useTable, useBoard } from "Hooks";
import { Button } from "Components";
import { BoardTable, TopHeader } from "./Components";

import _ from "lodash";

const BoardTableEmptyState = () => {
  const { boardId } = useParams();
  const { tableId } = useBoard({ id: boardId });
  const { resetTable } = useTable({ id: tableId });
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
      <Button onClick={resetTable}>Add Table</Button>
    </div>
  );
};

const Board = () => {
  const { boardId } = useParams();
  const { tableId } = useBoard({ id: boardId });
  const { allRows } = useTable({ id: tableId });
  const isTableEmpty = _.isEmpty(_.flatten(allRows));

  return (
    <>
      <div className="flex flex-col items-start justify-center flex-1 overflow-hidden">
        <TopHeader />
        <div className="bg-slate-100 scrollbar flex w-full h-full overflow-auto">
          {!isTableEmpty ? <BoardTable /> : <BoardTableEmptyState />}
        </div>
      </div>
    </>
  );
};

export default Board;
