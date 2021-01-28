import styled from "styled-components";
import { bootstrapQueryMin, component } from "../Theming/KStyles";
import { KStatefulComponentProps } from "./../Theming/KStyles";

export const KRow = styled.div.attrs((props: KStatefulComponentProps) => ({
  mx: props.mx || "-15px",
}))<KStatefulComponentProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  ${component}
`;

type Col = string | number | ColObj;

export interface ColObj {
  offset?: string | number;
  size?: string | number;
}

export interface KColProps {
  xs?: Col;
  sm?: Col;
  md?: Col;
  lg?: Col;
  xl?: Col;
}

export const KCol = styled.div.attrs(
  (props: KStatefulComponentProps & KColProps) => ({
    px: props.px || "15px",
    pb: props.pb || "15px",
    w: props.w || "100%",
  })
)<KStatefulComponentProps & KColProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  ${({ xs, sm, md, lg, xl }: KColProps) => {
    let result = "";

    if (xs)
      result += `${bootstrapQueryMin.xs} {
        flex: 0 0 ${colPercentage(xs)};
        max-width:${colPercentage(xs)};
        ${
          typeof xs === "object"
            ? xs.offset
              ? `margin-left:${colPercentage(xs.offset)}`
              : ""
            : ""
        }
    }`;
    if (sm)
      result += `${bootstrapQueryMin.sm} {
        flex: 0 0 ${colPercentage(sm)};
        max-width:${colPercentage(sm)};
        ${
          typeof sm === "object"
            ? sm.offset
              ? `margin-left:${colPercentage(sm.offset)}`
              : ""
            : ""
        }
    }`;
    if (md)
      result += `${bootstrapQueryMin.md} {
        flex: 0 0 ${colPercentage(md)};
        max-width:${colPercentage(md)};
        ${
          typeof md === "object"
            ? md.offset
              ? `margin-left:${colPercentage(md.offset)}`
              : ""
            : ""
        }
    }`;
    if (lg)
      result += `${bootstrapQueryMin.lg} {
        flex: 0 0 ${colPercentage(lg)};
        max-width:${colPercentage(lg)};
        ${
          typeof lg === "object"
            ? lg.offset
              ? `margin-left:${colPercentage(lg.offset)}`
              : ""
            : ""
        }
    }`;
    if (xl) {
      result += `${bootstrapQueryMin.xl} {
        flex: 0 0 ${colPercentage(xl)};
        max-width:${colPercentage(xl)};
        ${
          typeof xl === "object"
            ? xl.offset
              ? `margin-left:${colPercentage(xl.offset)}`
              : ""
            : ""
        }
      }`;
    }

    return result;
  }}
  ${component};
`;

const colPercentage: (col: Col) => string = (col: Col) => {
  let tmp: number = 12;

  if (typeof col === "string") {
    if (Number(col) != NaN) tmp = parseInt(col);
  } else if (typeof col === "object") {
    if (col.size) {
      return colPercentage(col.size);
    } else tmp = 12;
  } else if (typeof col === "number") tmp = col;

  return `${((Math.max(1, Math.min(tmp, 12)) / 12) * 100).toFixed(2)}%`;
};
