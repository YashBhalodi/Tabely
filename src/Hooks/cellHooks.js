import { useRecoilState } from "recoil";
import { cellsFamily } from "Atoms";
import { CELL_TYPES, initialCellState } from "Utils/constants";
import _ from "lodash";

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

  const toggleTagId = ({ id }) => {
    setCell((prevState) => {
      const cellTags = prevState.tagIds;
      const index = _.indexOf(cellTags, id);
      const newCellTags = _.clone(cellTags);
      if (index == -1) {
        newCellTags.push(id);
        return {
          ...prevState,
          tagIds: newCellTags,
        };
      } else {
        newCellTags.splice(index, 1);
        return {
          ...prevState,
          tagIds: newCellTags,
        };
      }
    });
  };

  return { cellData, updateFields, clearCell, toggleTagId };
};
