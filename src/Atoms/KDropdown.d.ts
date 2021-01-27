import { FC } from "react";
import { KStatefulComponentProps } from "../Theming/KStyles";
export declare const KDropdownWrapper: import("styled-components").StyledComponent<"div", any, KStatefulComponentProps, never>;
interface KDropdownProps {
    isOpen?: boolean;
    toggle?: () => void;
    hideOnInsideClick?: boolean;
}
export declare const KDropdownContent: FC<KStatefulComponentProps & KDropdownProps>;
export {};
