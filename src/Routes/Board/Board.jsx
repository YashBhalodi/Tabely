import { useRecoilState } from "recoil";

import { tableData as tableDataAtom } from "@/Atoms";

import _ from "lodash";

const Board = () => {
  const [tableData, setTableData] = useRecoilState(tableDataAtom);

  const addColumn = () => {
    setTableData((prevTableData) => {
      const newTableData = _.cloneDeep(prevTableData);
      newTableData.forEach((row) => row.push(_.uniqueId()));
      return newTableData;
    });
  };

  const addRow = () => {
    setTableData((prevTableData) => {
      const newTableData = _.cloneDeep(prevTableData);
      const newRow = [];
      for (let i = 0; i < newTableData[0].length; i++) {
        newRow.push(_.uniqueId());
      }
      newTableData.push(newRow);
      return newTableData;
    });
  };

  return (
    <>
      <table className="border-separate border-spacing-2">
        {_.map(tableData, (row) => {
          return (
            <tr>
              {_.map(row, (cellId) => {
                return <td>{cellId}</td>;
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
