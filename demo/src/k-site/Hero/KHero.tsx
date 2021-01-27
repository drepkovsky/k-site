////// IMPORTS //////

//// EXTERNAL ////
import styled, { css } from "styled-components";

//// INTERNAL ////
import { component, KStatefulComponentProps } from "../Theming/KStyles";

////// COMPONENT //////

export const KHeroBody = styled.div<KStatefulComponentProps>`
  position: relative;
  z-index: 1;

  ${component}
`;

interface Sizes {
  size?: "medium" | "large" | "fullheight";
}

export const KHero = styled.div<KStatefulComponentProps & Sizes>`
  position: relative;
  width: 100%;

  ${KHeroBody} {
    padding: ${({ size }) =>
        size == "medium" ? "9rem" : size == "large" ? "18rem" : "3rem"}
      1.5rem;
    min-height: ${({ size }) => (size == "fullheight" ? "100vh" : "")};

    ${({ size }) => {
      if (size == "fullheight") {
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
