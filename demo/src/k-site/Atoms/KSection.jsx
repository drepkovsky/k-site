////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Reactstrap
import styled, { ThemeProvider } from "styled-components";
import { component } from "../Libs/styles";
import { useTheme } from "../Theming/KThemes";

//// INTERNAL ////

////// COMPONENT //////
const KSectionWrapper = styled.section.attrs((props) => ({
  // bg: props.bg || props.theme.colors.background,
  // color: props.color || props.theme.colors.text,
}))`
  padding-top: 4rem;
  ${component}
`;

const KSection = (props) => {
  const { className, accentColor, optionalColors, children, route } = props;

  const [id, setId] = useState("");

  useEffect(() => {
    if (route) {
      let tmpId = route.split("/");
      tmpId = tmpId[tmpId.length - 1].split("#");
      tmpId = tmpId[tmpId.length - 1];
      setId(tmpId);
    }
  }, []);

  // useEffect(() => {
  //   setTheme(getTheme(accentColor, optionalColors));
  // }, [accentColor, optionalColors]);

  return (
    <KSectionWrapper
      {...props}
      id={id}
      className={`k-section ${className || ""}`}>
      {children}
    </KSectionWrapper>
  );
};

KSection.propTypes = {
  route: PropTypes.string,
  name: PropTypes.string,
  navbar: PropTypes.bool,
  accentColor: PropTypes.string,
  optionalColors: PropTypes.object,
};

////// EXPORTS //////
export default KSection;
