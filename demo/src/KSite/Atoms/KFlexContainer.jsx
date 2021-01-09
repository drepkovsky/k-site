////// IMPORTS //////

//// EXTERNAL ////

// React
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, version } from "react";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////
import { justifyContent, alignItems } from "../Libs/KLib";

////// COMPONENT //////

function KFlexContainer(props) {
  //props
  const {
    children,
    ver,
    hor,
    breakpointVer,
    breakpointHor,
    dirCol,
    className,
    fillWidth,
    fillHeight,
    fluid,
  } = props;

  const flexDir = dirCol ? "flex-column" : "flex-row";
  const fillW = fillWidth ? "fill-width" : "";
  const fillH = fillHeight ? "fill-height" : "";

  //states

  //effects
  const align = alignItems(
    dirCol ? hor : ver,
    dirCol ? breakpointHor : breakpointVer
  );
  const justify = justifyContent(
    dirCol ? ver : hor,
    dirCol ? breakpointVer : breakpointHor
  );

  //render
  return (
    <Container
      fluid={fluid}
      className={`d-flex flex-wrap position-static ${flexDir} ${fillW} ${fillH} ${align} ${justify} ${className}`}>
      {children}
    </Container>
  );
}

KFlexContainer.propTypes = {
  ver: PropTypes.string,
  hor: PropTypes.string,
  breakpointVer: PropTypes.string,
  breakpointHor: PropTypes.string,
  dirCol: PropTypes.bool,
  className: PropTypes.string,
  fillWidth: PropTypes.bool,
  fillHeight: PropTypes.bool,
  fluid: PropTypes.bool,
};

////// EXPORTS //////
export default KFlexContainer;
