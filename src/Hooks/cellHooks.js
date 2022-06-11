import { useRecoilState } from "recoil";
import { cellsFamily } from "Atoms";

export const useCell = ({ id }) => {
  const [cellData, setCell] = useRecoilState(cellsFamily(id));

  const updateFields = (updatedFields) => {
    setCell((prevState) => ({
      ...prevState,
      ...updatedFields,
    }));
  };

  return { cellData, updateFields };
};
