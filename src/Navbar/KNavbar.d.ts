import React from "react";
import { KStatefulComponentProps } from "../Theming/KStyles";
interface KNavbarCollapseProps {
    isOpen?: boolean;
}
export declare const KNavbarCollapse: React.FC<KStatefulComponentProps & KNavbarCollapseProps>;
export declare const KNavLink: import("styled-components").StyledComponent<"a", any, KStatefulComponentProps, never>;
export declare const KNavItem: import("styled-components").StyledComponent<"li", any, KStatefulComponentProps, never>;
export declare const KNavItems: import("styled-components").StyledComponent<"ul", any, KStatefulComponentProps, never>;
export declare const KNavbarBrand: import("styled-components").StyledComponent<"a", any, KStatefulComponentProps, never>;
interface KNavProps {
    container?: boolean;
}
export declare const KNav: import("styled-components").StyledComponent<"nav", any, KNavProps & KStatefulComponentProps, never>;
export declare const KNavbarToggler: import("styled-components").StyledComponent<"button", any, KStatefulComponentProps, never>;
interface KNavbarProps extends KStatefulComponentProps {
    expand: "xs" | "sm" | "md" | "lg" | "xl";
    scrolledProps: KStatefulComponentProps;
    className: string;
    isOpen: boolean;
}
export declare const KNavbar: React.FC<KNavbarProps>;
export declare const KNavbarAutoContent: () => JSX.Element;
interface KNavbarUncontrolledProps extends KNavbarProps {
    brand: string;
    brandLink: string;
    navClassName: string;
    className: string;
    navContainer: boolean;
}
export declare const KNavbarUncontrolled: React.FC<KNavbarUncontrolledProps>;
export {};
