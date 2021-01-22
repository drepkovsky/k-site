import { SET_FORM, SET_FORM_INPUT, SET_FORM_INPUT_VALUE } from "../types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FORM_INPUT:
      return {
        ...state,
        [action.payload.formId]: {
          ...state[action.payload.formId],
          [action.payload.inputId]: {
            name: action.payload.name,
            error: [],
          },
        },
      };
    case SET_FORM_INPUT_VALUE:
      return {
        ...state,
        [action.payload.formId]: {
          ...state[action.payload.formId],
          [action.payload.inputId]: {
            ...state[action.payload.formId][action.payload.inputId],
            value: action.payload.value,
          },
        },
      };
    default:
      return state;
  }
}
