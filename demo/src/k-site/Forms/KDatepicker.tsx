///imports
import DayPicker, {
  DayModifiers,
  BeforeModifier,
  DateUtils,
} from "react-day-picker";

import { KStatefulComponentProps } from "../Theming/KStyles";
import styled from "styled-components";
// React
import React, { FC, useState, useEffect } from "react";

export interface KDatePickerWrapperProps {
  selectedBg?: string;
  selectedColor?: string;
  rangeBg?: string;
  rangeColor?: string;
  disabledColor?: string;
}

const KDatePickerWrapper = styled.div.attrs(
  (props: KStatefulComponentProps & KDatePickerWrapperProps) => ({
    selectedBg: props.selectedBg || props.theme?.colors.primary || "#4a90e2",
    selectedColor: props.selectedBg || props.theme?.colors.text || "#f0f8ff",
    rangeBg: props.rangeBg || props.theme?.colors.text || "#f0f8ff",
    rangeColor: props.rangeColor || props.theme?.colors.primary || "#4a90e2",
    disabledColor:
      props.disabledColor || props.theme?.colors.disabled || "#333333",
  })
)<KStatefulComponentProps & KDatePickerWrapperProps>`
  * {
    :focus {
      outline: none;
    }
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: ${({ selectedBg }) => selectedBg};
    color: ${({ selectedColor }) => selectedColor};
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside):not(.DayPicker-Day--normal) {
    background-color: ${({ rangeBg }) => rangeBg};
    color: ${({ rangeColor }) => rangeColor};
  }
  .DayPicker-Day {
    border-radius: 0;
  }
  .DayPicker-Day--start {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  .DayPicker-Day--normal {
    border-radius: 15px;
  }
  .DayPicker-Day--disabled {
    color: ${({ disabledColor }) => disabledColor};
  }
  .DayPicker-Day--end {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;

export interface KDatePickerProps {
  rangeSelect?: boolean;
  onChange?: (e: KDatePickerOutput) => any;
  allowPast?: boolean;
  defaultValue?: Date[];
  format?: string;
}

export type KDatePickerOutput = Date[];

export const KDatePicker: FC<KDatePickerProps> = (props) => {
  const { rangeSelect, onChange, allowPast, defaultValue } = props;
  const [from, setFrom] = useState<Date | undefined>();
  const [to, setTo] = useState<Date | undefined>();

  useEffect(() => {
    if (defaultValue) {
      setFrom(defaultValue[0]);
      setTo(defaultValue[1]);
    }
  }, [defaultValue]);

  const pastDays: BeforeModifier = { before: new Date() };

  const ranngeModifiers = {
    start: from,
    end: to,
    disabled: !allowPast ? pastDays : undefined,
  };
  const singleModifiers = {
    normal: from,
    disabled: !allowPast ? pastDays : undefined,
  };

  const handleDayclick = (
    day: Date,
    modifiers: DayModifiers,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!rangeSelect) {
      setFrom(day);
      select([day]);
      return;
    }
    if (!allowPast && DateUtils.isPastDay(day)) {
      return;
    }

    if (from) {
      if (to) {
        const range = DateUtils.addDayToRange(day, { from, to });
        setFrom(range.from);
        if (DateUtils.isSameDay(range.from, range.to)) {
          setTo(undefined);
          select([range.from]);
        } else {
          setTo(range.to);
          select([range.from, range.to]);
        }
      } else {
        if (DateUtils.isDayBefore(day, from)) {
          const tmp = from;
          setFrom(day);
          setTo(tmp);
          select([day, tmp]);
        } else if (DateUtils.isSameDay(day, from)) {
          setFrom(day);
          select([day]);
        } else {
          setTo(day);
          select([from, day]);
        }
      }
    } else {
      setFrom(day);
      select([day]);
    }
  };

  const select = (output: KDatePickerOutput) => {
    if (onChange) onChange(output);
  };

  let selectedDays: Date | { from: Date; to: Date } | undefined = undefined;
  if (from) {
    if (to) selectedDays = { from, to };
    else selectedDays = from;
  }

  return (
    <KDatePickerWrapper>
      <DayPicker
        disabledDays={!allowPast ? pastDays : undefined}
        modifiers={rangeSelect ? ranngeModifiers : singleModifiers}
        selectedDays={selectedDays}
        onDayClick={handleDayclick}
      />
    </KDatePickerWrapper>
  );
};
