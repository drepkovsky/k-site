import styled from "styled-components";
import React, { useRef, useEffect } from "react";
import {
  bootstrapQueryMin,
  component,
  KStatefulComponentProps,
} from "../Theming/KStyles";
import { KCardBody, KCardHeader, KCardFooter } from "./KCard";
import KAnimation from "./KAnimation";

interface KModalWrapperProps {
  centered?: boolean;
}

interface KModalProps extends KModalWrapperProps {
  isOpen?: boolean;
  toggle?: () => void;
  hideOutClick?: boolean;
  bodyProps?: KStatefulComponentProps;
  fade?: boolean;
}

const KModalWrapper = styled.div<KStatefulComponentProps & KModalWrapperProps>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  padding: 15px;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: ${({ centered }) => (centered ? "center" : "start")};
  ${component};
`;
const KModalBodyContent = styled.div.attrs(
  (props: KStatefulComponentProps) => ({
    borderColor: props.borderColor || props.theme?.colors.border,
    radius: props.radius || "5px",
    bg: props.bg || props.theme?.colors.background,
    color: props.color || props.theme?.colors.text,
    maxW: props.maxW || "100",
    border: props.border || true,
    borderWidth: props.borderWidth || "1px",
  })
)<KStatefulComponentProps>`
  min-height: ${({ minH }) => (minH ? minH : "300px")};
  ${bootstrapQueryMin.sm} {
    min-width: ${({ sm }) => (sm?.w ? sm.w : "500px")};
  }
  display: flex;
  flex-direction: column;

  ${component}
`;

export const KModalBody = styled(KCardBody)<KStatefulComponentProps>``;
export const KModalHeader = styled(KCardHeader)<KStatefulComponentProps>``;
export const KModalFooter = styled(KCardFooter)<KStatefulComponentProps>``;

export const KModal: React.FC<KStatefulComponentProps & KModalProps> = (
  props
) => {
  const {
    isOpen = false,
    toggle,
    hideOutClick = true,
    bodyProps,
    children,
    fade = true,
    ...wrapperProps
  } = props;

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const ref = useRef<HTMLDivElement | null>(null);

  const useToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target == ref.current) if (toggle) toggle();
  };

  const body = () => {
    return <KModalBodyContent {...bodyProps}>{children}</KModalBodyContent>;
  };

  if (isOpen)
    return (
      <KModalWrapper ref={ref} onClick={useToggle} {...wrapperProps}>
        {fade ? (
          <KAnimation anim={["fadeIn 0.5s ease", "down 0.5s ease"]}>
            {body()}
          </KAnimation>
        ) : (
          body()
        )}
      </KModalWrapper>
    );
  return null;
};
