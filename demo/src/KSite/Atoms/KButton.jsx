////// IMPORTS //////
import styled, { css } from "styled-components";
import { getContrast } from "../Libs/KColorPalette";
import { getColor } from "../Libs/KThemes";
import { component } from "../Libs/styles";

////// COMPONENT //////

const KButton = styled.button`
  color: ${({ theme }) => theme.colors.body};
  background-color: ${({ theme }) => theme.colors.text};
  border: ${({ border = true }) => (border ? `2px solid` : "")};
  border-color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.weights.bold};
  border-radius: 1.5rem;
  padding: 0.5rem 1.5rem;
  transition: all 0.1s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    outline: none;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.body};
    border: ${({ border }) => (border ? `2px solid` : "")};
    border-color: ${({ theme }) => theme.colors.text};
  }
  &:active {
    opacity: 0.7;
  }
  &:focus {
    outline: none;
  }

  ${({ bg }) => {
    if (bg)
      return css`
        border-color: ${({ bg }) => (bg ? getColor(bg) : "")};
        color: ${({ bg }) => (bg ? getContrast(getColor(bg)) : "")};

        &:hover{
          border-color: ${({ bg }) => (bg ? getColor(bg) : "")};
          color: ${({ bg }) => (bg ? getColor(bg) : "")};
          }
        }
      `;
    return "";
  }}

  ${component}
`;

////// EXPORTS //////
export default KButton;
