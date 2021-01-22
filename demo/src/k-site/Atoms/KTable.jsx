////// IMPORTS //////
//// EXTERNAL ////
import styled from "styled-components";

// React
import PropTypes from "prop-types";
import { fixHex, lerpColor } from "../Libs/KColorPalette";
import { component } from "../Libs/styles";

// Reactstrap

//// INTERNAL ////

////// COMPONENT //////
export const KTableItem = styled.td`
  padding: 0.75rem;
  border-top: 1px solid;
  border-color: inherit;
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

export const KTableHead = styled.thead`
  color: #928d8d;

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
`;

export const KTable = styled.table`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  text-align: start;
  ${component}

  ${KTableItem} {
    border-color: ${({ theme }) =>
      lerpColor(theme.colors.text, theme.colors.body, 0.8)};
  }

  ${KTableBody} {
    ${KTableRow} {
      &:nth-of-type(odd) {
        background: transparent;
      }
      &:nth-of-type(2n) {
        background: ${({ theme }) => fixHex(theme.colors.text)}06;
      }
    }
  }
`;

export const KTableWrapper = styled.div`
  overflow-x: auto;
`;

KTable.propTypes = {
  className: PropTypes.string,
};

export default KTable;
