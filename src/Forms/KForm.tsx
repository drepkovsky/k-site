//// EXTERNAL ////
//REDUX

// React
import React, { useState, createContext, useContext } from "react";
import styled from "styled-components";
import { KStatefulComponentProps } from "../Theming/KStyles";
import { KDatePickerOutput } from "./KDatepicker";
import { FeedbackType } from "./KFormFeedback";
import { InputResponseProps } from "./KInput";

////// COMPONENT //////

const FormContext = createContext<FormContextProps>({
  setInput: null,
  setInputValue: null,
  setFeedback: null,
});
export const FormFeedbackContext = createContext<FormFeedbackContextProps>({});

export const useForm = () => {
  const form = useContext(FormContext);
  return form;
};

export interface FormFeedbackContextProps {
  feedbackType?: FeedbackType;
  feedbackMessage?: string;
}

export interface FormContextProps {
  setInput: ((id: string, input: Input) => void) | null;
  setInputValue: ((id: string, value: InputValue) => void) | null;
  setFeedback: ((feedback: FormFeedbackContextProps) => void) | null;
}

export type FormState = "success" | "error" | "warning";

export interface FormResponseProps {
  state?: FormState;
  message?: string;
}

export type FormCallback = (res: FormResponseProps) => void;

export interface KFormProps {
  onSubmit: (e: Result, fn: FormCallback) => void;
  onChange: (e: Result, fn: FormCallback) => void;
  loadingMessage?: string;
}
export interface Inputs {
  [key: string]: Input;
}

export interface Input {
  name: string;
  value: InputValue;
  setResponse: (res: InputResponseProps) => void;
  required: boolean;
}

export type ValidType = "success" | "warning" | "error";

export type InputValue = string | KDatePickerOutput | null;

interface Result {
  [name: string]: {
    value: number | string | KDatePickerOutput | null;
    setResponse: (res: InputResponseProps) => void;
  };
}

const KForm: React.FC<KFormProps> = ({
  loadingMessage,
  onSubmit,
  onChange,
  children,
}) => {
  //states
  const [inputs, setInputs] = useState<Inputs>({});
  const [feedback, setFeedback] = useState<FormFeedbackContextProps>({});
  //effects

  const setInput = (id: string, input: Input) => {
    let newInput = Object.assign(inputs, { [id]: input });
    setInputs(newInput);
  };

  const setInputValue = (id: string, value: InputValue) => {
    let newInput = {
      ...inputs,
      [id]: {
        ...inputs[id],
        value,
      },
    };
    setInputs(newInput);
  };

  const harvestForm = async (
    e: React.FormEvent<HTMLFormElement>,
    type: "change" | "submit"
  ) => {
    e.preventDefault();

    let result: Result = {};
    Object.keys(inputs).map((key) => {
      const value = inputs[key].value;
      const name = inputs[key].name;
      const setResponse = inputs[key].setResponse;
      result = { ...result, [name]: { value, setResponse } };
    });

    if (type === "submit") {
      if (onSubmit) {
        setFeedback({
          feedbackType: "loading",
          feedbackMessage: loadingMessage,
        });
        onSubmit(result, formCallback);
      }
    } else {
      if (onChange) {
        setFeedback({
          feedbackType: "loading",
          feedbackMessage: loadingMessage,
        });
        onChange(result, formCallback);
      }
    }
  };

  const formCallback: FormCallback = (res) => {
    if (res) {
      const tmpFeedback = {
        feedbackType: res.state,
        feedbackMessage: res.message,
      };
      setFeedback(tmpFeedback);
    }
  };

  //render
  return (
    <form
      onChange={(e) => harvestForm(e, "change")}
      onSubmit={(e) => harvestForm(e, "submit")}
      className="k-form">
      <FormContext.Provider value={{ setInput, setInputValue, setFeedback }}>
        <FormFeedbackContext.Provider value={{ ...feedback }}>
          {children}
        </FormFeedbackContext.Provider>
      </FormContext.Provider>
    </form>
  );
};

export default KForm;
