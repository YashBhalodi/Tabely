import React from "react";
import PropTypes from "prop-types";

import { COLOR_THEME } from "Utils/colors";

import _ from "lodash";

const ThemeItem = (props) => {
  const { id, isActive, onClick } = props;
  const {
    label,
    class: className,
    activeClass,
    pickerHoverClass,
  } = COLOR_THEME[id];

  return (
    <div
      className={`w-4 h-4 rounded-full ${className} ${
        isActive ? activeClass : ""
      } ${pickerHoverClass}`}
      onClick={() => onClick(id)}
    />
  );
};

const ColorPalette = (props) => {
  const { activeTheme = "RED", onClickTheme = () => {} } = props;

  const handleClick = (id) => {
    onClickTheme(id);
  };
  return (
    <div className="shadow-gray-100 h-fit w-fit grid items-start justify-center max-w-xs grid-flow-col grid-rows-2 gap-3 p-2 rounded-md shadow-lg">
      {_.map(COLOR_THEME, (item, key) => (
        <ThemeItem
          key={key}
          id={key}
          onClick={handleClick}
          isActive={activeTheme === key}
        />
      ))}
    </div>
  );
};

ColorPalette.propTypes = {
  activeTheme: PropTypes.string.isRequired,
  onClickTheme: PropTypes.func.isRequired,
};

export default ColorPalette;
