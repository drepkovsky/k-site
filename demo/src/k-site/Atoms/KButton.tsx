////// IMPORTS //////
import styled from "styled-components";
import { getContrast } from "../Theming/KColorPalette";
import { getColor, getHigherColor, getLowerColor } from "../Theming/KThemes";
import { component } from "../Theming/KStyles";
import { KStatefulComponentProps } from "./../Theming/KStyles";

////// COMPONENT //////

const KButton = styled.button.attrs(
  (props: KStatefulComponentProps & { outlined?: boolean }) => ({
    bg: getColor(props.bg, props.theme) || props.theme?.colors.text,
  })
)<KStatefulComponentProps & { outlined?: boolean }>`
  border: ${({ border = true }) => (border ? `2px solid` : "")};
  border-color: ${({ bg }) => bg};
  font-weight: ${({ theme }) => theme.weights.bold};
  border-radius: 1rem;
  padding: 0.5rem 1.5rem;
  transition: all 0.1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    outline: none;
    color: ${({ bg }) => getContrast(bg)};
    background-color: ${({ bg, theme }) => getLowerColor(bg, theme)};
    border: ${({ border }) => (border ? `2px solid` : "")};
    border-color: ${({ bg, theme }) => getLowerColor(bg, theme)};
  }
  &:active {
    background-color: ${({ bg, theme }) => getHigherColor(bg, theme)};
    border-color: ${({ bg, theme }) => getHigherColor(bg, theme)};
  }
  &:focus {
    outline: none;
  }
  ${component}

  color: ${({ bg, outlined }) => (outlined ? bg : getContrast(bg))};
  background-color: ${({ bg, outlined }) => (outlined ? "transparent" : bg)};
`;

////// EXPORTS //////
export default KButton;
