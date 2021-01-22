////// IMPORTS //////
import styled from "styled-components";

// React
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { leanToContrast } from "../Libs/KColorPalette";
import { component } from "../Libs/styles";
import KTable from "./KTable";

////// COMPONENT //////
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
  headerOffset: PropTypes.bool,
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

const KCardWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-x: auto;
  width: 100%;
  box-shadow: ${({ shadow = true }) =>
    shadow ? "0 1px 2px 1px rgba(0, 0, 0, 0.1)" : ""};
  border: ${(border = true, borderWidth = "1px") =>
      border ? borderWidth : "none"}
    solid;
  border-radius: ${({ radius = "3px" }) => radius};
  border-color: ${({ theme }) => leanToContrast(theme.colors.body, 0.1)};
  background-color: ${({ theme }) => leanToContrast(theme.colors.body, 0.02)};
  color: ${({ theme }) => theme.colors.text};

  max-width: ${({ maxWidth = "100%" }) => maxWidth};

  ${component}
`;

const KCardWithFloaterWrapper = styled(KCardWrapper)`
  ${KCardHeader} {
    padding-top: ${({ ver }) => (ver == "start" ? "2rem" : "")};
  }

  ${KCardFooter} {
    padding-bottom: ${({ ver }) => (ver == "end" ? "2rem" : "")};
  }
`;

export function KCard(props) {
  //props
  const { children } = props;
  const [isFloater, setFloater] = useState(false);
  const [floaterProps, setFloaterProps] = useState(null);
  //states

  //effects
  useEffect(() => {
    if (!children) return;

    const kids = [].concat(children);
    for (let i = 0; i < kids.length; i++) {
      if (children[i]) {
        if (children[i].type.name === KCardFloater.name) {
          setFloater(true);
          setFloaterProps({
            ver: children[i].props.ver,
            hor: children[i].props.hor,
          });
          break;
        }
      }
    }
  }, [children]);

  //render
  if (isFloater)
    return (
      <KCardWithFloaterWrapper {...floaterProps} {...props}>
        {children}
      </KCardWithFloaterWrapper>
    );
  return <KCardWrapper {...props}>{children}</KCardWrapper>;
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

export const KCardTitle = styled.h3`
  font-size: 1.125rem;
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.weights.normal};
  margin: 0;
`;

export const KCardFloaterWrapper = styled.div`
  position: absolute;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  min-height: 2.5rem;
  border-radius: 50%;
  border-width: ${({ borderWidth = "2px" }) => borderWidth};
  background-color: ${({ background = "#fff" }) => background};
  border-color: ${({ background = "#fff" }) => background};
  color: ${({ color = "#111" }) => color};
  left: ${({ left }) => left}%;
  top: ${({ top }) => top}%;
  transform: translate(-50%, -50%);
  padding: 0.2rem 0.2rem;
`;

export function KCardFloater(props) {
  const { children, className, ver, hor } = props;

  var x = 0;
  var y = 0;
  switch (hor) {
    case "start":
      x = 0;
      break;
    case "middle":
      x = 50;
      break;
    case "end":
      x = 100;
      break;
  }

  switch (ver) {
    case "start":
      y = 0;
      break;
    case "middle":
      if (hor == "middle") y = 0;
      else y = 50;
      break;
    case "end":
      y = 100;
      break;
  }

  return (
    <KCardFloaterWrapper
      className={`k-card-floater ${className || ""}`}
      left={x}
      top={y}>
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
