////// IMPORTS //////

//// EXTERNAL ////
import { Provider } from "react-redux";
import store from "./redux/store";
import WebFont from "webfontloader";
import { createGlobalStyle, ThemeProvider } from "styled-components";

// React
import { useState, useEffect } from "react";
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
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  font-size:16px;
  font-weight: ${({ theme }) => theme.weights.regular};
  font-family: ${({ theme }) => theme.font}, sans-serif;
*{

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.colors["background-8"]};
  border-radius:3px;
}

::-webkit-scrollbar-thumb {
  background:  ${({ theme }) => theme.colors["background-7"]};
  border-radius:3px;
}

::-webkit-scrollbar-thumb:hover {
  background: ${({ theme }) => theme.colors["background-6"]};
}
}

}

a {
    color: ${({ theme }) => theme.colors.link};
    cursor: pointer;
  }

`;

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

  console.log(theme);

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
    initIcons();
  });

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
