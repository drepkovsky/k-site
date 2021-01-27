import { KStatefulComponentProps } from "./../Theming/KStyles";
export declare const KRow: import("styled-components").StyledComponent<"div", any, {
    mx: string | number;
} & KStatefulComponentProps, "mx">;
declare type Col = string | number | ColObj;
interface ColObj {
    offset?: string | number;
    size?: string | number;
}
interface KColProps {
    xs?: Col;
    sm?: Col;
    md?: Col;
    lg?: Col;
    xl?: Col;
}
export declare const KCol: import("styled-components").StyledComponent<"div", any, {
    px: string | number;
    pb: string | number;
    w: string | number;
} & KStatefulComponentProps & KColProps, "w" | "px" | "pb">;
export {};
