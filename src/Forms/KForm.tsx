//// EXTERNAL ////
//REDUX

// React
import React, { useState, createContext, useContext } from "react";
import styled from "styled-components";
import { KStatefulComponentProps } from "../Theming/KStyles";
import { KDatePickerOutput } from "./KDatepicker";

////// COMPONENT //////
const Peter = styled.h1<KStatefulComponentProps>``;

const FormContext = createContext<FormContextProp>({
  setInput: null,
  setInputValue: null,
});
export const useForm = () => {
  const form = useContext(FormContext);

  return form;
};

interface FormContextProp {
  setInput: ((id: string, input: Input) => void) | null;
  setInputValue: ((id: string, value: InputValue) => void) | null;
}

interface Props {
  onOutput: (e: Result) => null;
}
interface Inputs {
  [key: string]: Input;
}

interface Input {
  name: string;
  value: InputValue;
  isValid: (e: InputValue) => boolean | ValidationResponse;
  required: boolean;
}

export type ValidType = "success" | "warning" | "error";

export interface ValidationResponse {
  type: ValidType | boolean;
  message?: string | null;
}

export type InputValue = string | KDatePickerOutput | null;

interface Result {
  [name: string]: number | string | KDatePickerOutput | null;
}

const KForm: React.FC<Props> = ({ onOutput, children }) => {
  //states
  const [inputs, setInputs] = useState<Inputs>({});

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

  const harvestForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let result: Result = {};
    let isValid = true;
    Object.keys(inputs).map((key) => {
      const value = inputs[key].value;
      if (
        (inputs[key].required &&
          (value === null || !inputs[key].isValid(value))) ||
        (!inputs[key].required && value && !inputs[key].isValid(value))
      ) {
        isValid = false;
        return;
      }
      const name = inputs[key].name;
      result = { ...result, [name]: value };
    });

    if (onOutput && isValid) onOutput(result);
  };

  //render
  return (
    <form onSubmit={harvestForm} className="k-form ">
      <FormContext.Provider value={{ setInput, setInputValue }}>
        {children}
        <Peter as="div" color="red"></Peter>
      </FormContext.Provider>
    </form>
  );
};

export default KForm;
