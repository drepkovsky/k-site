////// IMPORTS //////

//// EXTERNAL ////
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

// React
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";

// Reactstrap

//// INTERNAL ////
import { colorAlpha } from "../Libs/KColorPalette";

import KIcon from "../Atoms/KIcon";
import { NavLink } from "react-router-dom";
import { component, bootstrapQuery } from "../Libs/styles";
////// COMPONENT //////

const NavCollapse = styled.div`
  align-items: center;
  width: 100%;
  display: block;
  overflow: hidden;

  &:not(.show) {
    display: none;
  }

  ${component}
`;

export const KNavbarCollapse = (props) => {
  const { isOpen, children } = props;
  const [isOpening, setOpening] = useState(false);

  const show = isOpen ? "show" : "";
  let collapse = "";
  if (isOpen != isOpening) {
    collapse = "collapsing";
    setOpening(isOpen);
  }

  return (
    <NavCollapse className={`${show} ${collapse}`}>
      {collapse} {children}
    </NavCollapse>
  );
};

export const KNavLink = styled.a`
  font-size: 1rem;
  color: inherit;
  white-space: nowrap;
  width: 100%;
  text-align: start;

  &:hover {
    text-decoration: none;
    color: inherit;
    opacity: 0.8;
  }
  padding: 0.5rem;
  ${component}
`;

export const KNavItem = styled.li`
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  :last-child {
    ${KNavLink} {
      padding-right: 0;
    }
  }
  ${component}
`;
export const KNavItems = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  flex-wrap: wrap;

  ${component}
`;

export const KNavbarBrand = styled.a`
  font-size: 1.3rem;
  color: inherit;
  white-space: nowrap;
  padding: 0 0.5rem;

  :first-child {
    padding-left: 0;
  }
  :last-child {
    padding-left: 0;
  }

  &:hover {
    text-decoration: none;
    color: inherit;
    opacity: 0.8;
  }
  ${component}
`;

export const KNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  ${component}
`;

export const KNavbarToggler = styled.button`
  background: none;
  border: none;
  color: inherit;
  padding: 0;

  &:hover {
    border: none;
    color: inherit;
    opacity: 0.8;
  }
  &:focus {
    border: none;
    outline: none;
  }

  ${component}
`;

const NavbarToggler = (props) => {
  const { toggle, color, bg, children } = props;

  return (
    <KNavbarToggler onClick={toggle} bg={bg} color={color}>
      {children}
    </KNavbarToggler>
  );
};

KNavbarToggler.defaultProps = {
  toggle: () => {},
  bg: "",
  color: "",
};

KNavbarToggler.propTypes = {
  toggle: PropTypes.func,
  bg: PropTypes.string,
  color: PropTypes.string,
};

const Navbar = styled.div`
  transition: all 0.2s ease-in-out;
  z-index: 30;

  background-color: ${({ theme }) => theme.colors.body};
  color: ${({ theme }) => theme.colors.text};

  left: 0;
  top: 0;
  width: 100%;
  padding: 1rem 0;

  position: ${({ fixed, sticky }) =>
    fixed ? "fixed" : sticky ? "sticky" : "relative"};
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${({ expand }) =>
    expand &&
    css`
      ${bootstrapQuery[expand]} {
        flex-wrap: nowrap;

        ${NavCollapse} {
          display: flex;
          justify-content: flex-end;
        }

        ${KNavbarToggler} {
          display: none;
        }

        ${KNav} {
          flex-wrap: nowrap;
        }

        ${KNavItem} {
          flex: 0 0 auto;
          width: auto;
        }

        ${KNavItems} {
          flex-wrap: none;
        }
      }
    `}

  ${component}
`;

export const KNavbar = (props) => {
  const { fixed, children, scrolledProps } = props;

  const [isScrolled, setScrolled] = useState(false);

  const updateScroll = () => {
    setScrolled(window.pageYOffset > 10);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, [fixed]);

  return (
    <Navbar {...props} {...(isScrolled && scrolledProps)}>
      {children}
    </Navbar>
  );
};

KNavbar.defaultProps = {
  navClassName: "container",

  fixed: true,
  sticky: false,
  expand: "md",
  spaced: "md",

  color: "",
  bg: "",
};

KNavbar.propTypes = {
  className: PropTypes.string,
  navClassName: PropTypes.string,

  fixed: PropTypes.bool,
  sticky: PropTypes.bool,
  expand: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  spaced: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),

  color: PropTypes.string,
  bg: PropTypes.string,
};

export const KNavbarAutoContent = (props) => {
  const links = useSelector((state) => state.context.nav);

  return (
    <Fragment>
      {Object.keys(links).map((key, index) => {
        return (
          <KNavItem key={index}>
            <KNavLink href={links[key].route}>{links[key].name}</KNavLink>
          </KNavItem>
        );
      })}
    </Fragment>
  );
};

export function KNavbarUncontrolled(props) {
  //props
  const { brand, brandLink, navClassName } = props;

  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!isOpen);
  };
  //states

  //effects
  const iconName = isOpen ? "times" : "bars";

  //render
  return (
    <KNavbar className={`${isOpen ? "collapsed" : ""}`} {...props}>
      <KNav className={`${navClassName}`}>
        <KNavbarBrand weight="bold" href={brandLink}>
          {brand}
        </KNavbarBrand>
        <NavbarToggler toggle={toggle}>
          <KIcon size={1.2} prefix="fa" name={iconName} />
        </NavbarToggler>
        <KNavbarCollapse isOpen={isOpen}>
          <KNavItems>
            <KNavbarAutoContent />
          </KNavItems>
        </KNavbarCollapse>
      </KNav>
    </KNavbar>
  );
}

KNavbarUncontrolled.defaultProps = {
  className: "",
  navClassName: "container",

  fixed: false,
  sticky: false,
  expand: "md",
  spaced: "md",

  brand: "",
  brandLink: "/",

  color: "",
  bg: "",
  scrolledProps: {},
};

KNavbarUncontrolled.propTypes = {
  className: PropTypes.string,
  navClassName: PropTypes.string,

  fixed: PropTypes.bool,
  sticky: PropTypes.bool,
  expand: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  spaced: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),

  brandLogo: PropTypes.string,
  brand: PropTypes.string,
  brandLink: PropTypes.string,

  color: PropTypes.string,
  bg: PropTypes.string,
  bgScroll: PropTypes.string,
  scrolledProps: PropTypes.object,
};
