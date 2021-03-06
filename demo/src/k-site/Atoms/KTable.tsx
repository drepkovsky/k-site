////// IMPORTS //////
//// EXTERNAL ////
import styled, { css } from "styled-components";
// React
import { component, KStatefulComponentProps } from "../Theming/KStyles";

// Reactstrap

//// INTERNAL ////

////// COMPONENT //////
export const KTableItem = styled.td<KStatefulComponentProps>`
  padding: 0.75rem;
  border-top: 1px solid;
  color: inherit;

  ${component}
`;

export const KTableRow = styled.tr<KStatefulComponentProps>`
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

export const KTableHead = styled.thead.attrs(
  (props: KStatefulComponentProps) => ({
    bg: props.bg || props.theme?.colors.tableHeader,
  })
)<KStatefulComponentProps>`
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

export const KTableBody = styled.tbody<KStatefulComponentProps>`
  background-color: inherit;
  overflow-y: auto;
  ${component}
`;

export const KTable = styled.table.attrs(
  (
    props: KStatefulComponentProps & { stripeColor?: string; striped?: boolean }
  ) => ({
    borderColor: props.borderColor || props.theme?.colors.divider,
    color: props.color || props.theme?.colors.text,
    stripeColor: props.stripeColor || props.theme?.colors.tableHeader,
  })
)<KStatefulComponentProps & { stripeColor?: string; striped?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  text-align: start;

  ${KTableItem} {
    border-color: ${({ borderColor }) => borderColor};
  }
  ${({ striped = true, stripeColor }) => {
    if (striped)
      return css`
        ${KTableBody} {
          ${KTableRow} {
            &:nth-of-type(odd) {
              background: none;
            }
            &:nth-of-type(2n) {
              background: ${stripeColor};
            }
          }
        }
      `;
    else return ``;
  }}
  ${component}
`;

export default KTable;
