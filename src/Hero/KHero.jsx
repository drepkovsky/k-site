////// IMPORTS //////

//// EXTERNAL ////
import styled, { css } from "styled-components";

//// INTERNAL ////
import { component } from "../Libs/styles";

////// COMPONENT //////
export const heroSizes = {
  medium: "medium",
  large: "large",
  fullHeight: "fullheight",
};

export const KHeroBody = styled.div`
  position: relative;
  z-index: 2;

  ${component}
`;

export const KHero = styled.div`
  position: relative;
  width: 100%;

  ${KHeroBody} {
    padding: ${({ size }) =>
        size == heroSizes.medium
          ? "9rem"
          : size == heroSizes.large
          ? "18rem"
          : "3rem"}
      1.5rem;
    min-height: ${({ size }) => (size == heroSizes.fullHeight ? "100vh" : "")};

    ${({ size }) => {
      if (size == heroSizes.fullHeight) {
        return css`
          display: flex;
          align-items: center;
        `;
      }
    }}
  }

  text-align: start;

  ${component};
`;
