import { useRecoilState } from "recoil";
import { cellsFamily } from "Atoms";
import { initialCellState } from "Utils/constants";

export const useCell = ({ id }) => {
  const [cellData, setCell] = useRecoilState(cellsFamily(id));

  const updateFields = (updatedFields) => {
    setCell((prevState) => ({
      ...prevState,
      ...updatedFields,
    }));
  };

  const clearCell = () => {
    setCell(initialCellState);
  };

  return { cellData, updateFields, clearCell };
};
