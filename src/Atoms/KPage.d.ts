import React from "react";
export interface KPageProps {
    route: string;
    name: string;
    navbar: boolean;
}
declare const KPage: React.FC<KPageProps>;
export default KPage;
