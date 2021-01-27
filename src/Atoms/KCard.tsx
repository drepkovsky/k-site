////// IMPORTS //////
import styled from "styled-components";

// React
import PropTypes from "prop-types";
import React, { createContext } from "react";
import { component } from "../Theming/KStyles";
import { KTableItem, KTableRow } from "./KTable";
import { KStatefulComponentProps, unit } from "./../Theming/KStyles";

////// COMPONENT //////

interface KCardHeaderAndFooterProps {
  divider?: boolean;
  dividerWidth?: string;
}

export const KCardHeader = styled.div.attrs(
  (props: KStatefulComponentProps & KCardHeaderAndFooterProps) => ({
    bg: props.bg || "none",
    justifyContent: props.justifyContent || "flex-start",
    divider: props.divider === undefined ? true : props.divider,
  })
)<KStatefulComponentProps & KCardHeaderAndFooterProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 3rem;
  padding: 0.5rem 1.5rem;
  background: ${({ bg }) => bg};
  justify-content: ${({ justifyContent }) => justifyContent};
  border-bottom: ${(divider, dividerWidth = "1px") =>
    divider ? `${unit(dividerWidth, "px")} solid` : "none"};
  border-color: inherit;

  ${component}
`;

export const KCardFooter = styled.div.attrs(
  (props: KStatefulComponentProps & KCardHeaderAndFooterProps) => ({
    bg: props.bg || "none",
    justifyContent: props.justifyContent || "flex-start",
    divider: props.divider === undefined ? true : props.divider,
  })
)<KStatefulComponentProps & KCardHeaderAndFooterProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 3rem;
  padding: 0.5rem 1.5rem;
  background: ${({ bg }) => bg};
  justify-content: ${({ justifyContent }) => justifyContent};
  border-top: ${(divider, dividerWidth = "1px") =>
    divider ? `${unit(dividerWidth, "px")} solid` : "none"};
  border-color: inherit;
  ${component}
`;

KCardFooter.propTypes = {
  divider: PropTypes.bool,
  dividerWidth: PropTypes.string,
};

export const KCardWrapper = styled.div.attrs(
  (props: KStatefulComponentProps & { shadow?: boolean } & FloaterProps) => ({
    borderColor: props.borderColor || props.theme?.colors.border,
    radius: props.radius || "5px",
    bg: props.bg || props.theme?.colors.background,
    color: props.color || props.theme?.colors.text,
    maxW: props.maxW || "100",
  })
)<KStatefulComponentProps & { shadow?: boolean } & FloaterProps>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  box-shadow: ${({ shadow }) =>
    shadow ? "0 1px 2px 1px rgba(0, 0, 0, 0.1)" : ""};
  border: solid 1px;

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

  ${KCardHeader} {
    padding-top: ${({ ver }) => (ver == "start" ? "2rem" : "")};
  }

  ${KCardFooter} {
    padding-bottom: ${({ ver }) => (ver == "end" ? "2rem" : "")};
  }

  ${component}
`;

interface KCardProps {
  floaterVer?: "start" | "center" | "end";
  floaterHor?: "start" | "center" | "end";
}

interface FloaterProps {
  ver?: "start" | "center" | "end";
  hor?: "start" | "center" | "end";
}

const KCardContext = createContext<FloaterProps | null>(null);

export const KCard: React.FC<
  KStatefulComponentProps & { shadow?: boolean } & KCardProps
> = (props) => {
  //props
  const { children, floaterVer, floaterHor, ...wraperProps } = props;
  //states

  //effects
  //render
  return (
    <KCardContext.Provider value={{ hor: floaterHor, ver: floaterVer }}>
      <KCardWrapper hor={floaterHor} ver={floaterVer} {...wraperProps}>
        {children}
      </KCardWrapper>
    </KCardContext.Provider>
  );
};

KCard.defaultProps = {
  shadow: true,
};

export const KCardBody = styled.div.attrs((props: KStatefulComponentProps) => ({
  bg: props.bg || props.theme?.colors.background,
  p: props.p || "1.15rem",
}))<KStatefulComponentProps>`
  flex: 1 1 auto;
  position: relative;

  ${component}
`;

export const KCardTitle = styled.h3<KStatefulComponentProps>`
  font-size: 1.125rem;
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.weights.normal};
  margin: 0;

  ${component}
`;

export const KCardFloaterWrapper = styled.div.attrs(
  (props: KStatefulComponentProps) => ({
    color: props.color || props.theme?.colors.text,
  })
)<KStatefulComponentProps>`
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

export const KCardFloater: React.FC<KStatefulComponentProps & FloaterProps> = (
  props
) => {
  const { children, className, ver, hor } = props;

  var x = 0;
  var y = 0;
  switch (hor) {
    case "start":
      x = 0;
      break;
    case "center":
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
    case "center":
      if (hor == "center") y = 0;
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
};

////// EXPORTS //////
