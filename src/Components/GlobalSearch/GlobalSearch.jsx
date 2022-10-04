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

const actions = [
  {
    id: "blog",
    name: "Blog",
    keywords: "writing words",
    perform: () => (window.location.pathname = "blog"),
  },
  {
    id: "contact",
    name: "Contact",
    keywords: "email",
    perform: () => (window.location.pathname = "contact"),
  },
];

const RenderResults = () => {
  const { results } = useMatches();
  //   const { searchQuery, isVisible } = useKBar((state) => ({
  //     searchQuery: state.searchQuery,
  //     isVisible: state.visualState === "showing",
  //   }));

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div>{item}</div>
        ) : (
          <div
            style={{
              background: active ? "#eee" : "transparent",
            }}
          >
            {item.name}
          </div>
        )
      }
    />
  );
};

const GlobalSearch = (props) => {
  useRegisterActions(actions);
  return (
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator>
          <KBarSearch />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

export default GlobalSearch;
