import { useRecoilState } from "recoil";

import { tagsFamily } from "Atoms";

export const useTag = ({ id }) => {
  const [tagState, updateTagState] = useRecoilState(tagsFamily(id));

  return {
    data: tagState,
    updateTagState,
  };
};
