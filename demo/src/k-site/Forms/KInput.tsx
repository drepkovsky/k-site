////// IMPORTS //////

// React
import React, { FC, useEffect, useRef, useState } from "react";

//// INTERNAL ////
import { randStr } from "../Libs/KLib";
import styled from "styled-components";
import { getFontWeight } from "../Theming/KThemes";
import { component } from "../Theming/KStyles";
import { Span } from "../Atoms/KComponent";

import { useForm, InputValue, FormState } from "./KForm";
import { KStatefulComponentProps } from "../Theming/KStyles";
import { Div } from "./../Atoms/KComponent";
import { KDropdownContent, KDropdownWrapper } from "../Atoms/KDropdown";
import { KDatePicker, KDatePickerOutput } from "./KDatepicker";

import { parse, format as formatFunc } from "date-fns";
////// COMPONENT //////

const KInputWrapper = styled.input.attrs((props: KStatefulComponentProps) => ({
  borderColor: props.borderColor || props.theme?.colors.border,
}))<KStatefulComponentProps>`
  padding: 0.5rem 1rem;
  line-height: 1.57;
  font-size: 1rem;
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 5px;
  color: black;
  font-weight: ${({ theme }) => getFontWeight("regular", theme)};
  position: relative;
  width: 100%;

  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.2);
  }

  :disabled {
    background-color: #dadada;
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

export interface InputResponseProps {
  valid: boolean;
  state?: InputState;
  message?: string;
  formState?: FormState;
  formMessage?: string;
}

export type InputState = "success" | "warning" | "error";

const KInputLabel = styled.label<KStatefulComponentProps>`
  font-size: 1rem;

  &.required {
    &:before {
      content: "*";
      display: inline-block;
      margin-right: 4px;
      line-height: 1rem;
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;

export interface KInputCommonProps extends KStatefulComponentProps {
  wrapperClassName?: string;
  labelClassName?: string;
  label?: string;
  name: string;
  required: boolean;
  disabled?: boolean;
}

export interface KInputProps extends KInputCommonProps {
  type: string;
  readOnly: boolean;
  onChange: (val: string | number, fn: InputCallback) => void;
}

export const KInput: FC<
  KInputProps & React.HTMLAttributes<HTMLInputElement>
> = (props) => {
  const {
    wrapperClassName,
    labelClassName,
    name,
    label,
    className,
    required,
    onChange,
  } = props;
  const ref = useRef<HTMLInputElement>(null);

  const [id, setId] = useState("");
  const [val, setValue] = useState("");

  const { setInput, setInputValue, setFeedback } = useForm();

  const [valid, setValid] = useState(true);
  const [message, setMessage] = useState<string | undefined>("");
  const [state, setState] = useState<InputState | undefined>();

  useEffect(() => {
    const tmpId = randStr(12, false);
    setId(tmpId);
    if (setInput) setInput(tmpId, { setResponse, value: val, name, required });
  }, []);

  const setResponse = (res: InputResponseProps) => {
    setValid(res.valid);
    setMessage(res.message);
    setState(res.state);
  };

  const classes = `${className} ${state ? state : ""}`;

  const onChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setValue(e.target.value);
      if (setInputValue) setInputValue(id, e.target.value || null);
    }

    if (onChange) onChange(e.target.value, inputCallback);
  };

  const inputCallback: InputCallback = (res) => {
    if (res) {
      const tmpFeedback = {
        feedbackType: res.formState,
        feedbackMessage: res.formMessage,
      };
      if (setFeedback) setFeedback(tmpFeedback);
      setValid(res.valid);
    }
  };

  const result = (
    <Div
      display="flex"
      flexDir="column"
      text="left"
      className={`${wrapperClassName || ""}`}>
      <KInputLabel
        className={`${labelClassName || ""} ${required ? "required" : ""} `}
        htmlFor={id}>
        {label}
      </KInputLabel>

      <Div as="div" display="flex" flexDir="column">
        <KInputWrapper
          ref={ref}
          {...props}
          className={classes}
          id={id}
          name={id}
          onChange={onChanged}></KInputWrapper>
        {!valid && message && (
          <Span ml="2px" fontSize="0.9" lineHeight="1.5" color="error">
            {message}
          </Span>
        )}
      </Div>
    </Div>
  );
  return result;
};

