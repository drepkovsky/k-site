////// IMPORTS //////

//// EXTERNAL ////
import { Provider } from "react-redux";
import store from "../redux/store";
import WebFont from "webfontloader";

// React
import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Reactstrap
import KNavbarOld from "../Navbar/KNavbarOld";

//// INTERNAL ////
import KPage from "./KPage";
import KSection from "./KSection";
import { setNavbarLinks } from "../redux/actions/act_con";
import { useTheme } from "../Libs/KThemes";
//STYLE
import "../index.css";

import { createGlobalStyle, ThemeProvider } from "styled-components";

const initIcons = () => {
  let fontAwesome = document.createElement("script");
  fontAwesome.src = "https://kit.fontawesome.com/556066db54.js";
  fontAwesome.crossOrigin = "anonymous";
  document.body.appendChild(fontAwesome);
};

export const GlobalStyles = createGlobalStyle`
html {
  scroll-behavior: smooth;
}
body{
  text-align: center;
  font-size:1rem;
  font-family: ${({ theme }) => theme.font}, sans-serif;
  font-weight:500;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.body};
  transition: all 0.50s linear;
}

a {
    color: ${({ theme }) => theme.colors.link};
    cursor: pointer;
  }

`;

function KSiteBody(props) {
  const { children, additionalThemes = {}, currentTheme = "default" } = props;
  const { theme, mergeThemes, getFonts, setCurrentTheme } = useTheme();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    initNavbarPages();
  }, [children]);

  useEffect(() => {
    mergeThemes(additionalThemes);
    setCurrentTheme(currentTheme);

    WebFont.load({
      google: {
        families: getFonts(),
      },
    });
  }, [additionalThemes]);

  //find all pages and sections that have to be shown in navbar
  const initNavbarPages = () => {
    //find all pages
    const pgs = [].concat(children).filter(({ type }) => type === KPage);

    //array of links suitable for navbar
    const navLinks = [];
    pgs.map((pg, index) => {
      if (pg.props.navbar) {
        navLinks.push({
          name: pg.props.name || "SET NAME " + index,
          route: pg.props.route || "/setpath" + index,
        });
      }

      //find sections of each page suitable for navbar
      if (pg.props.children) {
        const sections = []
          .concat(pg.props.children)
          .filter(({ type }) => type === KSection);

        sections.map((sec, i) => {
          if (sec.props.navbar) {
            navLinks.push({
              name: sec.props.name || "SET NAME " + i,
              route: sec.props.route || "#setpath" + i,
            });
          }
        });
      }
    });

    setPages(pgs);
    props.setNavbarLinks(navLinks);
  };

  var navbar;
  if (Array.isArray(children)) {
    navbar = children.find(({ type }) => type === KNavbarOld);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="k-site">
        {navbar}
        <BrowserRouter>
          {pages.map((pg, index) => {
            return (
              <Switch key={index}>
                <Route
                  path={pg.props.route}
                  exact
                  render={() => {
                    return pg;
                  }}
                />
              </Switch>
            );
          })}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  context: state.context,
});

const Body = connect(mapStateToProps, { setNavbarLinks })(KSiteBody);

function KSite(props) {
  const { children } = props;

  useEffect(() => {
    initIcons();
  });

  return (
    <Provider store={store}>
      <Body {...props}>{children}</Body>
    </Provider>
  );
}

KSite.propTypes = {
  additionalThemes: PropTypes.object,
  currentTheme: PropTypes.string,
};

export default KSite;
