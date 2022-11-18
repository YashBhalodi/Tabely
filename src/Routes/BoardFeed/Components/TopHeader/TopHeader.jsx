import React from "react";
import _ from "lodash";
import { GlobalSearchButton } from "Components";

const TopHeader = () => {
  return (
    <div className="bg-blue-50 flex flex-row items-center justify-between w-full h-20 px-8 space-x-4 border-b-2 border-blue-100">
      <div className="text-xl font-medium text-blue-900">Tabley</div>
      <GlobalSearchButton />
    </div>
  );
};
export default TopHeader;
