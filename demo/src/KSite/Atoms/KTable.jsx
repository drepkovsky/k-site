////// IMPORTS //////
//// EXTERNAL ////
import styled from "styled-components";

// React
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { fixHex, leanToContrast, lerpColor } from "../Libs/KColorPalette";

// Reactstrap

//// INTERNAL ////

////// COMPONENT //////
export const KTableItem = styled.td`
  padding: 0.75rem;
  border-top: 1px solid
    ${({ theme }) => lerpColor(theme.colors.text, theme.colors.body, 0.8)};
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
`;

export const KTableHead = styled.thead`
  ${KTableItem} {
    border-top: 0;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    vertical-align: bottom;
    border-bottom: 1px solid
      ${({ theme }) => lerpColor(theme.colors.text, theme.colors.body, 0.8)};

    color: #9aa0ac;
    text-transform: uppercase;
    font-size: 0.875rem;
  }
`;

export const KTableBody = styled.tbody`
  ${KTableRow} {
    &:nth-of-type(odd) {
      background: transparent;
    }
    &:nth-of-type(2n) {
      background: ${({ theme }) => fixHex(theme.colors.text)}06;
    }
  }
`;

export const KTable = styled.table`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  vertical-align: middle;
  text-align: start;
`;

KTable.propTypes = {
  className: PropTypes.string,
};

// function KTable(props) {
//   //props
//   const { children, className, stripes } = props;
//   //states
//   //effects
//   const stripClass = stripes ? "k-table-striped" : "";
//   //render
//   return (
//     <div className="k-table-holder">
//       <table className={`k-table ${className || ""} ${stripClass} `}>
//         {children}
//       </table>
//     </div>
//   );
// }

export default KTable;
