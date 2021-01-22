////// IMPORTS //////
import styled from "styled-components";
// React
import PropTypes from "prop-types";
import React from "react";
import { component } from "../Libs/styles";

////// COMPONENT //////

const Icon = styled.i`
  font-size: ${({ size = 1 }) => size}rem;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;

  ${component}
`;

function KIcon(props) {
  const {
    size,
    prefix = "fa",
    name = "",
    brand = false,
    solid = true,
    className,
  } = props;
  const iconName = `${prefix}-${name}`;

  const classes = [className, iconName, brand ? "fab" : solid ? "fas" : "far"];

  return <Icon {...props} size={size} className={classes} />;
}

KIcon.propTypes = {
  prefix: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  brand: PropTypes.bool,
  solid: PropTypes.bool,
  className: PropTypes.string,
};

////// EXPORTS //////
export default KIcon;
