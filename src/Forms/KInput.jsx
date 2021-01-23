////// IMPORTS //////

//// EXTERNAL ////
import DatePicker from "react-datepicker";

//REDUX
import { connect, useDispatch } from "react-redux";

// React
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

// Reactstrap
import { Input } from "reactstrap";

/////STYLES //////
import "react-datepicker/dist/react-datepicker.css";
//// INTERNAL ////
import { uuidv4 } from "../Libs/KLib";
import { setFormInput, setFormInputValue } from "../redux/actions/act_form";
import styled from "styled-components";
import { getColor, getFontWeight } from "../Theming/KThemes";
import { component } from "../Libs/styles";
import KComponent from "../Atoms/KComponent";

////// COMPONENT //////

const KInputWrapper = styled.input.attrs((props) => ({
  borderColor: props.borderColor || props.theme.colors.border,
}))`
  padding: 0.5rem 1rem;
  line-height: 1.5rem;
  font-size: 1rem;
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 5px;
  color: black;
  font-weight: ${({ theme }) => getFontWeight("regular", theme)};

  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.2);
  }

  &.success {
    border-color: rgb(70, 218, 137);
    outline: 0;
    box-shadow: 0 0 0 0.1rem rgba(70, 218, 137, 0.2);
  }

  &.warning {
    border-color: rgb(218, 183, 70);
    outline: 0;
    box-shadow: 0 0 0 0.1rem rgba(218, 183, 70, 0.2);
  }

  &.error {
    border-color: rgb(218, 72, 72);
    outline: 0;
    box-shadow: 0 0 0 0.1rem rgba(218, 72, 72, 0.2);
  }

  ${component}
`;

function KInput(props) {
  props = props.propsWrapper ? props.propsWrapper : props;
  const { wrapperClassName, labelClassName, formId, name, label, type } = props;

  const [id, setId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const tmpId = uuidv4();
    dispatch(setFormInput(formId, name, tmpId));
    setId(tmpId);
  }, []);

  const onChange = (e) => {
    if (id) dispatch(setFormInputValue(formId, id, e.target.value));
  };

  const result = (
    <KComponent
      as="div"
      display="flex"
      flexDir="column"
      text="left"
      className={`${wrapperClassName || ""}`}>
      <label className={`${labelClassName || ""}`} htmlFor={id}>
        {label}
      </label>

      <KInputWrapper
        type={type}
        {...props}
        id={id}
        name={id}
        onChange={onChange}></KInputWrapper>
    </KComponent>
  );

  if (props.type == "datepicker") {
    return (
      <KDatePicker name={name} id={id} formId={formId}>
        {result}
      </KDatePicker>
    );
  }
  return result;
}

const KDatePicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    let val = null;

    if (dates) {
      if ((start != null) & (end == null)) {
        val = start.toLocaleDateString() + " - ?";
      } else if ((start == null) & (end != null)) {
        val = "? -" + end.toLocaleDateString();
      } else if ((start != null) & (end != null)) {
        val = start.toLocaleDateString() + " - " + end.toLocaleDateString();
      }
    }
  };

  return (
    <DatePicker
      selectsRange
      selected={startDate}
      startDate={startDate}
      endDate={endDate}
      popperPlacement="bottom-start"
      showPopperArrow={false}
      customInput={props.children}
      shouldCloseOnSelect={false}
      onChange={onChange}
    />
  );
};

KInput.propTypes = {
  wrapperClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string,
};

////// EXPORTS //////
export default KInput;
