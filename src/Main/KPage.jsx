////// IMPORTS //////

//// EXTERNAL ////
import { connect } from "react-redux";

// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//// INTERNAL ////
import { setNavbarLinks } from "../redux/actions/act_con";

////// COMPONENT //////

function KPage(props) {
    return (
        <Fragment>
            <div className="k-page">{props.children}</div>
        </Fragment>
    );
}

KPage.propsType = {
    route: PropTypes.string,
    name: PropTypes.string,
    navbar: PropTypes.bool,
};

/////EXPORT///////////////
const mapStateToProps = (state) => ({
    context: state.context,
});

export default connect(mapStateToProps, { addLinkToNavbar: setNavbarLinks })(
    KPage
);
