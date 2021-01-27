import React from "react";
import { KStatefulComponentProps } from "../Theming/KStyles";
interface KModalWrapperProps {
    centered?: boolean;
}
interface KModalProps extends KModalWrapperProps {
    isOpen?: boolean;
    toggle?: () => void;
    hideOutClick?: boolean;
    bodyProps?: KStatefulComponentProps;
    fade?: boolean;
}
export declare const KModalBody: import("styled-components").StyledComponent<"div", any, {
    bg: string | undefined;
    p: string | number;
} & KStatefulComponentProps, "p" | "bg">;
export declare const KModalHeader: import("styled-components").StyledComponent<"div", any, {
    bg: string;
    justifyContent: "inherit" | "initial" | "center" | "space-around" | "space-between" | "space-evenly" | "flex-start" | "flex-end";
    divider: boolean;
} & KStatefulComponentProps & import("./KCard").KCardHeaderAndFooterProps, "divider" | "bg" | "justifyContent">;
export declare const KModalFooter: import("styled-components").StyledComponent<"div", any, {
    bg: string;
    justifyContent: "inherit" | "initial" | "center" | "space-around" | "space-between" | "space-evenly" | "flex-start" | "flex-end";
    divider: boolean;
} & KStatefulComponentProps & import("./KCard").KCardHeaderAndFooterProps, "divider" | "bg" | "justifyContent">;
export declare const KModal: React.FC<KStatefulComponentProps & KModalProps>;
export {};
