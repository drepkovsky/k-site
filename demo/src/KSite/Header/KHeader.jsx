////// IMPORTS //////

//// EXTERNAL ////
import styled from "styled-components";

// React
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

//// INTERNAL ////
import { bootstrapQuery } from "../Libs/KLib";

////// COMPONENT //////
const KHeroBody = styled.div`
  position: relative;
  z-index: 2;
  ${(size) => `
  height: ${size == "fullheight" ? "100vh" : "3.5rem"}
`}
`;

const KHeroWrapper = styled.div`
  position: relative;
  width: 100%;

  ${KHeroBody} {
    padding: ${({ size }) =>
        size == "medium"
          ? "9rem"
          : size == "large"
          ? "18rem"
          : size == "fullheight"
          ? "3rem"
          : "3rem"}
      1.5rem;
  }
`;

function KHeader(props) {
  const { children, minHeight, className } = props;
  const parallax = useRef(null);
  const childrenWrapper = useRef(null);

  useEffect(() => {
    var scrollPosition = window.pageYOffset;

    if (props.parallax) {
      const scroll = () => {
        if (window.pageYOffset != scrollPosition) {
          scrollPosition = window.pageYOffset;
          if (parallax.current)
            parallax.current.style.transform = `translateY(${
              scrollPosition * 0.5
            }px)`;
        }
      };

      document.addEventListener("scroll", scroll);
    }
  }, [children, childrenWrapper.current]);

  return (
    <div
      className={`k-header ${className}`}
      style={{ minHeight: `${minHeight}vh` }}>
      <div className="k-header-overlay"></div>
      <div className="k-header-front">{children}</div>
      <div className={`k-header-back`}>
        <div
          ref={parallax}
          className={`k-header-img ${props.parallax ? "parallax" : ""}`}
          style={{
            backgroundImage: `url(${props.bgImg})`,
          }}></div>
      </div>
    </div>
  );
}

KHeader.propTypes = {
  minHeight: PropTypes.number,
  className: PropTypes.string,
};

////// EXPORTS //////
export default KHeader;
