import React from "react";
import PropTypes from "prop-types";

const commonClass =
  "hover:translate-y-px hover:scale-95 transition-all w-fit h-fit font-medium rounded-md cursor-pointer";

const VARIANT_CLASS_MAP = {
  primary: `${commonClass} text-blue-50 hover:bg-blue-700 shadow-blue-500 bg-blue-600 shadow-sm`,
  "primary-outlined": `${commonClass} text-blue-800 hover:bg-blue-50 shadow-blue-200 shadow-sm border-2 border-blue-900/30 hover:border-blue-900/70`,
  "primary-plain": `${commonClass} text-blue-800 hover:bg-blue-50 shadow-blue-400 shadow-sm`,
  "primary-text": `${commonClass} text-blue-800 hover:shadow-sm hover:shadow-blue-200 hover:underline hover:decoration-1 underline-offset-2`,
  secondary: `${commonClass} text-gray-50 hover:bg-gray-600 shadow-gray-500 bg-gray-500 shadow-sm`,
  "secondary-outlined": `${commonClass} text-gray-800 hover:bg-gray-50 shadow-gray-200 shadow-sm border-2 border-gray-900/30 hover:border-gray-900/70`,
  "secondary-plain": `${commonClass} text-gray-800 hover:bg-gray-50 shadow-gray-400 shadow-sm`,
  "secondary-text": `${commonClass} text-gray-800 hover:shadow-sm hover:shadow-gray-400 hover:underline hover:decoration-1 underline-offset-2`,
  destructive: `${commonClass} text-red-50 hover:bg-red-600 shadow-red-500 bg-red-500 shadow-sm`,
  "destructive-outlined": `${commonClass} text-red-700 hover:bg-red-50 shadow-red-200 shadow-sm border-2 border-red-900/30 hover:border-red-900/70`,
  "destructive-plain": `${commonClass} text-red-700 hover:bg-red-50 shadow-red-400 shadow-sm`,
  "destructive-text": `${commonClass} text-red-700 hover:shadow-sm hover:shadow-red-400 hover:underline hover:decoration-1 underline-offset-2`,
};

const SIZE_CLASS_MAP = {
  rectangle: {
    sm: "text-sm px-4 py-1",
    md: "text-md px-8 py-2",
    lg: "text-lg px-10 py-2",
  },
  square: {
    sm: "text-sm p-2",
    md: "text-md p-4",
    lg: "text-lg p-6",
  },
};

const Button = (props) => {
  const { children, onClick, size, variant, shape } = props;

  return (
    <div
      className={`${VARIANT_CLASS_MAP[variant]} ${SIZE_CLASS_MAP[shape][size]}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Button.PropTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  shape: PropTypes.oneOf(["rectangle", "square"]),
  variant: PropTypes.oneOf([
    "primary",
    "primary-outlined",
    "primary-plain",
    "primary-text",
    "secondary",
    "secondary-outlined",
    "secondary-plain",
    "secondary-text",
    "destructive",
    "destructive-outlined",
    "destructive-plain",
    "destructive-text",
  ]),
};
Button.defaultProps = {
  children: null,
  size: "md",
  variant: "primary",
  shape: "rectangle",
};
export default Button;
