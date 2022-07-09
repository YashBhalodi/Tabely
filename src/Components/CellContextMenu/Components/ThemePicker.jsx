import React, { useState, useRef } from "react";
import { usePopper } from "react-popper";
import PropTypes from "prop-types";

import { ColorPalette } from "Components";

import { useCell, useClickOutside } from "Hooks";
import { COLOR_THEME } from "Utils/colors";

const ThemePicker = (props) => {
  const { cellId } = props;
  const [visible, setVisibility] = useState(false);

  const { cellData, updateFields } = useCell({ id: cellId });
  const { colorTheme = "STONE" } = cellData;
  const activeTheme = COLOR_THEME[colorTheme];

  const setTheme = (theme) => {
    updateFields({
      colorTheme: theme,
    });
  };

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

  useClickOutside({
    containerRef: [referenceRef, popperRef],
    onClickOutside: () => setVisibility(false),
  });

  const handleDropdownClick = (event) => {
    setVisibility(!visible);
  };

  return (
    <React.Fragment>
      <abbr title="Change theme">
        <div
          ref={referenceRef}
          onClick={handleDropdownClick}
          className={`h-5 w-5 shadow-sm rounded-full cursor-pointer ${activeTheme.bgColor} ${activeTheme.outline}`}
        ></div>
      </abbr>
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
          <ColorPalette activeTheme={colorTheme} onClickTheme={setTheme} />
        </div>
      </div>
    </React.Fragment>
  );
};

ThemePicker.propTypes = {
  cellId: PropTypes.string.isRequired,
};

export default ThemePicker;
