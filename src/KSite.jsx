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

import { Display1, Display2, Display3, Display4 } from "./Atoms/KComponent";

//STYLE
import "./index.css";

const GlobalStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  body{
    margin:0;
    line-height: 1.5;
    text-align: center;
    font-size:16px;
    font-weight: ${({ theme }) => theme.weights.regular};
    font-family: ${({ theme }) => theme.font}, sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

  *{
    box-sizing:border-box;
    }

  }

  h1,h2,h3,h4,h5{
    margin-bottom: 0.5rem;
    margin-top:0;
    font-weight: ${({ theme }) => theme.weights.regular};
    line-height: 1.2;
  }

  h1{
    font-size: 2.5rem;
  }
  h2{
    font-size: 2rem;
  }
  h3{
    font-size: 1.75rem;
  }
  h4{
    font-size: 1.5rem;
  }
  h5{
    font-size: 1.25rem;
  }

  @media (max-width: 1200px) {
    h1{
      font-size: calc(1.375rem + 1.5vw);
    }
    h2{
      font-size: calc(1.325rem + 0.9vw);
    }
    h3{
      font-size: calc(1.3rem + 0.6vw);
    }
    h4{
      font-size: calc(1.275rem + 0.3vw);
    }

    ${Display1}{
      font-size: calc(1.725rem + 5.7vw);
    }
    ${Display2}{
      font-size: calc(1.675rem + 5.1vw);
    }
    ${Display3}{
      font-size: calc(1.575rem + 3.9vw);
    }
    ${Display4}{
      font-size: calc(1.475rem + 2.7vw);
    }
  }

  a {
      text-decoration:none;
      color: ${({ theme }) => theme.colors.link};
      cursor: pointer;
    }

  `;
const initDependencies = () => {
  //font awesome
  let fontAwesome = document.createElement("script");
  fontAwesome.src = "https://kit.fontawesome.com/556066db54.js";
  fontAwesome.crossOrigin = "anonymous";
  document.body.appendChild(fontAwesome);

  //datePicker
  let datePickerCss = document.createElement("link");
  datePickerCss.rel = "stylesheet";
  datePickerCss.href = "https://unpkg.com/react-day-picker/lib/style.css";
  document.head.appendChild(datePickerCss);
};

function KSiteBody(props) {
  const { children, optionalColors, accentColor } = props;
  const { getFonts, getTheme, setMainTheme } = useTheme();
  const [pages, setPages] = useState([]);
  const [theme, setTheme] = useState();

  useEffect(() => {
    props.initAnimListener();
  }, []);

  useEffect(() => {
    initNavbarPages();
  }, [children]);

  useEffect(() => {
    setTheme(setMainTheme(accentColor, optionalColors));

    WebFont.load({
      google: {
        families: getFonts(),
      },
    });
  }, [optionalColors, accentColor]);

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

  if (theme)
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
  return "";
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
    initDependencies();
  }, []);

  return (
    <Provider store={store}>
      <Body {...props}>{children}</Body>
    </Provider>
  );
}

KSite.propTypes = {
  optionalColors: PropTypes.object,
  accentColor: PropTypes.string,
};

export default KSite;
