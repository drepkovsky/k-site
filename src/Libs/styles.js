import { result } from "lodash";
import { css } from "styled-components";
import { getContrast } from "../Theming/KColorPalette";
import { getColor, getFontWeight } from "../Theming/KThemes";

export const bootstrapSizes = {
  xs: 0,
  sm: 576,
  md: 720,
  lg: 960,
  xl: 1140,
};

export const bootstrapQuery = {
  xs: `@media (min-width: ${bootstrapSizes.xs}px)`,
  sm: `@media (min-width: ${bootstrapSizes.sm}px)`,
  md: `@media (min-width: ${bootstrapSizes.md}px)`,
  lg: `@media (min-width: ${bootstrapSizes.lg}px)`,
  xl: `@media (min-width: ${bootstrapSizes.xl}px)`,
};

export const getBootstrapSizes = (width = window.innerWidth) => {
  return {
    xs: true,
    sm: width > 576,
    md: width > 720,
    lg: width > 960,
    xl: width > 1140,
  };
};

const unit = (str, defaultUnit) => {
  if (!isNaN(str)) {
    return str + defaultUnit;
  }
  return str;
};

export const component = css`
  ${(props) => {
    return `${properties(props, props.theme)} ${responsive(
      props,
      props.theme
    )} ${states(props, props.theme)}`;
  }}
`;

const properties = (props, theme) => {
  return `${widthStyle(props)} ${heightStyle(props)} ${colors(
    props,
    theme
  )} ${border(props)} ${padding(props)} ${margin(props)} ${weight(
    props,
    theme
  )} ${radius(props)} ${elevation(props)} ${gradient(props, theme)} ${textAlign(
    props
  )} ${display(props)} ${lineH(props)} ${flex(props)}
  `;
};

const states = (props, theme) => {
  return `${hover(props, theme)} ${active(props, theme)}`;
};

const gradient = ({ gradient }, theme) => {
  if (gradient) {
    let result = "linear-gradient(";
    if (gradient.deg) result += gradient.deg + "deg,";
    else result += "90deg,";

    if (gradient.colors) {
      gradient.colors.map((c, index) => {
        result += getColor(c, theme);
        if (index < gradient.colors.length - 1) {
          result += ",";
        }
      });
    }

    result += ")";
    return `background : ${result};`;
  }
  return "";
};

const responsive = (props, theme) => {
  const { xs, sm, md, lg, xl } = props;

  let result = ``;

  if (xs) {
    result += `
  ${bootstrapQuery.xs}{
    ${properties(xs, theme)}
    ${states(xs, theme)}
  }
    `;
  }
  if (sm) {
    result += `
  ${bootstrapQuery.sm}{
    ${properties(sm, theme)}
    ${states(sm, theme)}
  } `;
  }
  if (md) {
    result += `
  ${bootstrapQuery.md}{
    ${properties(md, theme)}
    ${states(md, theme)}
  } `;
  }
  if (lg) {
    result += `
  ${bootstrapQuery.lg}{
    ${properties(lg, theme)}
    ${states(lg, theme)}
  } `;
  }
  if (xl) {
    result += `
  ${bootstrapQuery.xl}{
    ${properties(xl, theme)}
    ${states(xl, theme)}
  } `;
  }

  return result;
};

export const defaultQueryOnStates = (query, states) => {};

const hover = (props, theme) => {
  const { hover } = props;

  if (hover) {
    return `
    &:hover {
      ${properties(hover, theme)}
    }
  `;
  }
  return "";
};
const active = (props, theme) => {
  const { active } = props;

  if (active) {
    return `
    &:active {
      ${properties(active, theme)}
    }
  `;
  }
  return "";
};

const widthStyle = ({ width, maxWidth }) => {
  let result = "";
  if (width)
    result += `width: ${unit(width, "%")};
  `;
  if (maxWidth)
    result += `max-width: ${unit(maxWidth, "%")};
  `;
  return result;
};
const heightStyle = ({ height, maxHeight }) => {
  let result = "";
  if (height)
    result += `height: ${unit(height, "%")};
  `;
  if (maxHeight)
    result += `max-height: ${unit(maxHeight, "%")};
  `;
  return result;
};

const col = (color) => {
  if (color) return `color: ${color};`;
  return "";
};

const background = (bg) => {
  if (bg) return `background-color: ${bg};`;
  return "";
};

