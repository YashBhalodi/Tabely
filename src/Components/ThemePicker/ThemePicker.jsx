import React, { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import PropTypes from "prop-types";
import { FiChevronDown } from "react-icons/fi";

import { ColorPalette } from "Components";
import { COLOR_THEME } from "Utils/colors";

const ThemePicker = (props) => {
  const { activeTheme = "STONE", onSelectTheme = () => {} } = props;
  const [visible, setVisibility] = useState(false);

  const { bgColor } = COLOR_THEME[activeTheme];

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
        className={`p-1 rounded-md border border-gray-100 w-fit h-fit cursor-pointer flex flex-row justify-center items-center space-x-1 bg-white/50`}
      >
        <div className={`h-4 w-4 shadow-sm rounded-full ${bgColor}`}></div>
        <FiChevronDown className={`text-gray-900/20`} />
      </div>
      <div
        ref={popperRef}
        style={{ ...styles.popper, zIndex: 10 }}
        {...attributes.popper}
      >
        <div
          style={styles.offset}
          className={`${
            visible
              ? "visible h-fit w-fit border-gray-100 border rounded-md shadow-sm shadow-gray-100 bg-white/95"
              : "hidden"
          }`}
          onMouseLeave={() => setVisibility(false)}
        >
          <ColorPalette
            activeTheme={activeTheme}
            onClickTheme={onSelectTheme}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

ThemePicker.propTypes = {
  activeTheme: PropTypes.string,
  onSelectTheme: PropTypes.func.isRequired,
};

export default ThemePicker;
