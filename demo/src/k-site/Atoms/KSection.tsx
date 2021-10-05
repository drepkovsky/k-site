////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { useEffect, useState } from "react";

// Reactstrap
import styled from "styled-components";
import { component } from "../Theming/KStyles";
import { KStatefulComponentProps } from "./../Theming/KStyles";

//// INTERNAL ////

////// COMPONENT //////
const KSectionWrapper = styled.section<KStatefulComponentProps>`
  padding-top: 4rem;
  ${component}
`;


const KSection: React.FC<KStatefulComponentProps> = (props) => {
  const { className, children} = props;


  return (
    <KSectionWrapper
      {...props}
      className={`k-section ${className || ""}`}>
      {children}
    </KSectionWrapper>
  );
};

////// EXPORTS //////
export default KSection;
