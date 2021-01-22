////IMPORTS
import styled, { css } from "styled-components";
///INTERNAL
import { component, bootstrapQuery } from "../Libs/styles";

const KContainer = styled.div`
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
      result += `${bootstrapQuery.sm} {
        max-width: 540px;
    }`;
    if (!lg && !xl)
      result += `${bootstrapQuery.md} {
        max-width: 720px;
    }`;
    if (!xl)
      result += `${bootstrapQuery.lg} {
        max-width: 960px;
    }`;
    result += `${bootstrapQuery.xl} {
      max-width: 1140px;
    }`;

    return result;
  }}
  ${component};
`;

export default KContainer;
