////// IMPORTS //////

//// EXTERNAL ////

// React
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////
import { uuidv4 } from "../Libs/KLib";

////// COMPONENT //////

function KNavbar(props) {
  //props
  const {
    className,
    children,
    expand,
    brandTitle,
    brandLogo,
    brandLink,
  } = props;
  const [id, setID] = useState(uuidv4());
  //states

  //effects

  //render
  return (
    <nav
      className={`navbar navbar-expand${
        "-" + expand || ""
      } k-navbar ${className}`}>
      <div className="container">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target={id}>
          <span class="navbar-toggler-icon"></span>
        </button>
        <a href={brandLink || "#"}>{brandTitle}</a>

        <div className="collapse navbar-collapse" id={id}></div>
      </div>
    </nav>
  );
}

KNavbar.propTypes = {
  className: PropTypes.string,
  expand: PropTypes.string,
  brandLogo: PropTypes.string,
  brandTitle: PropTypes.string,
  brandLink: PropTypes.string,
};

export default KNavbar;
