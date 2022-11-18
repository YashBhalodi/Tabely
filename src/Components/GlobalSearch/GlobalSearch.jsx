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

const COMMON_CLASS = `px-4 py-4 flex flex-row items-center justify-between transition-colors`;

const searchItemActiveCommonClass =
  "bg-gray-200/60 underline underline-offset-2";

const RenderResults = () => {
  const { results } = useMatches();
  const { isVisible } = useKBar((state) => ({
    isVisible: state.visualState === "showing",
  }));
  const { createBoard, deleteBoard } = useApp();
  const navigate = useNavigate();
  useRegisterActions(getActions({ navigate, createBoard, deleteBoard }), [
    isVisible,
    navigate,
  ]);

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        if (typeof item === "string") {
          // section title
          return (
            <h3 className="font-body px-4 py-2 text-sm text-gray-700 bg-gray-100">
              {item || "Unnamed Board"}
            </h3>
          );
        }

        if (item.type === "CELL") {
          return (
            <div
              className={`${COMMON_CLASS} ${
                active ? searchItemActiveCommonClass : "bg-gray-50"
              }`}
            >
              {item.name}
              <div
                className={`w-4 h-4 rounded-full opacity-70 ${
                  COLOR_THEME[item.theme].bgColor
                }`}
              ></div>
            </div>
          );
        }

        if (item.type === "BOARD") {
          return (
            <div
              className={`${COMMON_CLASS} ${
                active ? searchItemActiveCommonClass : "bg-gray-50"
              }`}
            >
              {item.name}
            </div>
          );
        }

        if (item.type === "ACTION") {
          return (
            <div
              className={`${COMMON_CLASS} ${
                active ? searchItemActiveCommonClass : "bg-gray-50"
              } ${item.actionType === "DELETE" ? "bg-red-100/50" : ""} ${
                item.actionType === "DELETE" && active
                  ? "bg-red-700 text-white"
                  : ""
              }`}
            >
              {item.name}
            </div>
          );
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
