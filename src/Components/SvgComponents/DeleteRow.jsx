import React from "react";

const DeleteRow = (props) => {
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
      <path
        stroke="#000"
        stroke-width="1.5"
        stroke-linecap="round"
        d="M2.75 19.424h18.5"
        className={pathClass}
      />
      <g
        clip-path="url(#a)"
        stroke="#000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={pathClass}
      >
        <path d="M6.75 7.326h10.5m-1.167 0v8.167a1.167 1.167 0 0 1-1.166 1.167H9.083a1.167 1.167 0 0 1-1.166-1.167V7.326m1.75 0V6.16a1.167 1.167 0 0 1 1.166-1.167h2.334a1.167 1.167 0 0 1 1.166 1.167v1.166" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" transform="translate(5 3.826)" d="M0 0h14v14H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DeleteRow;
