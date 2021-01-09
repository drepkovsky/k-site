////// IMPORTS //////

//// EXTERNAL ////

// React
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

// Reactstrap

//// INTERNAL ////

////// COMPONENT //////

function KTable(props) {
  //props
  const { children, className, stripes } = props;
  //states
  //effects
  const stripClass = stripes ? "k-table-striped" : "";
  //render
  return (
    <div className="k-table-holder">
      <table className={`k-table ${className || ""} ${stripClass} `}>
        {children}
      </table>
    </div>
  );
}

KTable.propTypes = {
  className: PropTypes.string,
  stripes: PropTypes.bool,
};

export default KTable;
