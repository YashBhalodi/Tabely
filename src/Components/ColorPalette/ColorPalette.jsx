import React from "react";
import PropTypes from "prop-types";

import { COLOR_THEME } from "Utils/colors";

import _ from "lodash";

const ThemeItem = (props) => {
  const { id, isActive, onClick } = props;
  const { bgColor, outline, hoverOutline } = COLOR_THEME[id];
  const className = `transition-all duration-75 ease-in-out w-6 h-6 rounded-full cursor-pointer ${bgColor} ${
    isActive ? outline : ""
  } ${hoverOutline}`;

  return <div className={className} onClick={() => onClick(id)} />;
};

const ColorPalette = (props) => {
  const { activeTheme = "RED", onClickTheme = () => {} } = props;

  const handleClick = (id) => {
    onClickTheme(id);
  };

  return (
    <div className="h-fit w-fit z-40 grid items-start justify-center grid-flow-col grid-rows-2 gap-3 p-2">
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
