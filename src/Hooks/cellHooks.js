import { useRecoilState } from "recoil";
import { cellsFamily } from "Atoms";
import { CELL_TYPES, initialCellState } from "Utils/constants";

export const useCell = ({ id }) => {
  const [cellData, setCell] = useRecoilState(cellsFamily(id));

  const updateFields = (updatedFields) => {
    setCell((prevState) => ({
      ...prevState,
      ...updatedFields,
    }));
  };

  const clearCell = () => {
    setCell({
      ...initialCellState,
      type: CELL_TYPES.BLANK,
    });
  };

  return { cellData, updateFields, clearCell };
};
