import { KTheme } from "./KThemes";
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
    height?: number | string;
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
    bgRepeat?: "inherit" | "initial" | "round" | "space" | "repeat" | "no-repat" | "repeat-x" | "repeat-y";
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
    display?: "block" | "inline" | "inline-block" | "flex" | "flex-inline" | "table" | "inline-table";
    flexDir?: "row" | "row-reverse" | "column" | "column-reverse";
    justifyContent?: "center" | "space-around" | "space-between" | "space-evenly" | "flex-start" | "flex-end" | "inherit" | "initial";
    alignItems?: "baseline" | "center" | "flex-end" | "flex-start" | "stretch" | "inherit" | "initial";
    alignSelf?: "baseline" | "center" | "flex-end" | "flex-start" | "stretch" | "inherit" | "initial";
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
export declare const bootstrapSizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
};
export declare const bootstrapQueryMin: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
export declare const bootstrapQueryMax: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
export declare const getBootstrapSizes: (width?: number) => {
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
};
export declare const unit: (str: string | number | undefined, defaultUnit: string) => string | number | undefined;
export declare const component: import("styled-components").FlattenInterpolation<import("styled-components").ThemedStyledProps<KStatefulComponentProps, any>>;
export {};
