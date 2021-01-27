////IMPORTS
import styled, { css } from "styled-components";
///INTERNAL
import { component, bootstrapQueryMin } from "../Theming/KStyles";
import { KStatefulComponentProps } from "./../Theming/KStyles";

export const KContainerCss = css<KStatefulComponentProps & { fluid?: boolean }>`
  width: 100%;

  ${({ fluid }) => {
    if (fluid) return "";
    return css`
      padding-right: 1rem;
      padding-left: 1rem;
    `;
  }}
  margin-right: auto;
  margin-left: auto;

  ${({ md, lg, xl }) => {
    let result = "";

    if (!md && !lg && !xl)
      result += `${bootstrapQueryMin.sm} {
      max-width: 540px;
  }`;
    if (!lg && !xl)
      result += `${bootstrapQueryMin.md} {
      max-width: 720px;
  }`;
    if (!xl)
      result += `${bootstrapQueryMin.lg} {
      max-width: 960px;
  }`;
    result += `${bootstrapQueryMin.xl} {
    max-width: 1140px;
  }`;

    return result;
  }}
`;
const KContainer = styled.div<KStatefulComponentProps & { fluid?: boolean }>`
  width: 100%;
  ${KContainerCss}
  ${component};
`;

export default KContainer;
