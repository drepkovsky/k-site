import React from "react";
import { KStatefulComponentProps } from "../Theming/KStyles";
interface KAnimationProps {
    anim?: string | string[];
    className?: string;
}
declare const KAnimation: React.FC<KStatefulComponentProps & KAnimationProps>;
export default KAnimation;
