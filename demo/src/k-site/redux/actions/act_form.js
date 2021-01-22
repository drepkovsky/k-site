import { SET_FORM, SET_FORM_INPUT, SET_FORM_INPUT_VALUE } from "../types";

export const setFormInput = (formId, name, inputId) => (dispatch, getState) => {
  dispatch({
    type: SET_FORM_INPUT,
    payload: { formId, name, inputId },
  });
};
export const setFormInputValue = (formId, inputId, value) => (
  dispatch,
  getState
) => {
  dispatch({
    type: SET_FORM_INPUT_VALUE,
    payload: { formId, value, inputId },
  });
};
export const setForm = (form) => (dispatch, getState) => {
  if (form)
    dispatch({
      type: SET_FORM,
      payload: { form },
    });
};
