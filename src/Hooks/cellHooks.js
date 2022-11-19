import { useRecoilState } from "recoil";
import { getRecoil, setRecoil } from "recoil-nexus";
import { cellsFamily, tagsFamilySelector, tagsFamily } from "Atoms";
import { CELL_TYPES, initialCellState } from "Utils/constants";
import _ from "lodash";

const syncTagCell = ({ tagId, cellId }) => {
  const prevTagState = getRecoil(tagsFamily(tagId));
  const newTagCellIds = _.clone(_.get(prevTagState, "cellIds", []));
  const cellIdIndex = _.indexOf(newTagCellIds, cellId);
  if (cellIdIndex === -1) {
    newTagCellIds.push(cellId);
  } else {
    newTagCellIds.splice(cellIdIndex, 1);
  }
  const newTagState = {
    ...prevTagState,
    cellIds: newTagCellIds,
  };
  setRecoil(tagsFamily(tagId), newTagState);
};

export const updateCellState = ({ id, ...rest }) => {
  setRecoil(cellsFamily(id), (prevState) => ({
    ...prevState,
    ...rest,
  }));
};
export const useCell = ({ id }) => {
  const [cellData, setCell] = useRecoilState(cellsFamily(id));
  const cellId = id;
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
      const cellTags = prevState.tagIds || [];
      const index = _.indexOf(cellTags, id);
      const newCellTags = _.clone(cellTags);
      if (index == -1) {
        return {
          ...prevState,
          tagIds: [id, ...cellTags],
        };
      } else {
        newCellTags.splice(index, 1);
        return {
          ...prevState,
          tagIds: newCellTags,
        };
      }
    });
    syncTagCell({ tagId: id, cellId });
  };

  return { cellData, tagsData, updateFields, clearCell, toggleTagId };
};
