////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Reactstrap
import { Container } from "reactstrap";

/////STYLES //////

//// INTERNAL ////

////// COMPONENT //////

class KSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.initID(),
        };
    }

    initID = () => {
        if (this.props.route) {
            let id = this.props.route.split("/");
            id = id[id.length - 1].split("#");
            id = id[id.length - 1];
            return id;
        }
        return null;
    };

    render() {
        return (
            <section
                id={this.state.id}
                className={`k-section py-4 ${this.props.className || ""}`}
            >
                {this.props.children}
            </section>
        );
    }
}

KSection.propTypes = {
    route: PropTypes.string,
    name: PropTypes.string,
    navbar: PropTypes.bool,
};

////// EXPORTS //////
export default KSection;
