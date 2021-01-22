import styled from "styled-components";
import { bootstrapQuery, component } from "../Libs/styles";

export const KRow = styled.div.attrs((props) => ({
  mx: props.mx || "-15px",
}))`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  ${component}
`;

export const KCol = styled.div.attrs((props) => ({
  px: props.px || "15px",
  pb: props.pb || "15px",
  w: props.w || "100%",
}))`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 100%;

  ${({ xs, sm, md, lg, xl }) => {
    let result = "";

    if (xs)
      result += `${bootstrapQuery.xs} {
        flex: 0 0 ${colPercentage(xs)};
        max-width:${colPercentage(xs)};
        ${xs.offset ? `margin-left:${colPercentage(xs.offset)}` : ""}
    }`;
    if (sm)
      result += `${bootstrapQuery.sm} {
        flex: 0 0 ${colPercentage(sm)};
        max-width:${colPercentage(sm)};
        ${sm.offset ? `margin-left:${colPercentage(sm.offset)}` : ""}
    }`;
    if (md)
      result += `${bootstrapQuery.md} {
        flex: 0 0 ${colPercentage(md)};
        max-width:${colPercentage(md)};
        ${md.offset ? `margin-left:${colPercentage(md.offset)}` : ""}
    }`;
    if (lg)
      result += `${bootstrapQuery.lg} {
        flex: 0 0 ${colPercentage(lg)};
        max-width:${colPercentage(lg)};
        ${lg.offset ? `margin-left:${colPercentage(lg.offset)}` : ""}
    }`;
    if (xl) {
      result += `${bootstrapQuery.xl} {
        flex: 0 0 ${colPercentage(xl)};
        max-width:${colPercentage(xl)};
        ${xl.offset ? `margin-left:${colPercentage(xl.offset)}` : ""}
      }`;
    }

    return result;
  }}
  ${component};
`;

const colPercentage = (col) => {
  let tmp = col;

  if (typeof tmp == "string") {
    if (isNaN(tmp)) tmp = 12;
    else tmp = parseInt(col);
  } else if (typeof tmp === "object") {
    if (tmp.size) {
      return colPercentage(tmp.size);
    } else tmp = 12;
  }

  return `${(Math.max(1, Math.min(tmp, 12)) / 12).toFixed(2) * 100}%`;
};
