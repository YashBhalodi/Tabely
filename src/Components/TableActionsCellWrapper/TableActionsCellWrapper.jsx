import React from "react";
import PropTypes from "prop-types";

const TableActionsCellWrapper = (props) => {
  const { children, cellId } = props;
  return <div>{children}</div>;
};

TableActionsCellWrapper.propTypes = {
  cellId: PropTypes.string.isRequired,
};

export default TableActionsCellWrapper;
