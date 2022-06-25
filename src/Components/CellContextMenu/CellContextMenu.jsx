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

const ContextMenu = (props) => {
  const { cellId, children } = props;
  const [visible, setVisibility] = useState(false);
  const { cellData } = useCell({ id: cellId });
  const { colorTheme = "STONE" } = cellData;
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
          } h-fit w-fit border rounded-md shadow-sm px-2 py-2 flex flex-row space-x-1 justify-center items-center ${
            theme.lightBgColor
          }`}
        >
          <TableLayoutActions cellId={cellId} />
          <TableLayoutDestructiveActions cellId={cellId} />
          <ThemePicker cellId={cellId} />
          <ClearCell cellId={cellId} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContextMenu;
