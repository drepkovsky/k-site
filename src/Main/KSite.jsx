////// IMPORTS //////

//// EXTERNAL ////
import { Provider } from "react-redux";
import store from "../redux/store";
import "bootstrap/dist/css/bootstrap.min.css";

// React
import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Reactstrap
import KNavbar from "../Navbar/KNavbar";

/////STYLES //////
import "./KSite.css";

//// INTERNAL ////
import KPage from "./KPage";
import KSection from "./KSection";
import { setNavbarLinks } from "../redux/actions/act_con";
////// COMPONENT //////

function KSiteBody(props) {
    const { children } = props;
    const [pages, setPages] = useState([]);

    useEffect(() => {
        initNavbarPages();

        document.documentElement.setAttribute("color-theme", "light");
    }, [children]);

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
        navbar = children.find(({ type }) => type === KNavbar);
    }

    return (
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
    );
}

const mapStateToProps = (state) => ({
    context: state.context,
});

const Body = connect(mapStateToProps, { setNavbarLinks })(KSiteBody);

function KSite(props) {
    const { children } = props;
    return (
        <Provider store={store}>
            <Body>{children}</Body>
        </Provider>
    );
}

KSite.propTypes = {};

export default KSite;