interface KInputDateProps extends KInputCommonProps {
  isRangeSelect?: boolean;
  allowPast?: boolean;
  format?: string;
  onDateChange?: (e: KDatePickerOutput, fn: InputCallback) => void;
}

export type InputCallback = (res: InputResponseProps) => void;

export const KInputDate: FC<
  KInputDateProps & React.HTMLAttributes<HTMLInputElement>
> = (props) => {
  const {
    wrapperClassName,
    labelClassName,
    name,
    label,
    className,
    required,
    isRangeSelect,
    allowPast,
    defaultValue,
    format = "yyyy/MM/dd",
    onDateChange,
    ...wrapperProps
  } = props;

  const [id, setId] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>();
  const [rawValue, setRawValue] = useState<KDatePickerOutput>();
  const [defaultDates, setDefaultDates] = useState<Date[] | undefined>();

  const ref = useRef<HTMLInputElement>(null);
  const { setInput, setInputValue, setFeedback } = useForm();

  const [valid, setValid] = useState(true);
  const [message, setMessage] = useState<string | undefined>("");
  const [state, setState] = useState<InputState | undefined>();

  useEffect(() => {
    const tmpId = randStr(12, false);
    setId(tmpId);
    if (setInput)
      setInput(tmpId, { setResponse, value: value || null, name, required });
  }, []);

  const setResponse = (res: InputResponseProps) => {
    setValid(res.valid);
    setMessage(res.message);
    setState(res.state);
    const tmpFeedback = {
      feedbackType: res.formState,
      feedbackMessage: res.formMessage,
    };
    if (setFeedback) setFeedback(tmpFeedback);
  };
  useEffect(() => {
    if (typeof defaultValue === "string") {
      const dateStrings = defaultValue.split(" - ");
      const dates: Date[] = [];
      dateStrings.map((dateStr) => {
        const date = parse(dateStr, format, new Date());
        dates.push(date);
      });
      setValue(defaultValue);
      setDefaultDates(dates);
    }
  }, [defaultValue]);

  const toggle = () => {
    setOpen(!isOpen);
  };

  const classes = `${className} ${state ? state : ""}`;

  const onDateChanged = (e: KDatePickerOutput) => {
    let val = "";

    if (e) {
      for (let i = 0; i < e.length; i++) {
        if (e[i]) {
          if (i === 1) val += " - ";
          val += formatFunc(e[i], format);
        }
      }
    }
    setRawValue(e);
    if (setInputValue) setInputValue(id, e || null);
    setValue(val || undefined);

    if (onDateChange) onDateChange(e, inputCallback);
  };

  const inputCallback: InputCallback = (res) => {
    if (res) {
      setResponse(res);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (key === "Backspace" || key === "Delete") {
      setDefaultDates(undefined);
    }
  };

  const result = (
    <Div
      display="flex"
      flexDir="column"
      text="left"
      className={`${wrapperClassName || ""}`}>
      <KInputLabel
        className={`${labelClassName || ""} ${required ? "required" : ""} `}
        htmlFor={id}>
        {label}
      </KInputLabel>

      <Div as="div" display="flex" flexDir="column">
        <KDropdownWrapper>
          <KInputWrapper
            ref={ref}
            {...wrapperProps}
            className={classes}
            id={id}
            required={required}
            name={id}
            type="text"
            onClick={toggle}
            defaultValue={value}
            readOnly
            onKeyDown={onKeyDown}
          />
          <KDropdownContent expand="sm" toggle={toggle} isOpen={isOpen}>
            <KDatePicker
              allowPast={allowPast}
              onChange={onDateChanged}
              rangeSelect={isRangeSelect}
              defaultValue={defaultDates}
              format={format}
            />
          </KDropdownContent>
        </KDropdownWrapper>
        {!valid && message && (
          <Span
            ml="2px"
            fontSize="0.9"
            lineHeight="1.5"
            color={state || "error"}>
            {message}
          </Span>
        )}
      </Div>
    </Div>
  );
  return result;
};

////// EXPORTS //////
