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

interface KSectionProps {
  route: string;
  name: string;
  navbar: boolean;
}

const KSection: React.FC<KStatefulComponentProps & KSectionProps> = (props) => {
  const { className, children, route } = props;

  const [id, setId] = useState("");

  useEffect(() => {
    if (route) {
      let tmpId: string | string[] = route.split("/");
      tmpId = tmpId[tmpId.length - 1].split("#");
      tmpId = tmpId[tmpId.length - 1];
      setId(tmpId);
    }
  }, []);

  return (
    <KSectionWrapper
      {...props}
      id={id}
      className={`k-section ${className || ""}`}>
      {children}
    </KSectionWrapper>
  );
};

////// EXPORTS //////
export default KSection;
