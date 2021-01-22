////// IMPORTS //////
import styled from "styled-components";
import { component } from "../Libs/styles";
import KSpinner from "./KSpinner";
import React, { useState, useEffect } from "react";

////// COMPONENT //////
export const KImage = styled.img`
  ${component}
`;

export const KLazyImage = (props) => {
  const { src, spinner = true } = props;

  const [sourceLoaded, setSourceLoaded] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  if (sourceLoaded) {
    return <KImage {...props} />;
  } else {
    if (spinner) {
      return <KSpinner />;
    }
  }
};

////// EXPORTS //////
