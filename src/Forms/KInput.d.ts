import React, { FC } from "react";
import { InputValue } from "./KForm";
import { KStatefulComponentProps } from "../Theming/KStyles";
interface KInputCommonProps extends KStatefulComponentProps {
    wrapperClassName?: string;
    labelClassName?: string;
    label?: string;
    name: string;
    errorMessage?: string;
    required: boolean;
    disabled?: boolean;
    validation?: ((e: InputValue) => boolean) | Array<(e: InputValue) => boolean>;
}
interface KInputProps extends KInputCommonProps {
    type: string;
    readOnly: boolean;
}
export declare const KInput: FC<KInputProps & React.HTMLAttributes<HTMLInputElement>>;
interface KInputDateProps extends KInputCommonProps {
    isRangeSelect: boolean;
}
export declare const KInputDate: FC<KInputDateProps & React.HTMLAttributes<HTMLInputElement>>;
export {};
