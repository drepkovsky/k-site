////// IMPORTS //////
import styled from "styled-components";
import { component } from "../Theming/KStyles";
import React, { useState, useEffect, HTMLAttributes } from "react";
import { Ghost } from "./KComponent";
import { KStatefulComponentProps } from "./../Theming/KStyles";

////// COMPONENT //////
export const KImage = styled.img<KStatefulComponentProps>`
  ${component}
`;

export const KLazyImage: React.FC<
  KStatefulComponentProps & React.ImgHTMLAttributes<HTMLImageElement>
> = (props) => {
  const { src } = props;

  const [sourceLoaded, setSourceLoaded] = useState(false);

  const updateSourceLoad = () => {
    setSourceLoaded(true);
  };

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;
      setSourceLoaded(false);
      img.addEventListener("load", updateSourceLoad);
      return () => {
        img.removeEventListener("load", updateSourceLoad);
      };
    }
  }, [src]);

  if (sourceLoaded) {
    return <KImage {...props} />;
  } else return <Ghost minH="300px" w={100} height={100}></Ghost>;
};

////// EXPORTS //////
