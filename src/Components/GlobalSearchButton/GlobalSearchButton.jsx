import React from "react";
import { useKBar } from "kbar";
import { FiSearch } from "react-icons/fi";
import { Button } from "Components";

const GlobalSearchButton = () => {
  const { query } = useKBar();

  const isMac = navigator.appVersion.indexOf("Mac") != -1;
  return (
    <Button
      variant={"primary-plain"}
      shape={"square"}
      size={"md"}
      className="text-blue-500/80 flex flex-row items-center justify-center gap-2 py-[12px] font-light"
      onClick={query.toggle}
      tabIndex={0}
    >
      <FiSearch />
      <span>Search . . .</span>
      <span className="bg-blue-100/50 px-1 font-thin rounded">
        <kbd>{isMac ? "cmd" : "ctrl"}</kbd>+<kbd>k</kbd>
      </span>
    </Button>
  );
};

export default GlobalSearchButton;
