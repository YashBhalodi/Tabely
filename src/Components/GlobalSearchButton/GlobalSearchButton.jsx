import React from "react";
import { useKBar } from "kbar";
import { FiCommand, FiSearch } from "react-icons/fi";
import { Button } from "Components";

const GlobalSearchButton = () => {
  const { query } = useKBar();

  const isMac = navigator.appVersion.indexOf("Mac") != -1;
  return (
    <Button
      variant={"primary-plain"}
      shape={"square"}
      size={"md"}
      className="flex flex-row items-center justify-center gap-2 py-[12px] font-light"
      onClick={query.toggle}
      tabIndex={0}
    >
      <FiSearch />
      <span>Search . . .</span>

      <div className="flex flex-row items-center justify-center gap-1">
        <kbd>{isMac ? <FiCommand /> : "ctrl"}</kbd>
        <kbd>K</kbd>
      </div>
    </Button>
  );
};

export default GlobalSearchButton;
