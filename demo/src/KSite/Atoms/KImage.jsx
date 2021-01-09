////// IMPORTS //////

//// EXTERNAL ////

// React
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////

////// COMPONENT //////

function KImage(props) {
  //props
  const { src, alt } = props;
  //states
  //effects
  //render
  return <img src={src} alt={alt} className="k-image"></img>;
}

KImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

////// EXPORTS //////
export default KImage;
