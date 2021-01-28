import styled from "styled-components";
import React, { FC, useRef, useEffect, useState } from "react";
import {
  component,
  getBootstrapSizes,
  KStatefulComponentProps,
} from "../Theming/KStyles";

export const KDropdownWrapper = styled.div<KStatefulComponentProps>`
  position: relative;
  display: inline-block;
  ${component}
`;
const KDropdownContainer = styled.div.attrs(
  (props: KStatefulComponentProps & { isOpen?: boolean }) => ({
    bg: props.bg || props.theme?.colors.background,
  })
)<KStatefulComponentProps & { isOpen?: boolean }>`
  position: absolute;
  min-width: 160px;
  margin-top: 0.5rem;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  z-index: 1;
  box-shadow: 0 1px 10px 5px rgba(0, 0, 0, 0.2);
  ${component};
`;

export interface KDropdownProps {
  isOpen?: boolean;
  toggle?: () => void;
  hideOnInsideClick?: boolean;
  expand?: "xs" | "sm" | "lg" | "xl";
}

export const KDropdownContent: FC<KStatefulComponentProps & KDropdownProps> = (
  props
) => {
  const { toggle, isOpen, children, hideOnInsideClick, expand } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [expandProps, setExpandProps] = useState({});

  useEffect(() => {
    handleExpand();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleExpand();
  }, [isOpen]);

  const handleExpand = () => {
    if (expand) {
      const sizes = getBootstrapSizes(window.innerWidth);
      if (!sizes[expand]) {
        let ml = ref.current?.getBoundingClientRect()?.x;
        let w = ref.current?.getBoundingClientRect()?.width;
        ml = ml ? ml * -1 : 0;
        let maxW = window.innerWidth;

        if (w)
          if (w <= window.innerWidth) {
            ml += (maxW - w) / 2;
            maxW = w;
          }

        setExpandProps({ ml: `${ml}px`, maxW: `${maxW}px` });
      } else {
        setExpandProps({});
      }
    }
  };

  const handleResize = () => {
    handleExpand();
  };

  const handleClick = (e: MouseEvent) => {
    //check if click is outside
    if (isOpen) {
      if (ref && !ref.current?.contains(e.target as HTMLElement)) {
        if (toggle) toggle();
      } else if (hideOnInsideClick) {
        if (toggle) toggle();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <KDropdownContainer ref={ref} isOpen={isOpen} {...expandProps}>
      {children}
    </KDropdownContainer>
  );
};
