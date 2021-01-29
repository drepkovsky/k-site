import React, { FC, createContext, useContext } from "react";
import { Div, Span } from "../Atoms/KComponent";
import { KStatefulComponentProps } from "../Theming/KStyles";

import { FormFeedbackContext } from "./KForm";

export type FeedbackType = "success" | "warning" | "error" | "loading";

export interface KFormFeedbackProps {
  type: FeedbackType;
}

interface MessageContextProps {
  message?: string;
}
const MessageContext = createContext<MessageContextProps>({ message: "" });

export const KFormFeedback: FC<KStatefulComponentProps & KFormFeedbackProps> = (
  props
) => {
  const { type, children, ...wrapperProps } = props;
  const { feedbackMessage, feedbackType } = useContext(FormFeedbackContext);

  return (
    <MessageContext.Provider
      value={{ message: type === feedbackType ? feedbackMessage : "" }}>
      <Div display={type === feedbackType ? "block" : "none"} {...wrapperProps}>
        {children}
      </Div>
    </MessageContext.Provider>
  );
};

export const KFormFeedbackMessage: FC<KStatefulComponentProps> = (props) => {
  const { ...wrapperProps } = props;
  const { message } = useContext(MessageContext);

  return <Span {...wrapperProps}>{message}</Span>;
};
