////// IMPORTS //////

//// EXTERNAL ////
import DatePicker from "react-datepicker";

//REDUX
import { connect } from "react-redux";

// React
import PropTypes from "prop-types";
import React, { Component, Fragment, useEffect, useRef, useState } from "react";

// Reactstrap
import { Input } from "reactstrap";

/////STYLES //////
import "react-datepicker/dist/react-datepicker.css";
//// INTERNAL ////
import { uuidv4, alignItems, alignSelf } from "../Libs/KLib";
import { setFormValue } from "../redux/actions/act_form";

////// COMPONENT //////

function KInput(props) {
  props = props.propsWrapper ? props.propsWrapper : props;
  const {
    required,
    className,
    wrapperClasName,
    formId,
    name,
    defaultValue,
    placeHolder,
    readOnly,
    onClick,
    label,
    disabled,
    type,
  } = props;

  const [id, setId] = useState("");
  const [value, setValue] = useState(defaultValue || "");
  const align = alignItems(props.align);
  const alignLabel = alignSelf(props.alignLabel);

  useEffect(() => {
    setId(uuidv4());
  }, []);

  const onChange = (e) => {
    props.setFormValue(formId, name, e.target.value);
  };

  const result = (
    <div className={`k-input-container ${align} ${wrapperClasName}`}>
      <label className={`px-2 k-input-label ${alignLabel}`} htmlFor={id}>
        {label}
      </label>

      <Input
        type={type}
        placeholder={placeHolder}
        onClick={onClick}
        defaultValue={defaultValue}
        readOnly={readOnly}
        className={className}
        id={id}
        name={id}
        required={required}
        onChange={onChange}
        disabled={disabled}></Input>
    </div>
  );

  if (props.type == "datepicker") {
    return (
      <KDatePicker
        name={name}
        id={id}
        formId={formId}
        setValue={setValue}
        setFormValue={props.setFormValue}>
        {result}
      </KDatePicker>
    );
  }
  return result;
}

const KDatePicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const { id, formId, setFormValue, name } = props;

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
      props.setValue(val);
      setFormValue(formId, name, dates);
    }
  };

  return (
    <DatePicker
      selectsRange
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      popperPlacement="bottom-start"
      showPopperArrow={false}
      customInput={props.children}
      shouldCloseOnSelect={false}
    />
  );
};

KInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  placeHolder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  align: PropTypes.string,
  alignLabel: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string,
  required: PropTypes.bool,
  ref: PropTypes.element,
  className: PropTypes.string,
  wrapperClasName: PropTypes.string,
};

////// EXPORTS //////
export default connect(null, { setFormValue })(KInput);
