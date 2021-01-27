import React from "react";
import { KStatefulComponentProps } from "./../Theming/KStyles";
interface KIconProps {
    prefix?: string;
    name?: string;
    isBrand?: boolean;
    isSolid?: boolean;
    size?: number | string;
}
declare const KIcon: React.FC<KStatefulComponentProps & KIconProps>;
export default KIcon;
