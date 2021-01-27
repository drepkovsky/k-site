////// IMPORTS //////

//// EXTERNAL ////
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

// React
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";

// Reactstrap

import KIcon from "../Atoms/KIcon";
import {
  component,
  bootstrapQueryMin,
  KStatefulComponentProps,
} from "../Theming/KStyles";
import { KContainerCss } from "../Atoms/KContainer";
////// COMPONENT //////

const NavCollapse = styled.div<KStatefulComponentProps>`
  align-items: center;
  width: 100%;
  display: block;
  overflow: hidden;

  &:not(.show) {
    display: none;
  }

  ${component}
`;

interface KNavbarCollapseProps {
  isOpen?: boolean;
}

export const KNavbarCollapse: React.FC<
  KStatefulComponentProps & KNavbarCollapseProps
> = (props) => {
  const { isOpen, children } = props;

  const show = isOpen ? "show" : "";

  return <NavCollapse className={`${show} `}>{children}</NavCollapse>;
};

export const KNavLink = styled.a<KStatefulComponentProps>`
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

export const KNavItem = styled.li<KStatefulComponentProps>`
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
export const KNavItems = styled.ul<KStatefulComponentProps>`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  flex-wrap: wrap;

  ${component}
`;

export const KNavbarBrand = styled.a<KStatefulComponentProps>`
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

interface KNavProps {
  container?: boolean;
}

export const KNav = styled.nav<KNavProps & KStatefulComponentProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;

  ${({ container }) => {
    if (container) return KContainerCss;
    else return "";
  }}

  ${component};
`;

export const KNavbarToggler = styled.button<KStatefulComponentProps>`
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

interface NavbarTogglerProps {
  toggle?: () => void;
}

const NavbarToggler: React.FC<KStatefulComponentProps & NavbarTogglerProps> = (
  props
) => {
  const { toggle = () => {}, color, bg, children } = props;

  return (
    <KNavbarToggler onClick={toggle} bg={bg} color={color}>
      {children}
    </KNavbarToggler>
  );
};

interface KNavbarProps extends KStatefulComponentProps {
  expand: "xs" | "sm" | "md" | "lg" | "xl";
  scrolledProps: KStatefulComponentProps;
  className: string;
  isOpen: boolean;
}

const Navbar = styled.div<KNavbarProps>`
  transition: all 0.2s ease-in-out;
  z-index: 30;

  background-color: ${({ theme }) => theme.colors.body};
  color: ${({ theme }) => theme.colors.text};

  left: 0;
  top: 0;
  width: 100%;
  padding: 1rem 0;

  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${({ expand }) =>
    expand &&
    css`
      ${bootstrapQueryMin[expand]} {
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

export const KNavbar: React.FC<KNavbarProps> = (props) => {
  const { children, scrolledProps, position } = props;

  const [isScrolled, setScrolled] = useState(false);

  const updateScroll = () => {
    setScrolled(window.pageYOffset > 10);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, [position]);

  return (
    <Navbar {...props} {...(isScrolled && scrolledProps)}>
      {children}
    </Navbar>
  );
};

interface NavbarRootState {
  context: {
    nav: NavSelector;
  };
}
interface NavSelector {
  [key: string]: {
    route: string;
    name: string;
  };
}

export const KNavbarAutoContent = () => {
  const links: {
    [key: string]: {
      route: string;
      name: string;
    };
  } = useSelector<NavbarRootState, NavSelector>((state) => state.context.nav);

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

interface KNavbarUncontrolledProps extends KNavbarProps {
  brand: string;
  brandLink: string;
  navClassName: string;
  className: string;
  navContainer: boolean;
}

export const KNavbarUncontrolled: React.FC<KNavbarUncontrolledProps> = (
  props
) => {
  //props
  const {
    brand,
    brandLink,
    navClassName,
    navContainer = true,
    ...knavbarProps
  } = props;

  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!isOpen);
  };
  //states

  //effects
  const iconName = isOpen ? "times" : "bars";

  //render
  return (
    <KNavbar {...knavbarProps} className={`${isOpen ? "collapsed" : ""}`}>
      <KNav container={navContainer} className={`${navClassName}`}>
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
};
