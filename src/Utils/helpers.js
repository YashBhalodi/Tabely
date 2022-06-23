import _ from "lodash";
import ShortUniqueId from "short-unique-id";
const uid = new ShortUniqueId({ length: 6 });

export const getUniqId = () => {
  return uid();
};
