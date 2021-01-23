////// IMPORTS //////
import styled from "styled-components";

// React
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { leanToContrast } from "../Theming/KColorPalette";
import { component } from "../Libs/styles";
import KTable, { KTableItem, KTableRow } from "./KTable";

////// COMPONENT //////
export const KCardHeader = styled.div.attrs((props) => ({
  bg: props.bg || "none",
  justifyContent: props.justifyContent || "flex-start",
}))`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 3rem;
  padding: 0.5rem 1.5rem;
  background: ${({ bg }) => bg};
  justify-content: ${({ justifyContent }) => justifyContent};
  border-bottom: ${(divider = true, dividerWidth = "1px") =>
      divider ? dividerWidth : "none"}
    solid;
  border-color: inherit;

  ${component}
`;

KCardHeader.propTypes = {
  className: PropTypes.string,
  divider: PropTypes.bool,
  dividerWidth: PropTypes.string,
  align: PropTypes.string,
  background: PropTypes.string,
  headerOffset: PropTypes.bool,
};

export const KCardFooter = styled.div.attrs((props) => ({
  bg: props.bg || "none",
  justifyContent: props.justifyContent || "flex-start",
}))`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 3rem;
  padding: 0.5rem 1.5rem;
  background: ${({ bg }) => bg};
  justify-content: ${({ justifyContent }) => justifyContent};
  border-top: ${(divider = true, dividerWidth = "1px") =>
      divider ? dividerWidth : "none"}
    solid;
  border-color: inherit;
  ${component}
`;

KCardFooter.propTypes = {
  className: PropTypes.string,
  divider: PropTypes.bool,
  dividerWidth: PropTypes.string,
  align: PropTypes.string,
  background: PropTypes.string,
};

const KCardWrapper = styled.div.attrs((props) => ({
  borderColor: props.borderColor || props.theme.colors.border,
  radius: props.radius || "5px",
  bg: props.bg || props.theme.colors.background,
  color: props.bolor || props.theme.colors.text,
  maxWidth: props.maxWidth || "100",
}))`
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

  ${KTableRow} {
    ${KTableItem} {
      :first-child {
        padding-left: 1.5rem;
      }
      :last-child {
        padding-right: 1.5rem;
      }
    }
  }

  ${component}
`;

const KCardWithFloaterWrapper = styled(KCardWrapper)`
  ${KCardHeader} {
    padding-top: ${({ ver }) => (ver == "start" ? "2rem" : "")};
  }

  ${KCardFooter} {
    padding-bottom: ${({ ver }) => (ver == "end" ? "2rem" : "")};
  }

  ${component}
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

export const KCardBody = styled.div.attrs((props) => ({
  bg: props.bg || props.theme.colors.background,
  p: props.p || "1.15rem",
}))`
  flex: 1 1 auto;
  position: relative;

  ${component}
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

  ${component}
`;

export const KCardFloaterWrapper = styled.div.attrs((props) => ({
  color: props.color || props.theme.colors.text,
}))`
  position: absolute;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  min-height: 2.5rem;
  border-radius: 50%;
  border-width: ${({ borderWidth = "2px" }) => borderWidth};

  color: ${({ color }) => color};

  left: ${({ left }) => left}%;
  top: ${({ top }) => top}%;
  transform: translate(-50%, -50%);
  padding: 0.2rem 0.2rem;

  ${component}
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
