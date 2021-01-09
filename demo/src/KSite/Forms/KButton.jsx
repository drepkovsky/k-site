////// IMPORTS //////

//// EXTERNAL ////

// React
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";

// Reactstrap
import { Container, Button } from "reactstrap";

/////STYLES //////

//// INTERNAL ////

////// COMPONENT //////

function KButton(props) {
    //props
    const { onClick, color, text, className } = props;

    //states

    //effects

    //render
    return (
        <Button className={className} color={color} onClick={onClick}>
            {text || "Default"}
        </Button>
    );
}

KButton.propTypes = {
    onClick: PropTypes.func,
    color: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string,
};

////// EXPORTS //////
export default KButton;
