import { useRecoilState } from "recoil";

import { tagsFamily } from "Atoms";

export const useTag = ({ id }) => {
  const [tagState, updateTagState] = useRecoilState(tagsFamily(id));

  const updateTag = (updatedState) => {
    updateTagState((prevState) => ({
      ...prevState,
      ...updatedState,
    }));
  };

  return {
    data: tagState,
    updateTag,
  };
};
