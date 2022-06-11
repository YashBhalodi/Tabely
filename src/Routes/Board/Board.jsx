import { useRecoilState } from "recoil";

import { tableAtom } from "Atoms";
import { CellWrapper } from "Components";

import _ from "lodash";

const Board = () => {
  const [allRows, setTableData] = useRecoilState(tableAtom);

  const addColumn = () => {
    setTableData((prevAllRows) => {
      const newAllRows = _.cloneDeep(prevAllRows);
      newAllRows.forEach((row) => row.push(_.uniqueId()));
      return newAllRows;
    });
  };

  const addRow = () => {
    setTableData((prevAllRows) => {
      const newAllRows = _.cloneDeep(prevAllRows);
      const newRow = [];
      for (let i = 0; i < newAllRows[0].length; i++) {
        newRow.push(_.uniqueId());
      }
      newAllRows.push(newRow);
      return newAllRows;
    });
  };

  return (
    <>
      <table className="border-separate border-spacing-2">
        {_.map(allRows, (row) => {
          return (
            <tr>
              {_.map(row, (cellId) => {
                return <CellWrapper cellId={cellId} />;
              })}
            </tr>
          );
        })}
      </table>
      <div className="h-fit w-fit p-4 bg-red-400" onClick={addColumn}>
        Add Column
      </div>
      <div className="h-fit w-fit p-4 bg-blue-400" onClick={addRow}>
        Add Row
      </div>
    </>
  );
};

export default Board;
