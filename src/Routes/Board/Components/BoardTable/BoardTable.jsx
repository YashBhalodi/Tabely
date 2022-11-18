import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useTable, useBoard } from "Hooks";
import { CellWrapper } from "Components";
import { focusCellId } from "Utils/keyboardInteractionUtils";
import _ from "lodash";

const BoardTable = (props) => {
  const { boardId } = useParams();
  const { tableId } = useBoard({ id: boardId });
  const { allRows, getNeighboringCells } = useTable({ id: tableId });

  const [searchParams, setSearchParams] = useSearchParams();
  const targetCellId = searchParams.get("cell");

  useEffect(() => {
    if (targetCellId) {
      setTimeout(() => {
        focusCellId(targetCellId);
        searchParams.delete("cell");
        setSearchParams(searchParams);
      }, 10);
    }
  }, [targetCellId]);

  return (
    <table className="h-fit w-fit border-spacing-3 p-12 border-separate table-auto">
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
  );
};

export default BoardTable;
