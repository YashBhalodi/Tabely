import _ from "lodash";

export const getUniqId = () => {
  // TODO ID delivery mechanism is fundamentally flawed to make it compatible with localStorage persistence with recoil persist
  return _.uniqueId();
};
