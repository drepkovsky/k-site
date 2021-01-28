////// IMPORTS //////
// React
import React from "react";

////// COMPONENT //////

export interface KPageProps {
  route: string;
  name: string;
  navbar: boolean;
  className: string;
}

const KPage: React.FC<KPageProps> = (props) => {
  return <div className={`${props.className || ""}`}>{props.children}</div>;
};

/////EXPORT///////////////

export default KPage;
