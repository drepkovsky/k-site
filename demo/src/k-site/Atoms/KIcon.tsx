////// IMPORTS //////
import styled from "styled-components";
// React
import React from "react";
import { component, unit } from "../Theming/KStyles";
import { KStatefulComponentProps } from "./../Theming/KStyles";

////// COMPONENT //////
export interface KIconProps {
  prefix?: string;
  name?: string;
  isBrand?: boolean;
  isSolid?: boolean;
  size?: number | string;
}

const Icon = styled.i<KStatefulComponentProps & { size?: number | string }>`
  font-size: ${({ size = 1 }) => unit(size, "rem")};
  width: ${({ size = 1 }) => unit(size, "rem")};
  height: ${({ size = 1 }) => unit(size, "rem")};

  ${component}
`;

const KIcon: React.FC<KStatefulComponentProps & KIconProps> = (props) => {
  const {
    size,
    prefix = "fa",
    name = "",
    isBrand = false,
    isSolid = true,
    className,
  } = props;
  const iconName = `${prefix}-${name}`;

  const classes = [
    className,
    iconName,
    isBrand ? "fab" : isSolid ? "fas" : "far",
  ];

  return <Icon size={size} className={classes.join(" ")} />;
};

////// EXPORTS //////
export default KIcon;
