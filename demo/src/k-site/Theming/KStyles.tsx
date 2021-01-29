import { css, StyledComponentProps } from "styled-components";
import { getContrast } from "./KColorPalette";
import { getColor, getFontWeight, KTheme } from "./KThemes";

interface Gradient {
  colors: string[];
  deg?: number;
}

export interface KComponentProps {
  style?: {};
  className?: string;
  theme?: KTheme;
  gradient?: Gradient;

  w?: number | string;
  maxW?: number | string;
  minW?: number | string;
  h?: number | string;
  maxH?: number | string;
  minH?: number | string;

  overflow?: "visible" | "hidden" | "clip" | "scroll" | "auto";
  overflowX?: "visible" | "hidden" | "clip" | "scroll" | "auto";
  overflowY?: "visible" | "hidden" | "clip" | "scroll" | "auto";
  overflowWrap?: "normal" | "break-word" | "anywhere";

  color?: string;
  bg?: string;
  borderColor?: string;
  opacity?: number;

  bgImg?: string | string[];
  bgPosition?: string;
  bgRepeat?:
    | "inherit"
    | "initial"
    | "round"
    | "space"
    | "repeat"
    | "no-repat"
    | "repeat-x"
    | "repeat-y";
  bgSize?: "contain" | "cover" | "unset";
  objFit?: "contain" | "cover" | "unset";

  weight?: number | "light" | "semi-light" | "regular" | "semi-bold" | "bold";
  text?: string | "start" | "left" | "center" | "justify" | "end" | "right";
  lineHeight?: string | number;
  fontSize?: string | number;

  p?: string | number;
  px?: string | number;
  py?: string | number;
  pl?: string | number;
  pr?: string | number;
  pt?: string | number;
  pb?: string | number;
  m?: string | number;
  mx?: string | number;
  my?: string | number;
  ml?: string | number;
  mr?: string | number;
  mt?: string | number;
  mb?: string | number;

  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;

  radius?: string | number;
  border?: string | boolean;
  borderWidth?: string | number;

  elevate?: string | number;

  transition?: string;

  display?:
    | "block"
    | "inline"
    | "inline-block"
    | "flex"
    | "flex-inline"
    | "table"
    | "inline-table"
    | "none";

  flexDir?: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent?:
    | "center"
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "flex-start"
    | "flex-end"
    | "inherit"
    | "initial";
  alignItems?:
    | "baseline"
    | "center"
    | "flex-end"
    | "flex-start"
    | "stretch"
    | "inherit"
    | "initial";
  alignSelf?:
    | "baseline"
    | "center"
    | "flex-end"
    | "flex-start"
    | "stretch"
    | "inherit"
    | "initial";

  position?: "relative" | "absolute" | "sticky" | "fixed" | "static";
  zIndex?: string | number;
}

export interface KResponsiveComponentProps extends KComponentProps {
  xs?: KComponentProps;
  sm?: KComponentProps;
  md?: KComponentProps;
  lg?: KComponentProps;
  xl?: KComponentProps;
}
export interface KStatefulComponentProps extends KResponsiveComponentProps {
  active?: KResponsiveComponentProps;
  hover?: KResponsiveComponentProps;
  focus?: KResponsiveComponentProps;
}

export const bootstrapSizes = {
  xs: 0,
  sm: 576,
  md: 720,
  lg: 960,
  xl: 1140,
};

