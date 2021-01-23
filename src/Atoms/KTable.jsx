////// IMPORTS //////
//// EXTERNAL ////
import styled, { css } from "styled-components";

// React
import PropTypes from "prop-types";
import { fixHex, lerpColor } from "../Theming/KColorPalette";
import { component } from "../Libs/styles";
import { TinyColor } from "@ctrl/tinycolor";

// Reactstrap

//// INTERNAL ////

////// COMPONENT //////
export const KTableItem = styled.td`
  padding: 0.75rem;
  border-top: 1px solid;
  color: inherit;

  ${component}
`;

export const KTableRow = styled.tr`
  &:first-child {
    border-top: 0;
  }

  &:first-child {
    th {
      border-top: 0;
    }
  }
  ${component}
`;

export const KTableHead = styled.thead.attrs((props) => ({
  bg: props.bg || props.theme.colors.tableHeader,
}))`
  ${KTableItem} {
    border-top: 0;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    vertical-align: bottom;
    border-bottom: 1px solid;

    text-transform: uppercase;
    font-size: 0.875rem;
  }

  ${component}
`;

export const KTableBody = styled.tbody`
  background-color: inherit;
  overflow-y: auto;
  ${component}
`;

export const KTable = styled.table.attrs((props) => ({
  borderColor: props.borderColor || props.theme.colors.divider,
  color: props.color || props.theme.colors.text,
  stripeColor: props.stripeColor || props.theme.colors.tableHeader,
}))`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  text-align: start;

  ${KTableItem} {
    border-color: ${({ borderColor }) => borderColor};
  }
  ${({ striped = true }) => {
    if (striped)
      return css`
        ${KTableBody} {
          ${KTableRow} {
            &:nth-of-type(odd) {
              background: none;
            }
            &:nth-of-type(2n) {
              background: ${({ stripeColor }) => stripeColor};
          }
        }
      `;
    else return ``;
  }}
  ${component}
`;

export const KTableOverflowWrapper = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  position: relative;
  ${component}
`;

KTable.propTypes = {
  className: PropTypes.string,
  striped: PropTypes.bool,
};

export default KTable;
