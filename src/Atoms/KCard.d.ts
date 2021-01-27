import React from "react";
import { KStatefulComponentProps } from "./../Theming/KStyles";
export interface KCardHeaderAndFooterProps {
    divider?: boolean;
    dividerWidth?: string;
}
export declare const KCardHeader: import("styled-components").StyledComponent<"div", any, {
    bg: string;
    justifyContent: "inherit" | "initial" | "center" | "space-around" | "space-between" | "space-evenly" | "flex-start" | "flex-end";
    divider: boolean;
} & KStatefulComponentProps & KCardHeaderAndFooterProps, "divider" | "bg" | "justifyContent">;
export declare const KCardFooter: import("styled-components").StyledComponent<"div", any, {
    bg: string;
    justifyContent: "inherit" | "initial" | "center" | "space-around" | "space-between" | "space-evenly" | "flex-start" | "flex-end";
    divider: boolean;
} & KStatefulComponentProps & KCardHeaderAndFooterProps, "divider" | "bg" | "justifyContent">;
export declare const KCardWrapper: import("styled-components").StyledComponent<"div", any, {
    borderColor: string | undefined;
    radius: string | number;
    bg: string | undefined;
    color: string | undefined;
    maxW: string | number;
} & KStatefulComponentProps & {
    shadow?: boolean | undefined;
} & FloaterProps, "maxW" | "color" | "bg" | "borderColor" | "radius">;
interface KCardProps {
    floaterVer?: "start" | "center" | "end";
    floaterHor?: "start" | "center" | "end";
}
interface FloaterProps {
    ver?: "start" | "center" | "end";
    hor?: "start" | "center" | "end";
}
export declare const KCard: React.FC<KStatefulComponentProps & {
    shadow?: boolean;
} & KCardProps>;
export declare const KCardBody: import("styled-components").StyledComponent<"div", any, {
    bg: string | undefined;
    p: string | number;
} & KStatefulComponentProps, "p" | "bg">;
export declare const KCardTitle: import("styled-components").StyledComponent<"h3", any, KStatefulComponentProps, never>;
export declare const KCardFloaterWrapper: import("styled-components").StyledComponent<"div", any, {
    color: string | undefined;
} & KStatefulComponentProps, "color">;
export declare const KCardFloater: React.FC<KStatefulComponentProps & FloaterProps>;
export {};
