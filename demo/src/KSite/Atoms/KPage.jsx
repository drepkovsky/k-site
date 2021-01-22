////// IMPORTS //////

// React
import React from "react";
import PropTypes from "prop-types";

////// COMPONENT //////

function KPage(props) {
  return <div className="k-page">{props.children}</div>;
}

KPage.propsType = {
  route: PropTypes.string,
  name: PropTypes.string,
  navbar: PropTypes.bool,
};

/////EXPORT///////////////

export default KPage;
