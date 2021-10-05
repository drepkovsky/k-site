////// IMPORTS //////

//// EXTERNAL ////
import PropTypes from "prop-types";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { createGlobalStyle, ThemeProvider } from "styled-components";

// React
import React, { useState, useEffect, useContext, createContext, ReactNode } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//// INTERNAL ////
import { initAnimListener } from "./redux/actions/act_con";

import { Display1, Display2, Display3, Display4 } from "./Atoms/KComponent";
import { getTheme } from "./Theming/KThemes";

//STYLE

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


const KSiteRouteContext = createContext<{pages:{[key:string]:ReactNode},setPages:((val:{[key:string]:ReactNode})=>void) |null}>({ pages: {}, setPages: null });
export const useKSiteRoute = () => {
  return useContext(KSiteRouteContext);
};


export const KRouter :React.FC = ({children}) => {

  const [pages, setPages] = useState<{[key:string]:ReactNode}>({});

 return  <KSiteRouteContext.Provider value={{ pages, setPages }}>
          {children}
            <BrowserRouter>
            {Object.keys(pages).map((key, index) => {
              return (
                <Switch key={index}>
                  <Route
                    path={key}
                    exact
                    render={() => {
                      return pages[key];
                    }}
                    />
                </Switch>
              );
            })}
          </BrowserRouter>
    </KSiteRouteContext.Provider>;
}


const KSiteBody: React.FC<{accentColor:string,optionalColors:{[key:string]:string}}> = ({ children, accentColor, optionalColors }) => {

  const [theme,setTheme] = useState(getTheme( accentColor, optionalColors));


  const dispatch = useDispatch();


  useEffect(() => {
    setTheme(getTheme(accentColor, optionalColors));
  }, [accentColor, optionalColors]);

  useEffect(() => {
    dispatch(initAnimListener());
  }, []);

  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <div className="k-site">
          {children}
        </div>
    </ThemeProvider>
  );
}


const KSite: React.FC<{accentColor:string,optionalColors:{[key:string]:string}}> = ({ children, accentColor, optionalColors }) => {
  useEffect(() => {
    initDependencies();
  }, []);

  return (
    <Provider store={store}>
      <KSiteBody accentColor={accentColor} optionalColors={optionalColors}>
        {children}
      </KSiteBody>
    </Provider>
  );
}

export default KSite;
