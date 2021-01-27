import React from "react";
import { KDatePickerOutput } from "./KDatepicker";
export declare const useForm: () => FormContextProp;
interface FormContextProp {
    setInput: ((id: string, input: Input) => void) | null;
    setInputValue: ((id: string, value: InputValue) => void) | null;
}
interface Props {
    onOutput: (e: Result) => null;
}
interface Input {
    name: string;
    value: InputValue;
    isValid: (e: InputValue) => boolean | ValidationResponse;
    required: boolean;
}
export declare type ValidType = "success" | "warning" | "error";
export interface ValidationResponse {
    type: ValidType | boolean;
    message?: string | null;
}
export declare type InputValue = string | KDatePickerOutput | null;
interface Result {
    [name: string]: number | string | KDatePickerOutput | null;
}
declare const KForm: React.FC<Props>;
export default KForm;
