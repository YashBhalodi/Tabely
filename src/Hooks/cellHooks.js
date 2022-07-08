import { useRecoilState } from "recoil";
import { cellsFamily, tagsFamilySelector } from "Atoms";
import { CELL_TYPES, initialCellState } from "Utils/constants";
import _ from "lodash";

export const useCell = ({ id }) => {
  const [cellData, setCell] = useRecoilState(cellsFamily(id));
  const { tagIds } = cellData;
  const [tagsData, __] = useRecoilState(tagsFamilySelector({ ids: tagIds }));

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

  return { cellData, tagsData, updateFields, clearCell, toggleTagId };
};
