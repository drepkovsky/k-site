////// IMPORTS //////

//// EXTERNAL ////
import Icon from "@mdi/react";
// React
import PropTypes from "prop-types";
import React from "react";

// Reactstrap

//// INTERNAL ////

////// COMPONENT //////

function KIcon({ size = 1, icon, title, className }) {
  return <Icon size={size} path={icon} title={title} className={className} />;
}

KIcon.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.number,
  title: PropTypes.string,
};

////// EXPORTS //////
export default KIcon;
