import React, { useRef, useState, useEffect } from "react";
import { usePopper } from "react-popper";

import {
  ThemePicker,
  ClearCell,
  TableLayoutActions,
  TableLayoutDestructiveActions,
} from "./Components";

import { useCell } from "Hooks";
import { COLOR_THEME } from "Utils/colors";
import { CELL_CONFIGS, FEATURES } from "Utils/constants";

const ContextMenu = (props) => {
  const { cellId, children } = props;
  const [visible, setVisibility] = useState(false);
  const { cellData } = useCell({ id: cellId });
  const { colorTheme = "STONE", type } = cellData;
  const theme = COLOR_THEME[colorTheme];

  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: "bottom",
      modifiers: [
        {
          name: "preventOverflow",
          options: {
            mainAxis: true,
            altAxis: true,
            padding: { right: 32 },
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, 0],
          },
        },
      ],
    }
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  function handleDocumentClick(event) {
    if (
      referenceRef.current.contains(event.target) ||
      popperRef.current.contains(event.target)
    ) {
      return;
    }
    setVisibility(false);
  }

  function handleDropdownClick(event) {
    event.preventDefault();
    event.stopPropagation();
    setVisibility(!visible);
  }

  const isContextMenuAllowed = CELL_CONFIGS[type].features.includes(
    FEATURES.CONTEXT_MENU
  );
  const showAddTableLayoutActions = CELL_CONFIGS[
    type
  ].contextMenuFeatures.includes(FEATURES.ADD_TABLE_LAYOUT);
  const showDeleteTableLayoutActions = CELL_CONFIGS[
    type
  ].contextMenuFeatures.includes(FEATURES.DELETE_TABLE_LAYOUT);
  const showThemePicker = CELL_CONFIGS[type].contextMenuFeatures.includes(
    FEATURES.CHANGE_THEME
  );

  if (!isContextMenuAllowed) {
    return (
      <div className="w-full h-full" onContextMenu={(e) => e.preventDefault()}>
        {children}
      </div>
    );
  }

  return (
    <React.Fragment>
      {children}
      <div
        ref={referenceRef}
        className={`absolute inset-0 rounded-lg m-1`}
        onContextMenu={handleDropdownClick}
      />
      <div
        ref={popperRef}
        style={{ ...styles.popper, zIndex: 10 }}
        {...attributes.popper}
      >
        <div
          style={styles.offset}
          className={`${
            visible ? "visible" : "hidden"
          } h-fit w-fit border rounded-md shadow-sm px-3 py-2 flex flex-row space-x-4 justify-center items-center ${
            theme.lightBgColor
          } ${theme.lightBgBorderColor}`}
        >
          {showAddTableLayoutActions ? (
            <>
              <TableLayoutActions cellId={cellId} />
              <hr
                className={`h-4 border ${theme.lightBgBorderColor} opacity-50`}
              />
            </>
          ) : null}
          {showDeleteTableLayoutActions ? (
            <>
              <TableLayoutDestructiveActions cellId={cellId} />
              <hr
                className={`h-4 border ${theme.lightBgBorderColor} opacity-50`}
              />
            </>
          ) : null}
          {showThemePicker ? (
            <>
              <ThemePicker cellId={cellId} />
              <hr
                className={`h-4 border ${theme.lightBgBorderColor} opacity-50`}
              />
            </>
          ) : null}
          <ClearCell cellId={cellId} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContextMenu;
