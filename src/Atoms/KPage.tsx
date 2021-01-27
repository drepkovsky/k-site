////// IMPORTS //////
// React
import React from "react";

////// COMPONENT //////

export interface KPageProps {
  route: string;
  name: string;
  navbar: boolean;
}

const KPage: React.FC<KPageProps> = (props) => {
  return <div>{props.children}</div>;
};

/////EXPORT///////////////

export default KPage;
