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

import { mdiMenu, mdiMenuOpen } from "@mdi/js";

/////STYLES //////
import { connect } from "react-redux";

//// INTERNAL ////
import { setNavbarHeight } from "../redux/actions/act_con";
import KIcon from "../Atoms/KIcon";

////// COMPONENT //////
const Icon = ({ isCollapsed, className, dark }) => {
  if (isCollapsed) return <KIcon icon={mdiMenu} className={className} />;
  return <KIcon icon={mdiMenuOpen} className={className} />;
};

class KNavbarOld extends React.Component {
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
      const names = link.name.split("/").filter((name) => name.length > 0);

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
    const { light, fixed } = this.props;

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
        fixed={fixed}
        className={`k-navbar ${className}`}
        expand="md"
        dark={!light}
        light={light}
        color={color}
        tag={"header"}>
        <Nav className="container-lg">
          <NavbarBrand className={` k-navbar-brand ${extendClass}`} href="/">
            {brandTitle}
          </NavbarBrand>
          <NavbarToggler
            onClick={this.toggleCollapse}
            className="navbar-toggler p-0">
            <Icon
              isCollapsed={this.state.isCollapsed}
              className="navbar-toggler-icon"
            />
          </NavbarToggler>
          <Collapse
            className={` ${collapseClassName}`}
            isOpen={!this.state.isCollapsed}
            navbar>
            {items.map((item, index) => {
              return <NavItem key={index}>{item}</NavItem>;
            })}
            {this.renderNavLink(this.state.linkStructure)}
          </Collapse>
        </Nav>
      </Navbar>
    );
  }

  /////MISC//////
  renderNavLink = (linkStructure) => {
    return (
      <Fragment>
        {Object.keys(linkStructure).map((key, index) => {
          if (typeof linkStructure[key] === "object") {
            return this.renderDropDown(key, linkStructure[key], true);
          } else {
            return (
              <NavItem key={index}>
                <NavLink href={linkStructure[key]}>{key}</NavLink>
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
        key={name}>
        <DropdownToggle tag={"span"} nav={nav} caret>
          {name}
        </DropdownToggle>
        <DropdownMenu right className="px-3">
          {Object.keys(items).map((key, index) => {
            if (typeof items[key] === "object")
              return (
                <DropdownItem toggle={false} className="py-2" key={index}>
                  {this.renderDropDown(key, items[key], false)}
                </DropdownItem>
              );
            else {
              return (
                <DropdownItem className="py-2" href={items[key]} key={index}>
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

KNavbarOld.propTypes = {
  links: PropTypes.array,
  items: PropTypes.array,
  brandTitle: PropTypes.string,
  dynamic: PropTypes.bool,
  light: PropTypes.bool,
  color: PropTypes.string,
  colorExtended: PropTypes.string,
  className: PropTypes.string,
  collapseClassName: PropTypes.string,
  fixed: PropTypes.string,
};

////// EXPORTS //////
const mapStateToProps = (state) => ({
  context: state.context,
});

export default connect(mapStateToProps, { setNavbarHeight })(KNavbarOld);
