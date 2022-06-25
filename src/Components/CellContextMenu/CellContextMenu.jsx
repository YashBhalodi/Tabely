import React, { useRef, useState, useEffect } from "react";
import { usePopper } from "react-popper";

import { ThemePicker } from "./Components";

const ContextMenu = (props) => {
  const { cellId, children } = props;
  const [visible, setVisibility] = useState(false);

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
            offset: [2, 0],
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
            visible
              ? "visible h-fit w-fit border-gray-100 border rounded-md shadow-sm px-4 py-2 bg-white"
              : "hidden"
          }`}
        >
          <ThemePicker cellId={cellId} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContextMenu;
