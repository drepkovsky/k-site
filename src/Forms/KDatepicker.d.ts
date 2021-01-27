import "react-day-picker/lib/style.css";
import { FC } from "react";
interface KDatePickerProps {
    rangeSelect?: boolean;
    onChange?: (e: KDatePickerOutput) => any;
}
export declare type KDatePickerOutput = Date[];
export declare const KDatePicker: FC<KDatePickerProps>;
export {};
