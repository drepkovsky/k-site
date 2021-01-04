// React
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

// Reactstrap
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Dropdown,
} from "reactstrap";

import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";

/////STYLES //////
import "./KNavbar.css";
import { connect } from "react-redux";

//// INTERNAL ////
import { setNavbarHeight } from "../redux/actions/act_con";

////// COMPONENT //////
const Icon = (props) => {
    if (props.isCollapsed)
        return <MenuIcon fontSize="large" className={props.className} />;
    return <MenuOpenIcon fontSize="large" className={props.className} />;
};

class KNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: true,
            isExtended: this.props.dynamic,
            dropdowns: {},
            linkStructure: {},
        };
    }

    componentDidMount() {
        if (this.props.dynamic) {
            window.addEventListener("scroll", () => {
                this.setState({ isExtended: window.pageYOffset < 10 });
            });
        }
    }

    componentDidUpdate() {
        const { navLinks } = this.props.context;
        if (this.state.navLinks != navLinks) {
            this.setState({ navLinks });
            this.initNavbarStructure();
        }
    }

    initNavbarStructure = () => {
        const { navLinks } = this.props.context;

        const linkStructure = {};
        var dropdowns = {};

        navLinks.map((link) => {
            const names = link.name
                .split("/")
                .filter((name) => name.length > 0);

            var curr = linkStructure,
                last = names.pop();

            names.forEach((name) => {
                if (curr[name] == undefined) curr[name] = {};
                curr = curr[name];
                dropdowns = {
                    ...dropdowns,
                    [name]: false,
                };
            });

            curr[last] = link.route;
        });

        this.setState({ dropdowns, linkStructure });
    };

    render() {
        const className = this.props.className || "";
        const collapseClassName = this.props.collapseClassName || "";

        const colorExtended = this.props.colorExtended || "transparent";
        const items = this.props.items || [];
        const brandTitle = this.props.brandTitle || "";

        const extendClass = this.state.isExtended ? "extend" : "";

        const color = this.state.isExtended
            ? this.state.isCollapsed
                ? colorExtended
                : this.props.color
            : this.props.color;

        return (
            <Navbar
                fixed="top"
                className={`k-navbar ${className}`}
                expand="md"
                dark={this.props.dark}
                light={this.props.light}
                color={color}
            >
                <NavbarBrand
                    className={` k-navbar-brand ${extendClass}`}
                    href="/"
                >
                    {brandTitle}
                </NavbarBrand>
                <NavbarToggler
                    onClick={this.toggleCollapse}
                    className="navbar-toggler p-0"
                >
                    <Icon
                        isCollapsed={this.state.isCollapsed}
                        className="navbar-toggler-icon"
                    />
                </NavbarToggler>
                <Collapse
                    className={` ${collapseClassName}`}
                    isOpen={!this.state.isCollapsed}
                    navbar
                >
                    <Nav className="ml-auto" navbar>
                        {items.map((item, index) => {
                            return <NavItem key={index}>{item}</NavItem>;
                        })}
                        {this.renderNavLink(this.state.linkStructure)}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }

    /////MISC//////
    renderNavLink = (linkStructure) => {
        return (
            <Fragment>
                {Object.keys(linkStructure).map((key, index) => {
                    if (typeof linkStructure[key] === "object") {
                        return this.renderDropDown(
                            key,
                            linkStructure[key],
                            true
                        );
                    } else {
                        return (
                            <NavItem key={index}>
                                <NavLink href={linkStructure[key]}>
                                    {key}
                                </NavLink>
                            </NavItem>
                        );
                    }
                })}
            </Fragment>
        );
    };

    renderDropDown = (name, items, nav) => {
        const dir = nav ? "down" : "right";

        return (
            <Dropdown
                isOpen={this.state.dropdowns[name]}
                toggle={() => {
                    this.toggleDropDown(name);
                }}
                nav={nav}
                inNavbar
                direction={dir}
                key={name}
            >
                <DropdownToggle tag={"span"} nav={nav} caret>
                    {name}
                </DropdownToggle>
                <DropdownMenu right className="px-3">
                    {Object.keys(items).map((key, index) => {
                        if (typeof items[key] === "object")
                            return (
                                <DropdownItem
                                    toggle={false}
                                    className="py-2"
                                    key={index}
                                >
                                    {this.renderDropDown(
                                        key,
                                        items[key],
                                        false
                                    )}
                                </DropdownItem>
                            );
                        else {
                            return (
                                <DropdownItem
                                    className="py-2"
                                    href={items[key]}
                                    key={index}
                                >
                                    {key}
                                </DropdownItem>
                            );
                        }
                    })}
                </DropdownMenu>
            </Dropdown>
        );
    };

    toggleDropDown = (name) => {
        this.setState({
            dropdowns: {
                ...this.state.dropdowns,
                [name]: !this.state.dropdowns[name],
            },
        });
    };

    toggleCollapse = () => {
        this.setState({ isCollapsed: !this.state.isCollapsed });
    };
}

KNavbar.propTypes = {
    links: PropTypes.array,
    items: PropTypes.array,
    brandTitle: PropTypes.string,
    dynamic: PropTypes.bool,
    light: PropTypes.bool,
    dark: PropTypes.bool,
    color: PropTypes.string,
    colorExtended: PropTypes.string,
    className: PropTypes.string,
    collapseClassName: PropTypes.string,
};

////// EXPORTS //////
const mapStateToProps = (state) => ({
    context: state.context,
});

export default connect(mapStateToProps, { setNavbarHeight })(KNavbar);
