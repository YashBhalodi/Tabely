import React from "react";
import { useKBar } from "kbar";
import { FiCommand, FiSearch } from "react-icons/fi";
import { Button } from "Components";

const kbdClassName =
  "bg-blue-50 mix-blend-multiply flex items-center justify-center min-w-[1.5rem] h-[1.5rem] px-1 text-base rounded";

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
        <kbd className={kbdClassName}>{isMac ? <FiCommand /> : "ctrl"}</kbd>
        <kbd className={kbdClassName}>K</kbd>
      </div>
    </Button>
  );
};

export default GlobalSearchButton;
