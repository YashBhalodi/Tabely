import { useTable } from "Hooks";
import { CellWrapper } from "Components";
import _ from "lodash";

const BoardTable = (props) => {
  const { allRows } = useTable();
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
