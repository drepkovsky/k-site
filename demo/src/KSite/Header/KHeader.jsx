////// IMPORTS //////

//// EXTERNAL ////

// React
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

//// INTERNAL ////

////// COMPONENT //////

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
