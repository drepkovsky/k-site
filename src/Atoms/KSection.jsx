////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Reactstrap
import styled, { ThemeProvider } from "styled-components";
import { component } from "../Libs/styles";

//// INTERNAL ////

////// COMPONENT //////
const KSectionWrapper = styled.section`
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-color: ${({ theme }) => theme.colors.body};
  color: ${({ theme }) => theme.colors.text};

  ${component}
`;

const KSection = (props) => {
  const { className, customTheme, children, route } = props;

  const [id, setId] = useState("");

  useEffect(() => {
    if (route) {
      let tmpId = route.split("/");
      tmpId = tmpId[tmpId.length - 1].split("#");
      tmpId = tmpId[tmpId.length - 1];
      setId(tmpId);
    }
  }, []);

  const body = () => {
    return (
      <KSectionWrapper
        {...props}
        id={id}
        className={`k-section ${className || ""}`}>
        {children}
      </KSectionWrapper>
    );
  };

  if (customTheme) {
    return <ThemeProvider theme={customTheme}>{body()}</ThemeProvider>;
  }
  return body();
};

KSection.propTypes = {
  route: PropTypes.string,
  name: PropTypes.string,
  navbar: PropTypes.bool,
  customTheme: PropTypes.object,
};

////// EXPORTS //////
export default KSection;
