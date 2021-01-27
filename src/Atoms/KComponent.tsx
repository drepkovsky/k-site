import styled from "styled-components";
import { component, KStatefulComponentProps } from "../Theming/KStyles";
import { getHigherColor, getLowerColor } from "./../Theming/KThemes";

const KComponent = styled.div<KStatefulComponentProps>`
  ${component}
`;

export const Div = styled.div<KStatefulComponentProps>`
  ${component}
`;
export const Span = styled.span<KStatefulComponentProps>`
  ${component}
`;
export const Paragraph = styled.p<KStatefulComponentProps>`
  ${component}
`;
export const Label = styled.label<KStatefulComponentProps>`
  ${component}
`;
export const H1 = styled.h1<KStatefulComponentProps>`
  ${component}
`;
export const H2 = styled.h2<KStatefulComponentProps>`
  ${component}
`;
export const H3 = styled.h3<KStatefulComponentProps>`
  ${component}
`;
export const H4 = styled.h4<KStatefulComponentProps>`
  ${component}
`;
export const H5 = styled.h5<KStatefulComponentProps>`
  ${component}
`;
export const Display1 = styled.div<KStatefulComponentProps>`
  font-size: 6rem;
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.weights.light};
  ${component};
`;
export const Display2 = styled.div<KStatefulComponentProps>`
  font-size: 5.5rem;
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.weights.light};
  ${component}
`;
export const Display3 = styled.div<KStatefulComponentProps>`
  font-size: 4.5rem;
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.weights.light};
  ${component}
`;
export const Display4 = styled.div<KStatefulComponentProps>`
  font-size: 3.5rem;
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.weights.light};
  ${component}
`;

export const Link = styled.a.attrs((props) => ({
  color: props.color || props.theme.colors.link,
}))<KStatefulComponentProps>`
  text-decoration: none;
  background-color: transparent;
  color: ${({ color }) => color};

  &:hover {
    text-decoration: none;
    color: ${({ theme, color }) => getLowerColor(color, theme)};
  }

  &:active {
    text-decoration: none;
    color: ${({ theme, color }) => getHigherColor(color, theme)};
  }

  ${component};
`;

export const Overlay = styled.div<KStatefulComponentProps>`
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.2;

  ${component}
`;

export const KFooter = styled.footer<KStatefulComponentProps>`
  ${component}
`;

export const Ghost = styled.div.attrs(
  (props: KStatefulComponentProps & { bgTo?: string }) => ({
    bg: props.bg || props.theme?.colors["grey-2"],
    bgTo: props.bgTo || props.theme?.colors["grey-1"],
  })
)<KStatefulComponentProps>`
  animation: ghost 1s ease infinite;

  width: 100%;
  height: 100%;
  min-height: 100%;
  @keyframes ghost {
    0% {
      background-color: ${({ bg }) => bg};
    }
    50% {
      background-color: ${({ bgTo }) => bgTo};
    }
    100% {
      background-color: ${({ bg }) => bg};
    }
  }
  ${component}
`;

export default KComponent;