export const bootstrapQueryMin = {
  xs: `@media (min-width: ${bootstrapSizes.xs}px)`,
  sm: `@media (min-width: ${bootstrapSizes.sm}px)`,
  md: `@media (min-width: ${bootstrapSizes.md}px)`,
  lg: `@media (min-width: ${bootstrapSizes.lg}px)`,
  xl: `@media (min-width: ${bootstrapSizes.xl}px)`,
};
export const bootstrapQueryMax = {
  xs: `@media (max-width: ${bootstrapSizes.xs}px)`,
  sm: `@media (max-width: ${bootstrapSizes.sm}px)`,
  md: `@media (max-width: ${bootstrapSizes.md}px)`,
  lg: `@media (max-width: ${bootstrapSizes.lg}px)`,
  xl: `@media (max-width: ${bootstrapSizes.xl}px)`,
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

export const unit = (str: string | number | undefined, defaultUnit: string) => {
  if (!isNaN(Number(str))) {
    return str + defaultUnit;
  }
  return str;
};

export const component = css<KStatefulComponentProps>`
  ${(props) => {
    return `${properties(props)} ${responsive(props)} ${states(props)}`;
  }}
`;

const properties = (props: KComponentProps) => {
  return `${widthStyle(props)} ${heightStyle(props)} ${overflowStyle(
    props
  )} ${colors(props)} ${border(props)} ${padding(props)} ${margin(
    props
  )} ${weight(props)} ${fontSizeStyle(props)} ${radius(props)} ${bgImage(
    props
  )} ${elevation(props)} ${gradient(props)} ${textAlign(props)} ${display(
    props
  )} ${lineH(props)} ${flex(props)} ${positionStyle(props)} ${zIndexStyle(
    props
  )} ${opacityStyle(props)} ${transitionStyle(props)}
  `;
};

const states = (props: KStatefulComponentProps) => {
  return `${hover(props)} ${active(props)}`;
};

const gradient = ({ gradient, theme }: KComponentProps) => {
  if (theme) {
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
  }
  return "";
};

const responsive = (props: KResponsiveComponentProps) => {
  const { xs, sm, md, lg, xl } = props;

  let result = ``;

  if (xs) {
    result += `
  ${bootstrapQueryMin.xs}{
    ${properties({ ...xs, theme: props.theme })}
  }
    `;
  }
  if (sm) {
    result += `
    ${bootstrapQueryMin.sm}{
      ${properties({ ...sm, theme: props.theme })}
    } `;
  }
  if (md) {
    result += `
  ${bootstrapQueryMin.md}{
    ${properties({ ...md, theme: props.theme })}
  } `;
  }
  if (lg) {
    result += `
  ${bootstrapQueryMin.lg}{
    ${properties({ ...xs, theme: props.theme })}
  } `;
  }
  if (xl) {
    result += `
  ${bootstrapQueryMin.xl}{
    ${properties({ ...xl, theme: props.theme })}
  } `;
  }

  return result;
};

// export const defaultQueryOnStates = (query, states) => {};

const hover = (props: KStatefulComponentProps) => {
  const { hover } = props;

  if (hover) {
    return `
    &:hover {
      ${properties({ ...hover, theme: props.theme })}
      ${responsive({ ...hover, theme: props.theme })}
    }
  `;
  }
  return "";
};
const active = (props: KStatefulComponentProps) => {
  const { active } = props;

  if (active) {
    return `
    &:active {
      ${properties({ ...active, theme: props.theme })}
      ${responsive({ ...active, theme: props.theme })}
    }
  `;
  }
  return "";
};

///dimensions
const widthStyle = ({
  w: width,
  maxW: maxWidth,
  minW: minWidth,
}: KComponentProps) => {
  let result = "";
  if (width)
    result += `width: ${unit(width, "%")};
  `;
  if (maxWidth)
    result += `max-width: ${unit(maxWidth, "%")};
  `;
  if (minWidth)
    result += `min-width: ${unit(minWidth, "%")};
  `;
  return result;
};
const heightStyle = ({
  h: height,
  maxH: maxHeight,
  minH: minHeight,
}: KComponentProps) => {
  let result = "";
  if (height)
    result += `height: ${unit(height, "%")};
  `;
  if (maxHeight)
    result += `max-height: ${unit(maxHeight, "%")};
  `;
  if (minHeight)
    result += `min-height: ${unit(minHeight, "%")};
  `;
  return result;
};

const overflowStyle = ({
  overflow,
  overflowX,
  overflowY,
  overflowWrap,
}: KComponentProps) => {
  let result = "";

  if (overflow) result += `overflow:${overflow};`;
  if (overflowX) result += `overflow-x:${overflowX};`;
  if (overflowY) result += `overflow-y:${overflowY};`;
  if (overflowWrap) result += `overflow-wrap:${overflowWrap};`;

  return result;
};

////colors
const col = (color: string) => {
  if (color) return `color: ${color};`;
  return "";
};

const background = (bg: string) => {
  if (bg) return `background-color: ${bg};`;
  return "";
};

const borderCol = (borderColor: string) => {
  if (borderColor) return `border-color: ${borderColor};`;
  return "";
};

const colors = ({
  gradient,
  color,
  bg,
  borderColor,
  theme,
}: KComponentProps) => {
  let result = "";
  let tmpBg: string | null = null;
  let tmpC: string | null = null;
  let tmpBc: string | null = null;

  if (theme) {
    if (bg) tmpBg = getColor(bg, theme);
    if (color) tmpC = getColor(color, theme);
    if (borderColor) tmpBc = getColor(borderColor, theme);

    if (tmpBg) {
      if (color == "contrast") tmpC = getContrast(tmpBg);
      if (borderColor == "contrast") tmpBc = getContrast(tmpBg);
    }
    if (gradient) {
      if (color == "contrast")
        tmpC = getContrast(getColor(gradient.colors[0], theme));
      if (borderColor == "contrast")
        tmpBc = getContrast(getColor(gradient.colors[0], theme));
    }
    if (tmpC) result += col(tmpC);
    if (tmpBg) result += background(tmpBg);
    if (tmpBc) result += borderCol(tmpBc);
  }
  return result;
};

///bgImg

const bgImage = ({
  bgImg,
  bgPosition,
  bgRepeat,
  bgSize,
  objFit,
}: KComponentProps) => {
  let result = "";
  if (bgImg) {
    if (Array.isArray(bgImg)) {
      bgImg.forEach((url, index) => {
        result += `background-image:url(\"${url}\")`;
        if (index < bgImg.length - 1) result += ",";
        else result += ";";
      });
    } else {
      result += `background-image:url(\"${bgImg}\");`;
    }
  }

  if (bgPosition) result += `background-position:${bgPosition};`;
  if (bgRepeat) result += `background-repeat:${bgRepeat};`;
  if (bgSize) result += `background-size:${bgSize};`;
  if (objFit) result += `object-fit:${objFit};`;

  return result;
};

////text
const weight = ({ weight, theme }: KComponentProps) => {
  if (weight && theme) return `font-weight: ${getFontWeight(weight, theme)};`;
  else return "";
};

const textAlign = ({ text }: KComponentProps) => {
  if (text) return `text-align:${text};`;
  return "";
};
const lineH = ({ lineHeight }: KComponentProps) => {
  if (lineHeight) return `line-height:${unit(lineHeight, "rem")};`;
  return "";
};
const fontSizeStyle = ({ fontSize }: KComponentProps) => {
  if (fontSize) return `font-size: ${unit(fontSize, "rem")};`;
  else return "";
};

///positioning
const padding = ({ pl, pr, pt, pb, px, py, p }: KComponentProps) => {
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

const margin = ({ ml, mr, mt, mb, mx, my, m }: KComponentProps) => {
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

//border
const radius = ({ radius }: KComponentProps) => {
  if (radius) return `border-radius:${unit(radius, "rem")};`;
  return "";
};

const border = ({ border, borderWidth }: KComponentProps) => {
  if (border) return `border:${border} ${unit(borderWidth, "px")};`;
  else if (border == false) return "border :none;";
  return "";
};

//shadow
const elevation = ({ elevate }: KComponentProps) => {
  if (elevate)
    return `box-shadow: 1px 0px 10px ${unit(elevate, "px")} rgba(0,0,0,0.2);`;
  return "";
};

const transitionStyle = ({ transition }: KComponentProps) => {
  if (transition) return `transition: ${transition};`;
  return "";
};

//display
const display = ({ display }: KComponentProps) => {
  if (display) return `display:${display};`;
  return "";
};

const flex = (props: KComponentProps) => {
  return `${flexDirStyle(props)} ${justifyContentStyle(
    props
  )} ${alignItemsStyle(props)} ${alignSelfStyle(props)}`;
};

const flexDirStyle = ({ flexDir }: KComponentProps) => {
  if (flexDir) return `flex-direction: ${flexDir};`;
  return "";
};

const justifyContentStyle = ({ justifyContent }: KComponentProps) => {
  if (justifyContent) return `justify-content: ${justifyContent};`;
  return "";
};
const alignItemsStyle = ({ alignItems }: KComponentProps) => {
  if (alignItems) return `align-items: ${alignItems};`;
  return "";
};
const alignSelfStyle = ({ alignSelf }: KComponentProps) => {
  if (alignSelf) return `align-self: ${alignSelf};`;
  return "";
};

const positionStyle = ({
  position,
  left,
  right,
  top,
  bottom,
}: KComponentProps) => {
  let result = "";
  if (position) result += `position: ${position};`;
  if (left) result += `left: ${unit(left, "px")};`;
  if (right) result += `right: ${unit(right, "px")};`;
  if (top) result += `top: ${unit(top, "px")};`;
  if (bottom) result += `bottom: ${unit(bottom, "px")};`;

  return result;
};

const zIndexStyle = ({ zIndex }: KComponentProps) => {
  if (zIndex) return `z-index:${zIndex};`;
  else return "";
};

const opacityStyle = ({ opacity }: KComponentProps) => {
  if (opacity) return `opacity:${opacity};`;
  return "";
};
