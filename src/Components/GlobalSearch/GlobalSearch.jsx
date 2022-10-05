import React from "react";
import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
  useKBar,
  useRegisterActions,
} from "kbar";

import { useApp } from "Hooks";

import { getActions } from "./Utils";
import { useNavigate } from "react-router-dom";

import { COLOR_THEME } from "Utils/colors";

const CellResults = (props) => {
  const { item, active } = props;
  return (
    <div
      className={`px-4 py-4 flex flex-row items-center justify-between ${
        active ? `bg-gray-200/60` : "bg-gray-50"
      }`}
    >
      {item.name}
      <div
        className={`w-4 h-4 rounded-md opacity-70 ${
          COLOR_THEME[item.theme].bgColor
        }`}
      ></div>
    </div>
  );
};

const BoardResults = (props) => {
  const { item, active } = props;
  return (
    <div
      className={`px-4 py-4 flex flex-row items-center justify-between ${
        active ? `bg-gray-200/60` : "bg-gray-50"
      }`}
    >
      {item.name}
    </div>
  );
};

const Sections = (props) => {
  const { item } = props;
  return (
    <h3 className="font-body px-4 py-2 text-sm text-gray-700 bg-gray-100">
      {item || "Unnamed Board"}
    </h3>
  );
};

const Actions = (props) => {
  const { item, active } = props;
  return (
    <div
      className={`px-4 py-4 flex flex-row items-center justify-between ${
        active ? `bg-gray-200/60` : "bg-gray-50"
      }`}
    >
      {item.name}
    </div>
  );
};

const RenderResults = () => {
  const { results } = useMatches();
  const { isVisible } = useKBar((state) => ({
    isVisible: state.visualState === "showing",
  }));
  const { createBoard } = useApp();
  const navigate = useNavigate();
  useRegisterActions(getActions({ navigate, createBoard }), [
    isVisible,
    navigate,
  ]);

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        const commonProps = { item, active };
        if (typeof item === "string") {
          return <Sections {...commonProps} />;
        }
        if (item.type === "CELL") {
          return <CellResults {...commonProps} />;
        }
        if (item.type === "BOARD") {
          return <BoardResults {...commonProps} />;
        }
        if (item.type === "ACTIONS") {
          return <Actions {...commonProps} />;
        }
      }}
    />
  );
};

const GlobalSearch = (props) => {
  return (
    <KBarPortal>
      <KBarPositioner className="bg-gray-300/70">
        <KBarAnimator className="bg-gray-50 rounded-xl">
          <KBarSearch
            className="w-[500px] px-4 py-4 bg-gray-50 focus:outline-none rounded-t-xl border-b-2 border-b-gray-200"
            defaultPlaceholder="Search anything..."
          />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

export default GlobalSearch;
