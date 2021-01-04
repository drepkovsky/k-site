////// IMPORTS //////

//// EXTERNAL ////

// React
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, version } from "react";

// Reactstrap
import { Container } from "reactstrap";

/////STYLES //////

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
        swapAxis,
        className,
        fill,
        fluid,
    } = props;

    const flexDir = swapAxis ? "flex-column" : "flex-row";
    const fillParent = fill ? "fill-parent" : "";

    //states

    //effects

    //render
    return (
        <Container
            fluid={fluid}
            className={`d-flex flex-wrap position-static ${flexDir} ${fillParent} ${alignItems(
                ver,
                breakpointVer
            )} ${justifyContent(hor, breakpointHor)} ${className}`}
        >
            {children}
        </Container>
    );
}

KFlexContainer.propTypes = {
    ver: PropTypes.string,
    hor: PropTypes.string,
    breakpointVer: PropTypes.string,
    breakpointHor: PropTypes.string,
    swapAxis: PropTypes.bool,
    className: PropTypes.string,
    fill: PropTypes.bool,
    fluid: PropTypes.bool,
};

////// EXPORTS //////
export default KFlexContainer;
