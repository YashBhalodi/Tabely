import React from "react";
import { DropDownMenu } from "Components";
import { TbExchange } from "react-icons/tb";

import { useCell } from "Hooks";
import { CELL_TYPES } from "Utils/constants";
import { COLOR_THEME } from "Utils/colors";

const CardSwitcher = ({ cellId }) => {
  const { cellData, updateFields } = useCell({ id: cellId });
  const { colorTheme = "STONE" } = cellData;
  const theme = COLOR_THEME[colorTheme];

  const buttonCommonClass = `hover:bg-slate-100 h-fit w-fit p-2 transition-colors border rounded-md cursor-pointer`;

  return (
    <DropDownMenu
      menu={[
        { key: CELL_TYPES.BASIC, label: "Basic" },
        { key: CELL_TYPES.DUAL_FIELD, label: "Dual Field" },
      ]}
      onItemClick={(key) => {
        updateFields({ type: key });
      }}
      TriggerComponent={() => {
        return (
          <div className={buttonCommonClass}>
            <TbExchange className={`text-lg`} />
          </div>
        );
      }}
    />
  );
};

export default CardSwitcher;
