import React from "react";
import { NavLink } from "react-router-dom";

import { FiChevronLeft } from "react-icons/fi";

import { Button } from "Components";
import _ from "lodash";

const TopHeader = () => {
  return (
    <div className="bg-blue-50 flex flex-row items-center justify-between w-full h-20 p-4 space-x-4 border-b-2 border-blue-100">
      <NavLink to={"/"}>
        <div className="flex flex-row items-center justify-start flex-1 space-x-4">
          <Button variant={"primary-plain"} shape={"square"} size={"md"}>
            <FiChevronLeft />
          </Button>
          <div className="text-xl font-medium text-blue-900">Tabley</div>
        </div>
      </NavLink>
    </div>
  );
};
export default TopHeader;
