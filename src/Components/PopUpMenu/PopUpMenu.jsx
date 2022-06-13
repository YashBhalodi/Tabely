import React, { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";

import { FiMoreVertical } from "react-icons/fi";
import _ from "lodash";

const DropdownItem = (props) => {
  const { onClick = () => {}, label, key } = props;

  const handleClick = (e) => {
    onClick();
    e.stopPropagation();
  };

  return (
    <div
      key={key}
      className="hover:bg-blue-100 bg-blue-50 hover:text-blue-700 px-6 py-2 font-medium text-blue-900 transition-all cursor-pointer"
      onClick={handleClick}
    >
      {label}
    </div>
  );
};

const DropdownContainer = (props) => {
  return (
    <div
      className={`bg-blue-50 rounded-md  border-2 border-blue-100 py-2 ${
        props.visible ? "flex flex-col" : "hidden"
      } shadow-md shadow-blue-50`}
    >
      {props.children}
    </div>
  );
};

const Dropdown = (props) => {
  const { menu = [], onItemClick = () => {} } = props;
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

  const iconClass = "text-xl text-blue-900";
  const iconButtonClass =
    "hover:border-blue-300 hover:border flex flex-col items-center justify-center w-12 h-12 bg-blue-100 rounded-md cursor-pointer";

  useEffect(() => {
    // listen for clicks and close dropdown on bod
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
      <div
        ref={referenceRef}
        onClick={handleDropdownClick}
        className={iconButtonClass}
      >
        <FiMoreVertical className={iconClass} />
      </div>
      <div ref={popperRef} style={styles.popper} {...attributes.popper}>
        <DropdownContainer style={styles.offset} visible={visible}>
          {_.map(menu, (menuItem) => (
            <DropdownItem
              label={menuItem.label}
              onClick={() => {
                onItemClick(menuItem.key);
                setVisibility(false);
              }}
            />
          ))}
        </DropdownContainer>
      </div>
    </React.Fragment>
  );
};

export default Dropdown;
