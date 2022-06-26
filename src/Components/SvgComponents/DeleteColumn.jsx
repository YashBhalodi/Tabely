import React from "react";

const DeleteColumn = (props) => {
  const {
    width = 24,
    height = 24,
    containerClass = "",
    pathClass = "stroke-red-700",
  } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={containerClass}
    >
      <line
        x1="4.57637"
        y1="2.75"
        x2="4.57637"
        y2="21.25"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        className={pathClass}
      />
      <path
        d="M7.92362 8.5H9.09029H18.4236"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={pathClass}
      />
      <path
        d="M17.257 8.50001V16.6667C17.257 16.9761 17.134 17.2728 16.9152 17.4916C16.6965 17.7104 16.3997 17.8333 16.0903 17.8333H10.257C9.94753 17.8333 9.65079 17.7104 9.43199 17.4916C9.2132 17.2728 9.09029 16.9761 9.09029 16.6667V8.50001M10.8403 8.50001V7.33334C10.8403 7.02392 10.9632 6.72717 11.182 6.50838C11.4008 6.28959 11.6975 6.16667 12.007 6.16667H14.3403C14.6497 6.16667 14.9465 6.28959 15.1652 6.50838C15.384 6.72717 15.507 7.02392 15.507 7.33334V8.50001"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={pathClass}
      />
    </svg>
  );
};

export default DeleteColumn;
