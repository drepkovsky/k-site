import React from "react";
import { KStatefulComponentProps } from "./../Theming/KStyles";
interface KSectionProps {
    route: string;
    name: string;
    navbar: boolean;
}
declare const KSection: React.FC<KStatefulComponentProps & KSectionProps>;
export default KSection;
