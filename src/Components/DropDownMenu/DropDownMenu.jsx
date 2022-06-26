import React, { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";

import _ from "lodash";

const DropDownItem = (props) => {
  const { onClick = () => {}, menu } = props;

  const { type = "default", label, isDestructive = false } = menu;

  const handleClick = (e) => {
    onClick();
    e.stopPropagation();
  };

  const className = `${
    isDestructive
      ? "hover:bg-red-50 hover:text-red-600 text-red-700"
      : "hover:bg-blue-50 hover:text-blue-700 text-blue-900"
  }`;

  return (
    <div
      className={`px-6 py-2 font-medium transition-all cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {label}
    </div>
  );
};

const DropDownContainer = (props) => {
  return (
    <div
      className={`bg-gray-50 rounded-md border-2 border-gray-200 py-2 ${
        props.visible ? "flex flex-col" : "hidden"
      } shadow-md shadow-blue-50`}
    >
      {props.children}
    </div>
  );
};

const DropDownMenu = (props) => {
  const {
    menu = [],
    onItemClick = () => {},
    TriggerComponent,
    PopoverComponent,
  } = props;
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
            offset: [0, 8],
          },
        },
      ],
    }
  );

  useEffect(() => {
    // listen for clicks and close dropdown on body
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
    setVisibility(!visible);
  }

  return (
    <React.Fragment>
      <div ref={referenceRef} onClick={handleDropdownClick}>
        <TriggerComponent />
      </div>
      <div
        ref={popperRef}
        style={{ ...styles.popper, zIndex: 100 }}
        {...attributes.popper}
      >
        {PopoverComponent ? (
          <div className={visible ? "visible" : "invisible"}>
            <PopoverComponent />
          </div>
        ) : (
          <DropDownContainer visible={visible}>
            {_.map(menu, (menuItem) => (
              <DropDownItem
                key={menuItem.key}
                menu={menuItem}
                onClick={() => {
                  onItemClick(menuItem.key);
                  setVisibility(false);
                }}
              />
            ))}
          </DropDownContainer>
        )}
      </div>
    </React.Fragment>
  );
};

export default DropDownMenu;
