import React from "react";
import PropTypes from "prop-types";

import { COLOR_THEME } from "Utils/colors";

import _ from "lodash";

const SIZE_MAP = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
};

const ThemeItem = (props) => {
  const { id, isActive, onClick, size } = props;
  const { bgColor, outline, hoverOutline } = COLOR_THEME[id];
  const className = `transition-all duration-75 ease-in-out rounded-full cursor-pointer ${
    SIZE_MAP[size]
  } ${bgColor} ${isActive ? outline : ""} ${hoverOutline}`;

  return <div className={className} onClick={() => onClick(id)} />;
};

const ColorPalette = (props) => {
  const { activeTheme = "RED", onClickTheme = () => {}, size = "md" } = props;

  const handleClick = (id) => {
    onClickTheme(id);
  };

  return (
    <div className="h-fit w-fit z-40 grid items-start justify-center grid-flow-col grid-rows-3 gap-3 p-2">
      {_.map(COLOR_THEME, (item, key) => (
        <ThemeItem
          key={key}
          id={key}
          onClick={handleClick}
          isActive={activeTheme === key}
          size={size}
        />
      ))}
    </div>
  );
};

ColorPalette.propTypes = {
  activeTheme: PropTypes.string.isRequired,
  onClickTheme: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["sm", "md"]),
};

export default ColorPalette;
