////// IMPORTS //////
// React
import React, { ReactNode, useEffect } from "react";
import { useKSiteRoute } from "../KSite";

////// COMPONENT //////

export interface KPageProps {
  route: string;
  className: string;
}

const KPage: React.FC<KPageProps> = ({children,route,className}) => {

  const {pages,setPages} = useKSiteRoute();

  const result : ReactNode = [<div className={`${className || ""}`}>{children}</div>];


  useEffect(()=>{
    if(setPages)
      setPages({...pages,[route]:result});
  },[route]);


  return null;
};

/////EXPORT///////////////

export default KPage;
