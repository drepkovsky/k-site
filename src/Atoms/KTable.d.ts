import { KStatefulComponentProps } from "../Theming/KStyles";
export declare const KTableItem: import("styled-components").StyledComponent<"td", any, KStatefulComponentProps, never>;
export declare const KTableRow: import("styled-components").StyledComponent<"tr", any, KStatefulComponentProps, never>;
export declare const KTableHead: import("styled-components").StyledComponent<"thead", any, {
    bg: string | undefined;
} & KStatefulComponentProps, "bg">;
export declare const KTableBody: import("styled-components").StyledComponent<"tbody", any, KStatefulComponentProps, never>;
export declare const KTable: import("styled-components").StyledComponent<"table", any, {
    borderColor: string | undefined;
    color: string | undefined;
    stripeColor: string | undefined;
} & KStatefulComponentProps & {
    stripeColor?: string | undefined;
    striped?: boolean | undefined;
}, "color" | "borderColor" | "stripeColor">;
export default KTable;
