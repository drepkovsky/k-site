import styled from "styled-components";
import React, { FC, useRef, useEffect } from "react";
import {
  bootstrapQueryMax,
  component,
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

  ${component}
`;

interface KDropdownProps {
  isOpen?: boolean;
  toggle?: () => void;
  hideOnInsideClick?: boolean;
}

export const KDropdownContent: FC<KStatefulComponentProps & KDropdownProps> = (
  props
) => {
  const { toggle, isOpen, children, hideOnInsideClick } = props;
  const ref = useRef<HTMLDivElement>(null);

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
    <KDropdownContainer ref={ref} isOpen={isOpen}>
      {children}
    </KDropdownContainer>
  );
};