const weight = ({ weight }, theme) => {
  if (weight) return `font-weight: ${getFontWeight(weight, theme)};`;
  else return "";
};

const colors = ({ gradient, color, bg, borderColor }, theme) => {
  let tmpBg = getColor(bg, theme);
  let tmpC = getColor(color, theme);
  let tmpBc = getColor(borderColor, theme);
  let result = "";

  if (tmpBg) {
    if (color == "contrast") tmpC = getContrast(tmpBg);
    if (borderColor == "contrast") tmpBc = getContrast(tmpBg);
  }
  if (gradient) {
    if (color == "contrast") tmpC = getContrast(getColor(gradient.colors[0]));
    if (borderColor == "contrast")
      tmpBc = getContrast(getColor(gradient.colors[0]));
  }

  result += col(tmpC);
  result += background(tmpBg);
  result += borderCol(tmpBc);

  return result;
};

const padding = ({ pl, pr, pt, pb, px, py, p }) => {
  let result = "";
  if (p) result += `padding: ${unit(p, "rem")};`;

  if (pl || px) {
    if (pl) result += `padding-left: ${unit(pl, "rem")};`;
    else result += `padding-left: ${unit(px, "rem")};`;
  }
  if (pr || px) {
    if (pr) result += `padding-right: ${unit(pr, "rem")};`;
    else result += `padding-right: ${unit(px, "rem")};`;
  }
  if (pt || py) {
    if (pt) result += `padding-top: ${unit(pt, "rem")};`;
    else result += `padding-top: ${unit(py, "rem")};`;
  }
  if (pb || py) {
    if (pb) result += `padding-bottom: ${unit(pb, "rem")};`;
    else result += `padding-bottom: ${unit(py, "rem")};`;
  }

  return result;
};

const margin = ({ ml, mr, mt, mb, mx, my, m }) => {
  let result = "";
  if (m) result += `margin: ${unit(m, "rem")};`;

  if (ml || mx) {
    if (ml) result += `margin-left: ${unit(ml, "rem")};`;
    else result += `margin-left: ${unit(mx, "rem")};`;
  }
  if (mr || mx) {
    if (mr) result += `margin-right: ${unit(mr, "rem")};`;
    else result += `margin-right: ${unit(mx, "rem")};`;
  }
  if (mt || my) {
    if (mt) result += `margin-top: ${unit(mt, "rem")};`;
    else result += `margin-top: ${unit(my, "rem")};`;
  }
  if (mb || my) {
    if (mr) result += `margin-bottom: ${unit(mb, "rem")};`;
    else result += `margin-bottom: ${unit(my, "rem")};`;
  }

  return result;
};

const radius = ({ radius }) => {
  if (radius) return `border-radius:${unit(radius, "rem")};`;
  return "";
};

const border = ({ border, borderWidth }) => {
  if (border) return `border:${border} ${unit(borderWidth, "px")};`;
  else if (border == false) return "border :none;";
  return "";
};
const borderCol = (borderColor) => {
  if (borderColor) return `border-color: ${borderColor};`;
  return "";
};

const elevation = ({ elevate }) => {
  if (elevate) return `box-shadow: 1px 0px 10px ${elevate}px rgba(0,0,0,0.2)`;
  return "";
};

const display = ({ display }) => {
  if (display) return `display:${display};`;
  return "";
};

const textAlign = ({ text }) => {
  if (text) return `text-align:${text};`;
  return "";
};
const lineH = ({ lineHeight }) => {
  if (lineHeight) return `line-height:${unit(lineHeight, "rem")};`;
  return "";
};

const flex = (props) => {
  return `${flexDirStyle(props)} ${justifyContentStyle(
    props
  )} ${alignItemsStyle(props)} ${alignSelfStyle(props)}`;
};

const flexDirStyle = ({ flexDir }) => {
  if (flexDir) return `flex-direction: ${flexDir};`;
  return "";
};

const justifyContentStyle = ({ justifyContent }) => {
  if (justifyContent) return `justify-content: ${justifyContent};`;
  return "";
};
const alignItemsStyle = ({ alignItems }) => {
  if (alignItems) return `align-items: ${alignItems};`;
  return "";
};
const alignSelfStyle = ({ alignSelf }) => {
  if (alignSelf) return `align-self: ${alignSelf};`;
  return "";
};
