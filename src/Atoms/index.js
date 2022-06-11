import { atom, selectorFamily } from "recoil";
import { setRecoil } from "recoil-nexus";

export const tableData = atom({
  key: "tableData",
  default: [[]],
});

export const cellData = atom({
  key: "cellData",
  default: {},
});

export const cellDataSelector = selectorFamily({
  key: "cellDataSelector",
  get:
    (id) =>
    ({ get }) => {
      const allCellData = get(cellData);
      if (allCellData[id] !== undefined) {
        return allCellData[id];
      }

      setRecoil(cellData, (prevState) => ({
        ...prevState,
        [id]: { type: "IDLE" },
      }));

      return get(cellData)[id];
    },
});
