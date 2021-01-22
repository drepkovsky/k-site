////// IMPORTS //////

//// EXTERNAL ////
import { Provider } from "react-redux";
import store from "./redux/store";
import WebFont from "webfontloader";
import { createGlobalStyle, ThemeProvider } from "styled-components";

// React
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//// INTERNAL ////
import { KNavbarUncontrolled, KNavbar } from "./Navbar/KNavbar";
import KPage from "./Atoms/KPage";
import KSection from "./Atoms/KSection";
import { mapToNavbar, initAnimListener } from "./redux/actions/act_con";
import { useTheme } from "./Theming/KThemes";
import { uuidv4 } from "./Libs/KLib";

//STYLE
import "./index.css";

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
  font-size:16px;
  font-family: ${({ theme }) => theme.font}, sans-serif;
  font-weight:500;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.body};
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
    props.initAnimListener();
  }, []);

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
  }, [additionalThemes, currentTheme]);

  //find all pages and sections that have to be shown in navbar
  const initNavbarPages = () => {
    //find all pages
    const pgs = [].concat(children).filter(({ type }) => type === KPage);

    const nav = {};
    //array of links suitable for navbar
    pgs.map((pg, index) => {
      if (pg.props.navbar) {
        const name = pg.props.name || "SET NAME " + index;
        const route = pg.props.route || "/setpath" + index;
        nav[uuidv4()] = {
          name,
          route,
        };
      }

      //find sections of each page suitable for navbar
      if (pg.props.children) {
        const sections = []
          .concat(pg.props.children)
          .filter(({ type }) => type === KSection);

        sections.map((sec, i) => {
          if (sec.props.navbar) {
            const name = sec.props.name || "SET NAME " + i;
            const route = sec.props.route || "#setpath" + i;
            nav[uuidv4()] = {
              name,
              route,
            };
          }
        });
      }
    });

    props.mapToNavbar(nav);
    setPages(pgs);
  };

  var navbar;
  if (Array.isArray(children)) {
    navbar = children.find(
      ({ type }) => type === KNavbarUncontrolled || type === KNavbar
    );
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

const Body = connect(mapStateToProps, { mapToNavbar, initAnimListener })(
  KSiteBody
);

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
