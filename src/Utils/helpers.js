import _ from "lodash";
import ShortUniqueId from "short-unique-id";
const uid = new ShortUniqueId({ length: 6 });

export const getUniqId = () => {
  // IMPORTANT any changes in ID delivery mechanism should be accompanied by a mechanism to migrate existing user's data
  return uid();
};
