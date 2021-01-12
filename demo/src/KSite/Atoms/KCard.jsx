////// IMPORTS //////

//// EXTERNAL ////
import styled from "styled-components";

// React
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";

import { justifyContent } from "../Libs/KLib";
import { leanToContrast } from "../Libs/KColorPalette";

//// INTERNAL ////

////// COMPONENT //////
const KCardWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  box-shadow: ${({ shadow = true }) =>
    shadow ? "0 1px 2px 1px rgba(0, 0, 0, 0.1)" : ""};
  border: ${(border = true, borderWidth = "1px") =>
      border ? borderWidth : "none"}
    solid;
  border-radius: ${({ radius = "3px" }) => radius};
  border-color: ${({ borderColor, theme }) =>
    borderColor || leanToContrast(theme.colors.body || "#000000", 0.1)};
  background-color: ${({ background, theme }) =>
    background || leanToContrast(theme.colors.body || "#000000", 0.02)};

  max-width: ${({ maxWidth = "100%" }) => maxWidth};
`;

export function KCard(props) {
  //props
  const { children, className } = props;
  //states
  const [kids, setKids] = useState([]);
  const [floaters, setFloaters] = useState([]);
  const ref = useRef(null);

  //effects
  useEffect(() => {
    var floater = [];
    var tmpKids = [];

    [].concat(children).map((child) => {
      switch (child.type.name) {
        case KCardFloater.name:
          floater.push(child);
          break;
        default:
          tmpKids.push(child);
          break;
      }
    });

    const updateFloaters = () => {
      if (ref.current) {
        floater = React.Children.map(floater, (child) => {
          return React.cloneElement(child, {
            cardWidth: ref.current.offsetWidth,
            cardHeight: ref.current.offsetHeight,
          });
        });
      }
      setFloaters(floater);
    };

    updateFloaters();
    window.addEventListener("resize", updateFloaters);

    setKids(tmpKids);
  }, [children, ref]);

  //render
  return (
    <KCardWrapper ref={ref} {...props}>
      {kids}
      {floaters}
    </KCardWrapper>
  );
}

KCard.propTypes = {
  className: PropTypes.string,
  shadow: PropTypes.bool,
  border: PropTypes.bool,
  borderWidth: PropTypes.string,
  radius: PropTypes.string,
  borderColor: PropTypes.string,
  background: PropTypes.string,
};

export const KCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 3rem;
  padding: 0.5rem 1.5rem;
  background: ${({ background = "none" }) => background};
  justify-content: ${({ align = "start" }) =>
    align == "center" ? align : "flex-" + align};
  border-bottom: ${(divider = true, dividerWidth = "1px") =>
      divider ? dividerWidth : "none"}
    solid;
  border-color: ${({ borderColor, theme }) =>
    borderColor || leanToContrast(theme.colors.body || "#000000", 0.1)};
`;

KCardHeader.propTypes = {
  className: PropTypes.string,
  divider: PropTypes.bool,
  dividerWidth: PropTypes.string,
  align: PropTypes.string,
  background: PropTypes.string,
};

export const KCardBody = styled.div`
  background: ${({ background = "none" }) => background};
  flex: 1 1 auto;
  padding: ${({ padding = "1.15rem" }) => padding};
  position: relative;
`;

KCardBody.propTypes = {
  className: PropTypes.string,
  padding: PropTypes.string,
  background: PropTypes.string,
};

export const KCardFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 3rem;
  padding: 0.5rem 1.5rem;
  background: ${({ background = "none" }) => background};
  justify-content: ${({ align = "end" }) =>
    align == "center" ? align : "flex-" + align};
  border-top: ${(divider = true, dividerWidth = "1px") =>
      divider ? dividerWidth : "none"}
    solid;
  border-color: ${({ borderColor, theme }) =>
    borderColor || leanToContrast(theme.colors.body || "#000000", 0.1)};
`;

KCardFooter.propTypes = {
  className: PropTypes.string,
  divider: PropTypes.bool,
  dividerWidth: PropTypes.string,
  align: PropTypes.string,
  background: PropTypes.string,
};

export const KCardTitle = styled.h3`
  font-size: 1.125rem;
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.weights.normal};
  margin: 0;
`;

export const KCardFloaterWrapper = styled.div`
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 3rem;
  min-width: 3rem;
  max-width: 4rem;
  max-height: 4rem;
  border-radius: 50%;
  border-width: ${({ borderWidth = "2px" }) => borderWidth};
  background-color: ${({ background = "#fff" }) => background};
  border-color: ${({ background = "#fff" }) => background};
  color: ${({ color = "#111" }) => color};
`;

export function KCardFloater(props) {
  const [width, setWidth] = useState(0);
  const { children, className, ver, hor, cardWidth, cardHeight } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [ref, cardWidth, cardHeight]);

  var x = 0;
  var y = 0;
  if (width != 0 || cardWidth != 0) {
    switch (hor) {
      case "start":
        x = -width / 2;
        break;
      case "middle":
        x = cardWidth / 2 - width / 2;
        break;
      case "end":
        x = cardWidth - width / 2;
        break;
    }

    switch (ver) {
      case "start":
        y = -width / 2;
        break;
      case "middle":
        if (hor == "middle") y = -width / 2;
        else y = cardHeight / 2 - width / 2;
        break;
      case "end":
        y = cardHeight - width / 2;
        break;
    }
  }

  return (
    <KCardFloaterWrapper
      ref={ref}
      className={`k-card-floater ${className || ""}`}
      style={{ width: width, height: width, left: x, top: y }}>
      {children}
    </KCardFloaterWrapper>
  );
}

KCardFloater.propTypes = {
  hor: PropTypes.oneOf(["start", "end", "middle"]),
  ver: PropTypes.oneOf(["start", "end", "middle"]),
  icon: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  borderWidth: PropTypes.string,
};

////// EXPORTS //////
