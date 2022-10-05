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

import { getActions } from "./Utils";
import { useNavigate } from "react-router-dom";

const RenderResults = () => {
  const { results } = useMatches();
  const { isVisible } = useKBar((state) => ({
    isVisible: state.visualState === "showing",
  }));
  const navigate = useNavigate();
  useRegisterActions(getActions({ navigate }), [isVisible, navigate]);

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        if (typeof item === "string") {
          return (
            <h3 className="font-body px-4 py-2 text-sm text-gray-700 capitalize bg-gray-100">
              {item || "Unnamed Board"}
            </h3>
          );
        }
        return (
          <p
            className={`px-4 py-4 rounded-sm ${
              active ? `bg-gray-200/40` : "bg-gray-50"
            }`}
          >
            {item.name}
          </p>
        );
      }}
    />
  );
};

const GlobalSearch = (props) => {
  return (
    <KBarPortal>
      <KBarPositioner className="bg-gray-300/70">
        <KBarAnimator className="scrollbar scrollbar-emerald rounded-xl bg-gray-200">
          <KBarSearch
            className="w-[500px] px-4 py-4 bg-gray-50 focus:outline-none rounded-t-xl"
            defaultPlaceholder="Search anything..."
          />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

export default GlobalSearch;
